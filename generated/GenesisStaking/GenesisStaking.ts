// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Claim extends ethereum.Event {
  get params(): Claim__Params {
    return new Claim__Params(this);
  }
}

export class Claim__Params {
  _event: Claim;

  constructor(event: Claim) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class Deposit extends ethereum.Event {
  get params(): Deposit__Params {
    return new Deposit__Params(this);
  }
}

export class Deposit__Params {
  _event: Deposit;

  constructor(event: Deposit) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class FeeCollectorUpdated extends ethereum.Event {
  get params(): FeeCollectorUpdated__Params {
    return new FeeCollectorUpdated__Params(this);
  }
}

export class FeeCollectorUpdated__Params {
  _event: FeeCollectorUpdated;

  constructor(event: FeeCollectorUpdated) {
    this._event = event;
  }

  get oldFeeCollector(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newFeeCollector(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class OwnershipHandoverCanceled extends ethereum.Event {
  get params(): OwnershipHandoverCanceled__Params {
    return new OwnershipHandoverCanceled__Params(this);
  }
}

export class OwnershipHandoverCanceled__Params {
  _event: OwnershipHandoverCanceled;

  constructor(event: OwnershipHandoverCanceled) {
    this._event = event;
  }

  get pendingOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class OwnershipHandoverRequested extends ethereum.Event {
  get params(): OwnershipHandoverRequested__Params {
    return new OwnershipHandoverRequested__Params(this);
  }
}

export class OwnershipHandoverRequested__Params {
  _event: OwnershipHandoverRequested;

  constructor(event: OwnershipHandoverRequested) {
    this._event = event;
  }

  get pendingOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get oldOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Retrieve extends ethereum.Event {
  get params(): Retrieve__Params {
    return new Retrieve__Params(this);
  }
}

export class Retrieve__Params {
  _event: Retrieve;

  constructor(event: Retrieve) {
    this._event = event;
  }

  get vpndAmount(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get vapeAmount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class VAPEUpdated extends ethereum.Event {
  get params(): VAPEUpdated__Params {
    return new VAPEUpdated__Params(this);
  }
}

export class VAPEUpdated__Params {
  _event: VAPEUpdated;

  constructor(event: VAPEUpdated) {
    this._event = event;
  }

  get vape(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class GenesisStaking__calculateClaimFeeResult {
  value0: BigInt;
  value1: BigInt;

  constructor(value0: BigInt, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }

  getVapeFee(): BigInt {
    return this.value0;
  }

  getVapeAmountAfterFee(): BigInt {
    return this.value1;
  }
}

export class GenesisStaking__calculateDepositFeeResult {
  value0: BigInt;
  value1: BigInt;

  constructor(value0: BigInt, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }

  getVpndFee(): BigInt {
    return this.value0;
  }

  getVpndAmountAfterFee(): BigInt {
    return this.value1;
  }
}

export class GenesisStaking extends ethereum.SmartContract {
  static bind(address: Address): GenesisStaking {
    return new GenesisStaking("GenesisStaking", address);
  }

  burnWallet(): Address {
    let result = super.call("burnWallet", "burnWallet():(address)", []);

    return result[0].toAddress();
  }

  try_burnWallet(): ethereum.CallResult<Address> {
    let result = super.tryCall("burnWallet", "burnWallet():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  calculateClaimFee(
    _vapeAmount: BigInt
  ): GenesisStaking__calculateClaimFeeResult {
    let result = super.call(
      "calculateClaimFee",
      "calculateClaimFee(uint256):(uint256,uint256)",
      [ethereum.Value.fromUnsignedBigInt(_vapeAmount)]
    );

    return new GenesisStaking__calculateClaimFeeResult(
      result[0].toBigInt(),
      result[1].toBigInt()
    );
  }

  try_calculateClaimFee(
    _vapeAmount: BigInt
  ): ethereum.CallResult<GenesisStaking__calculateClaimFeeResult> {
    let result = super.tryCall(
      "calculateClaimFee",
      "calculateClaimFee(uint256):(uint256,uint256)",
      [ethereum.Value.fromUnsignedBigInt(_vapeAmount)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new GenesisStaking__calculateClaimFeeResult(
        value[0].toBigInt(),
        value[1].toBigInt()
      )
    );
  }

  calculateDepositFee(
    _vpndAmount: BigInt
  ): GenesisStaking__calculateDepositFeeResult {
    let result = super.call(
      "calculateDepositFee",
      "calculateDepositFee(uint256):(uint256,uint256)",
      [ethereum.Value.fromUnsignedBigInt(_vpndAmount)]
    );

    return new GenesisStaking__calculateDepositFeeResult(
      result[0].toBigInt(),
      result[1].toBigInt()
    );
  }

  try_calculateDepositFee(
    _vpndAmount: BigInt
  ): ethereum.CallResult<GenesisStaking__calculateDepositFeeResult> {
    let result = super.tryCall(
      "calculateDepositFee",
      "calculateDepositFee(uint256):(uint256,uint256)",
      [ethereum.Value.fromUnsignedBigInt(_vpndAmount)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new GenesisStaking__calculateDepositFeeResult(
        value[0].toBigInt(),
        value[1].toBigInt()
      )
    );
  }

  claimsEndAt(): BigInt {
    let result = super.call("claimsEndAt", "claimsEndAt():(uint256)", []);

    return result[0].toBigInt();
  }

  try_claimsEndAt(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("claimsEndAt", "claimsEndAt():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  claimsStartAt(): BigInt {
    let result = super.call("claimsStartAt", "claimsStartAt():(uint256)", []);

    return result[0].toBigInt();
  }

  try_claimsStartAt(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "claimsStartAt",
      "claimsStartAt():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  deployment(): BigInt {
    let result = super.call("deployment", "deployment():(uint256)", []);

    return result[0].toBigInt();
  }

  try_deployment(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("deployment", "deployment():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  depositsEndAt(): BigInt {
    let result = super.call("depositsEndAt", "depositsEndAt():(uint256)", []);

    return result[0].toBigInt();
  }

  try_depositsEndAt(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "depositsEndAt",
      "depositsEndAt():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  depositsStartAt(): BigInt {
    let result = super.call(
      "depositsStartAt",
      "depositsStartAt():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_depositsStartAt(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "depositsStartAt",
      "depositsStartAt():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  feeCollector(): Address {
    let result = super.call("feeCollector", "feeCollector():(address)", []);

    return result[0].toAddress();
  }

  try_feeCollector(): ethereum.CallResult<Address> {
    let result = super.tryCall("feeCollector", "feeCollector():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  ownershipHandoverExpiresAt(pendingOwner: Address): BigInt {
    let result = super.call(
      "ownershipHandoverExpiresAt",
      "ownershipHandoverExpiresAt(address):(uint256)",
      [ethereum.Value.fromAddress(pendingOwner)]
    );

    return result[0].toBigInt();
  }

  try_ownershipHandoverExpiresAt(
    pendingOwner: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "ownershipHandoverExpiresAt",
      "ownershipHandoverExpiresAt(address):(uint256)",
      [ethereum.Value.fromAddress(pendingOwner)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  ownershipHandoverValidFor(): BigInt {
    let result = super.call(
      "ownershipHandoverValidFor",
      "ownershipHandoverValidFor():(uint64)",
      []
    );

    return result[0].toBigInt();
  }

  try_ownershipHandoverValidFor(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "ownershipHandoverValidFor",
      "ownershipHandoverValidFor():(uint64)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  stratosphere(): Address {
    let result = super.call("stratosphere", "stratosphere():(address)", []);

    return result[0].toAddress();
  }

  try_stratosphere(): ethereum.CallResult<Address> {
    let result = super.tryCall("stratosphere", "stratosphere():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  tvl(): BigInt {
    let result = super.call("tvl", "tvl():(uint256)", []);

    return result[0].toBigInt();
  }

  try_tvl(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("tvl", "tvl():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  vape(): Address {
    let result = super.call("vape", "vape():(address)", []);

    return result[0].toAddress();
  }

  try_vape(): ethereum.CallResult<Address> {
    let result = super.tryCall("vape", "vape():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  vapeToDistribute(): BigInt {
    let result = super.call(
      "vapeToDistribute",
      "vapeToDistribute():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_vapeToDistribute(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "vapeToDistribute",
      "vapeToDistribute():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  vpnd(): Address {
    let result = super.call("vpnd", "vpnd():(address)", []);

    return result[0].toAddress();
  }

  try_vpnd(): ethereum.CallResult<Address> {
    let result = super.tryCall("vpnd", "vpnd():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  vpndAccountBalance(_account: Address): BigInt {
    let result = super.call(
      "vpndAccountBalance",
      "vpndAccountBalance(address):(uint256)",
      [ethereum.Value.fromAddress(_account)]
    );

    return result[0].toBigInt();
  }

  try_vpndAccountBalance(_account: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "vpndAccountBalance",
      "vpndAccountBalance(address):(uint256)",
      [ethereum.Value.fromAddress(_account)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _vpnd(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _vape(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _stratosphere(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class CancelOwnershipHandoverCall extends ethereum.Call {
  get inputs(): CancelOwnershipHandoverCall__Inputs {
    return new CancelOwnershipHandoverCall__Inputs(this);
  }

  get outputs(): CancelOwnershipHandoverCall__Outputs {
    return new CancelOwnershipHandoverCall__Outputs(this);
  }
}

export class CancelOwnershipHandoverCall__Inputs {
  _call: CancelOwnershipHandoverCall;

  constructor(call: CancelOwnershipHandoverCall) {
    this._call = call;
  }
}

export class CancelOwnershipHandoverCall__Outputs {
  _call: CancelOwnershipHandoverCall;

  constructor(call: CancelOwnershipHandoverCall) {
    this._call = call;
  }
}

export class ClaimCall extends ethereum.Call {
  get inputs(): ClaimCall__Inputs {
    return new ClaimCall__Inputs(this);
  }

  get outputs(): ClaimCall__Outputs {
    return new ClaimCall__Outputs(this);
  }
}

export class ClaimCall__Inputs {
  _call: ClaimCall;

  constructor(call: ClaimCall) {
    this._call = call;
  }
}

export class ClaimCall__Outputs {
  _call: ClaimCall;

  constructor(call: ClaimCall) {
    this._call = call;
  }
}

export class CompleteOwnershipHandoverCall extends ethereum.Call {
  get inputs(): CompleteOwnershipHandoverCall__Inputs {
    return new CompleteOwnershipHandoverCall__Inputs(this);
  }

  get outputs(): CompleteOwnershipHandoverCall__Outputs {
    return new CompleteOwnershipHandoverCall__Outputs(this);
  }
}

export class CompleteOwnershipHandoverCall__Inputs {
  _call: CompleteOwnershipHandoverCall;

  constructor(call: CompleteOwnershipHandoverCall) {
    this._call = call;
  }

  get pendingOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class CompleteOwnershipHandoverCall__Outputs {
  _call: CompleteOwnershipHandoverCall;

  constructor(call: CompleteOwnershipHandoverCall) {
    this._call = call;
  }
}

export class DepositCall extends ethereum.Call {
  get inputs(): DepositCall__Inputs {
    return new DepositCall__Inputs(this);
  }

  get outputs(): DepositCall__Outputs {
    return new DepositCall__Outputs(this);
  }
}

export class DepositCall__Inputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }

  get _vpndAmount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class DepositCall__Outputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RequestOwnershipHandoverCall extends ethereum.Call {
  get inputs(): RequestOwnershipHandoverCall__Inputs {
    return new RequestOwnershipHandoverCall__Inputs(this);
  }

  get outputs(): RequestOwnershipHandoverCall__Outputs {
    return new RequestOwnershipHandoverCall__Outputs(this);
  }
}

export class RequestOwnershipHandoverCall__Inputs {
  _call: RequestOwnershipHandoverCall;

  constructor(call: RequestOwnershipHandoverCall) {
    this._call = call;
  }
}

export class RequestOwnershipHandoverCall__Outputs {
  _call: RequestOwnershipHandoverCall;

  constructor(call: RequestOwnershipHandoverCall) {
    this._call = call;
  }
}

export class RetrieveCall extends ethereum.Call {
  get inputs(): RetrieveCall__Inputs {
    return new RetrieveCall__Inputs(this);
  }

  get outputs(): RetrieveCall__Outputs {
    return new RetrieveCall__Outputs(this);
  }
}

export class RetrieveCall__Inputs {
  _call: RetrieveCall;

  constructor(call: RetrieveCall) {
    this._call = call;
  }

  get _to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class RetrieveCall__Outputs {
  _call: RetrieveCall;

  constructor(call: RetrieveCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class UpdateFeeCollectorCall extends ethereum.Call {
  get inputs(): UpdateFeeCollectorCall__Inputs {
    return new UpdateFeeCollectorCall__Inputs(this);
  }

  get outputs(): UpdateFeeCollectorCall__Outputs {
    return new UpdateFeeCollectorCall__Outputs(this);
  }
}

export class UpdateFeeCollectorCall__Inputs {
  _call: UpdateFeeCollectorCall;

  constructor(call: UpdateFeeCollectorCall) {
    this._call = call;
  }

  get _feeCollector(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class UpdateFeeCollectorCall__Outputs {
  _call: UpdateFeeCollectorCall;

  constructor(call: UpdateFeeCollectorCall) {
    this._call = call;
  }
}
