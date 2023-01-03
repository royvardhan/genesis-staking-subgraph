import { BigInt } from "@graphprotocol/graph-ts";
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

export function handleDeposit(event: DepositEvent): void {
  let user = User.load(event.params.account.toHexString());
  if (!user) {
    user = new User(event.params.account.toHexString());
  }
  let deposit = new Deposit(event.transaction.hash.toString());
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
}

export function handleWithdraw(event: WithdrawEvent): void {
  let user = User.load(event.params.account.toHexString());
  if (!user) {
    user = new User(event.params.account.toHexString());
  }
  let withdraw = new Withdraw(event.transaction.hash.toString());
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
