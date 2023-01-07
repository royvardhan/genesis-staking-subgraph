import { BigInt, Address } from "@graphprotocol/graph-ts";
import {
  GenesisStaking,
  Deposit as DepositEvent,
  FeeCollectorUpdated as FeeCollectorUpdatedEvent,
  OwnershipHandoverCanceled as OwnershipHandoverCanceledEvent,
  OwnershipHandoverRequested as OwnershipHandoverRequestedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  VAPEUpdated as VAPEUpdatedEvent,
  Withdraw as WithdrawEvent,
  Claim as ClaimEvent,
} from "../generated/GenesisStaking/GenesisStaking";
import {
  Deposit,
  Withdraw,
  FeeCollectorUpdated,
  User,
  CumulativeVPNDDeposited,
  VPNDLocked24H,
  Claim,
  CumulativeVPNDWithdrawn,
} from "../generated/schema";

function getIdFromEventParams(txNonce: BigInt, address: Address): string {
  return txNonce.toHexString() + address.toHexString();
}

function check24HTimeframe(timestamp: BigInt): boolean {
  let timenow = new BigInt(i32(Math.round(i32(Date.now() / 1000))));
  let oneDayInUnix = new BigInt(86400);
  if (timenow.minus(timestamp).gt(oneDayInUnix)) {
    return true;
  } else return false;
}

export function handleDepositNew(event: DepositEvent): void {
  let user = User.load(event.params.account);
  // Creating a new user if the user does not exist
  if (!user) {
    user = new User(event.params.account);
    user.vpndLocked = event.params.amount;
  }
  user.vpndLocked = user.vpndLocked.plus(event.params.amount);
  user.save();

  // Create a new deposit for every deposit
  let deposit = new Deposit(
    getIdFromEventParams(event.transaction.nonce, event.address)
  );
  deposit.account = event.params.account;
  deposit.amount = event.params.amount;
  deposit.blockNumber = event.block.number;
  deposit.blockTimestamp = event.block.timestamp;
  deposit.transactionHash = event.transaction.hash;

  // Adding every deposit amount to CumulativeVPNDDeposited.
  let cumulativeVPNDDeposited = CumulativeVPNDDeposited.load(
    "CumulativeVPNDDeposited"
  );
  if (!cumulativeVPNDDeposited) {
    let cumulativeVPNDDeposited = new CumulativeVPNDDeposited(
      "CumulativeVPNDDeposited"
    );
    cumulativeVPNDDeposited.amount = event.params.amount;
  } else {
    cumulativeVPNDDeposited.amount = cumulativeVPNDDeposited.amount.plus(
      event.params.amount
    );
    cumulativeVPNDDeposited.save();
  }

  // Keeping track of VPND locked for 24H
  // For UI, check last lock === current date, if false show 0, else show VPNDLocked24H.amount
  let vpndLocked24H = VPNDLocked24H.load("VPNDLocked24H");
  if (!vpndLocked24H) {
    vpndLocked24H = new VPNDLocked24H("VPNDLocked24H");
    vpndLocked24H.lastLock = event.block.timestamp;
    vpndLocked24H.amount = event.params.amount;
  } else {
    const is24HElapsed = check24HTimeframe(vpndLocked24H.lastLock);
    if (is24HElapsed) {
      vpndLocked24H.lastLock = event.block.timestamp;
      vpndLocked24H.amount = event.params.amount;
    } else {
      vpndLocked24H.lastLock = event.block.timestamp;
      vpndLocked24H.amount = vpndLocked24H.amount.plus(event.params.amount);
    }
  }
  vpndLocked24H.save();
}

export function handleWithdraw(event: WithdrawEvent): void {
  let user = User.load(event.params.account);
  if (!user) {
    user = new User(event.params.account);
    user.vpndWithdrawn = event.params.amount;
  } else {
    user.vpndWithdrawn = event.params.amount;
  }

  user.save();

  let withdraw = new Withdraw(
    getIdFromEventParams(event.transaction.nonce, event.address)
  );
  withdraw.account = event.params.account;
  withdraw.amount = event.params.amount;
  withdraw.blockNumber = event.block.number;
  withdraw.blockTimestamp = event.block.timestamp;
  withdraw.transactionHash = event.transaction.hash;
  withdraw.save();

  let cumulativeVPNDWithdrawn = CumulativeVPNDWithdrawn.load(
    "CumulativeVPNDWithdrawn"
  );
  if (!cumulativeVPNDWithdrawn) {
    cumulativeVPNDWithdrawn = new CumulativeVPNDWithdrawn(
      "CumulativeVPNDWithdrawn"
    );
    cumulativeVPNDWithdrawn.amount = event.params.amount;
  } else {
    cumulativeVPNDWithdrawn.amount = cumulativeVPNDWithdrawn.amount.plus(
      event.params.amount
    );
  }

  cumulativeVPNDWithdrawn.save();
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
