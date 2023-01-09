import { BigInt, Address } from "@graphprotocol/graph-ts";
import {
  GenesisStaking,
  Deposit as DepositEvent,
  FeeCollectorUpdated as FeeCollectorUpdatedEvent,
  OwnershipHandoverCanceled as OwnershipHandoverCanceledEvent,
  OwnershipHandoverRequested as OwnershipHandoverRequestedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  VAPEUpdated as VAPEUpdatedEvent,
  Claim as ClaimEvent,
} from "../generated/GenesisStaking/GenesisStaking";
import {
  Deposit,
  FeeCollectorUpdated,
  User,
  Claim,
  CumulativeVPNDDeposited,
} from "../generated/schema";

import {
  updateUSDMetrics,
  updateVPNDLocked24H,
  updateCumulativeVPNDDeposited,
  updateCumulativeVAPEClaimed,
} from "./helpers";

export function getIdFromEventParams(
  txNonce: BigInt,
  address: Address
): string {
  return txNonce.toHexString() + address.toHexString();
}

export function handleDeposit(event: DepositEvent): void {
  let user = User.load(event.params.account);
  // Creating a new user if the user does not exist
  if (!user) {
    user = new User(event.params.account);
    user.vpndLocked = event.params.amount;
    let cumulativeVPNDDeposited = CumulativeVPNDDeposited.load(
      "CumulativeVPNDDeposited"
    );
    if (!cumulativeVPNDDeposited) {
      user.shareVpndSurrendered = BigInt.fromI32(100);
    } else {
      user.shareVpndSurrendered = user.vpndLocked
        .times(cumulativeVPNDDeposited.amount)
        .div(BigInt.fromI32(100));
    }
  } else {
    user.vpndLocked = user.vpndLocked.plus(event.params.amount);
    let cumulativeVPNDDeposited = CumulativeVPNDDeposited.load(
      "CumulativeVPNDDeposited"
    );
    if (!cumulativeVPNDDeposited) {
      user.shareVpndSurrendered = BigInt.fromI32(100);
    } else {
      user.shareVpndSurrendered = user.vpndLocked
        .times(cumulativeVPNDDeposited.amount)
        .div(BigInt.fromI32(100));
    }

    user.save();
  }

  // Create a new deposit for every deposit
  let deposit = new Deposit(
    getIdFromEventParams(event.transaction.nonce, event.address)
  );
  deposit.account = event.params.account;
  deposit.amount = event.params.amount;
  deposit.blockNumber = event.block.number;
  deposit.blockTimestamp = event.block.timestamp;
  deposit.transactionHash = event.transaction.hash;

  deposit.save();

  updateCumulativeVPNDDeposited(event);
  updateVPNDLocked24H(event);
  updateUSDMetrics(event);
}

export function handleClaim(event: ClaimEvent): void {
  let user = User.load(event.params.account);
  if (!user) {
    user = new User(event.params.account);
    user.vapeClaimed = event.params.amount;
  } else {
    user.vapeClaimed = event.params.amount;
  }
  user.save();

  let claim = new Claim(
    getIdFromEventParams(event.transaction.nonce, event.address)
  );

  claim.account = event.params.account;
  claim.amount = event.params.amount;
  claim.blockTimestamp = event.block.timestamp;
  claim.save();
  updateCumulativeVAPEClaimed(event);
}

export function handleFeeCollectorUpdated(
  event: FeeCollectorUpdatedEvent
): void {
  let feeCollectorUpdatedEvent = new FeeCollectorUpdated(
    event.transaction.hash.toString()
  );
  feeCollectorUpdatedEvent.fromFeeCollector = event.params.oldFeeCollector;
  feeCollectorUpdatedEvent.toFeeCollector = event.params.newFeeCollector;
  feeCollectorUpdatedEvent.blockNumber = event.block.number;
  feeCollectorUpdatedEvent.blockTimestamp = event.block.timestamp;
  feeCollectorUpdatedEvent.transactionHash = event.transaction.hash;
  feeCollectorUpdatedEvent.save();
}
