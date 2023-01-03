import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Deposit,
  FeeCollectorUpdated,
  OwnershipHandoverCanceled,
  OwnershipHandoverRequested,
  OwnershipTransferred,
  VAPEUpdated,
  Withdraw
} from "../generated/GenesisStaking/GenesisStaking"

export function createDepositEvent(account: Address, amount: BigInt): Deposit {
  let depositEvent = changetype<Deposit>(newMockEvent())

  depositEvent.parameters = new Array()

  depositEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return depositEvent
}

export function createFeeCollectorUpdatedEvent(
  oldFeeCollector: Address,
  newFeeCollector: Address
): FeeCollectorUpdated {
  let feeCollectorUpdatedEvent = changetype<FeeCollectorUpdated>(newMockEvent())

  feeCollectorUpdatedEvent.parameters = new Array()

  feeCollectorUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "oldFeeCollector",
      ethereum.Value.fromAddress(oldFeeCollector)
    )
  )
  feeCollectorUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newFeeCollector",
      ethereum.Value.fromAddress(newFeeCollector)
    )
  )

  return feeCollectorUpdatedEvent
}

export function createOwnershipHandoverCanceledEvent(
  pendingOwner: Address
): OwnershipHandoverCanceled {
  let ownershipHandoverCanceledEvent = changetype<OwnershipHandoverCanceled>(
    newMockEvent()
  )

  ownershipHandoverCanceledEvent.parameters = new Array()

  ownershipHandoverCanceledEvent.parameters.push(
    new ethereum.EventParam(
      "pendingOwner",
      ethereum.Value.fromAddress(pendingOwner)
    )
  )

  return ownershipHandoverCanceledEvent
}

export function createOwnershipHandoverRequestedEvent(
  pendingOwner: Address
): OwnershipHandoverRequested {
  let ownershipHandoverRequestedEvent = changetype<OwnershipHandoverRequested>(
    newMockEvent()
  )

  ownershipHandoverRequestedEvent.parameters = new Array()

  ownershipHandoverRequestedEvent.parameters.push(
    new ethereum.EventParam(
      "pendingOwner",
      ethereum.Value.fromAddress(pendingOwner)
    )
  )

  return ownershipHandoverRequestedEvent
}

export function createOwnershipTransferredEvent(
  oldOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("oldOwner", ethereum.Value.fromAddress(oldOwner))
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createVAPEUpdatedEvent(vape: Address): VAPEUpdated {
  let vapeUpdatedEvent = changetype<VAPEUpdated>(newMockEvent())

  vapeUpdatedEvent.parameters = new Array()

  vapeUpdatedEvent.parameters.push(
    new ethereum.EventParam("vape", ethereum.Value.fromAddress(vape))
  )

  return vapeUpdatedEvent
}

export function createWithdrawEvent(
  account: Address,
  amount: BigInt
): Withdraw {
  let withdrawEvent = changetype<Withdraw>(newMockEvent())

  withdrawEvent.parameters = new Array()

  withdrawEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return withdrawEvent
}
