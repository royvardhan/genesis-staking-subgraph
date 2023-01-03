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
} from "../generated/GenesisStaking/GenesisStaking";
import {
  Deposit,
  Withdraw,
  FeeCollectorUpdated,
  User,
  CumulativeVPNDDeposited,
  VPNDLocked24H,
} from "../generated/schema";

function getIdFromEventParams(txNonce: BigInt, address: Address): string {
  return txNonce.toHexString() + address.toHexString();
}

function check24HTimeframe(timestamp: number): boolean {
  let timenow = Math.round(Date.now() / 1000);
  let oneDayInUnix = 86400;
  if (timenow - timestamp >= oneDayInUnix) {
    return true;
  } else return false;
}

export function handleDeposit(event: DepositEvent): void {
  let user = User.load(event.params.account.toHexString());
  if (!user) {
    user = new User(event.params.account.toHexString());
  }
  let deposit = new Deposit(
    getIdFromEventParams(event.transaction.nonce, event.address)
  );
  deposit.account = event.params.account.toHexString();
  deposit.amount = event.params.amount.toString();
  deposit.blockNumber = event.block.number;
  deposit.blockTimestamp = event.block.timestamp;
  deposit.transactionHash = event.transaction.hash;
  deposit.save();
  user.save();

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
  }

  let vpndLocked24H = VPNDLocked24H.load(
    getIdFromEventParams(event.transaction.nonce, event.address)
  );
  if (!vpndLocked24H) {
    vpndLocked24H = new VPNDLocked24H(
      getIdFromEventParams(event.transaction.nonce, event.address)
    );
    vpndLocked24H.blockTimestamp = event.block.timestamp;
    vpndLocked24H.amount = event.params.amount;
  }
  const is24HElapsed = check24HTimeframe;
}

export function handleWithdraw(event: WithdrawEvent): void {
  let user = User.load(event.params.account.toHexString());
  if (!user) {
    user = new User(event.params.account.toHexString());
  }
  let withdraw = new Withdraw(
    getIdFromEventParams(event.transaction.nonce, event.address)
  );
  withdraw.account = event.params.account.toHexString();
  withdraw.amount = event.params.amount.toString();
  withdraw.blockNumber = event.block.number;
  withdraw.blockTimestamp = event.block.timestamp;
  withdraw.transactionHash = event.transaction.hash;
  withdraw.save();
  user.save();
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

export function handleOwnershipHandoverCanceled(
  event: OwnershipHandoverCanceledEvent
): void {}

export function handleOwnershipHandoverRequested(
  event: OwnershipHandoverRequestedEvent
): void {}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {}

export function handleVAPEUpdated(event: VAPEUpdatedEvent): void {}
