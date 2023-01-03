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
  VapeUpdated,
} from "../generated/schema";

export function handleDeposit(event: DepositEvent): void {
  // let depositEvent = new Deposit(
  //   event.transaction.hash.concatI32(event.logIndex.toI32())
  // );
  let depositEvent = new Deposit(event.transaction.hash.toHexString());
  depositEvent.account = event.params.account;
  depositEvent.amount = event.params.amount;
  depositEvent.blockNumber = event.block.number;
  depositEvent.blockTimestamp = event.block.timestamp;
  depositEvent.transactionHash = event.transaction.hash;
  depositEvent.save();
}

export function handleFeeCollectorUpdated(
  event: FeeCollectorUpdatedEvent
): void {
  let feeCollectorUpdatedEvent = new FeeCollectorUpdated(
    event.transaction.hash.toHexString()
  );
  feeCollectorUpdatedEvent.fromFeeCollector = event.params.oldFeeCollector;
  feeCollectorUpdatedEvent.toFeeCollector = event.params.newFeeCollector;
  feeCollectorUpdatedEvent.blockNumber = event.block.number;
  feeCollectorUpdatedEvent.blockTimestamp = event.block.timestamp;
  feeCollectorUpdatedEvent.transactionHash = event.transaction.hash;
  feeCollectorUpdatedEvent.save();
}

export function handleWithdraw(event: WithdrawEvent): void {
  let withdrawEvent = new Withdraw(event.transaction.hash.toHexString());
  withdrawEvent.account = event.params.account;
  withdrawEvent.amount = event.params.amount;
  withdrawEvent.blockNumber = event.block.number;
  withdrawEvent.blockTimestamp = event.block.timestamp;
  withdrawEvent.transactionHash = event.transaction.hash;

  withdrawEvent.save();
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
