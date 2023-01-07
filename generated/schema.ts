// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Deposit extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Deposit entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Deposit must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Deposit", id.toString(), this);
    }
  }

  static load(id: string): Deposit | null {
    return changetype<Deposit | null>(store.get("Deposit", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get account(): Bytes {
    let value = this.get("account");
    return value!.toBytes();
  }

  set account(value: Bytes) {
    this.set("account", Value.fromBytes(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value!.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get blockTimestamp(): BigInt {
    let value = this.get("blockTimestamp");
    return value!.toBigInt();
  }

  set blockTimestamp(value: BigInt) {
    this.set("blockTimestamp", Value.fromBigInt(value));
  }

  get transactionHash(): Bytes {
    let value = this.get("transactionHash");
    return value!.toBytes();
  }

  set transactionHash(value: Bytes) {
    this.set("transactionHash", Value.fromBytes(value));
  }
}

export class User extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save User entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type User must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("User", id.toBytes().toHexString(), this);
    }
  }

  static load(id: Bytes): User | null {
    return changetype<User | null>(store.get("User", id.toHexString()));
  }

  get id(): Bytes {
    let value = this.get("id");
    return value!.toBytes();
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get vpndLocked(): BigInt {
    let value = this.get("vpndLocked");
    return value!.toBigInt();
  }

  set vpndLocked(value: BigInt) {
    this.set("vpndLocked", Value.fromBigInt(value));
  }

  get vapeClaimed(): BigInt {
    let value = this.get("vapeClaimed");
    return value!.toBigInt();
  }

  set vapeClaimed(value: BigInt) {
    this.set("vapeClaimed", Value.fromBigInt(value));
  }

  get shareVpndSurrendered(): BigInt {
    let value = this.get("shareVpndSurrendered");
    return value!.toBigInt();
  }

  set shareVpndSurrendered(value: BigInt) {
    this.set("shareVpndSurrendered", Value.fromBigInt(value));
  }
}

export class Claim extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Claim entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Claim must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Claim", id.toString(), this);
    }
  }

  static load(id: string): Claim | null {
    return changetype<Claim | null>(store.get("Claim", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get account(): Bytes {
    let value = this.get("account");
    return value!.toBytes();
  }

  set account(value: Bytes) {
    this.set("account", Value.fromBytes(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get blockTimestamp(): BigInt {
    let value = this.get("blockTimestamp");
    return value!.toBigInt();
  }

  set blockTimestamp(value: BigInt) {
    this.set("blockTimestamp", Value.fromBigInt(value));
  }
}

export class FeeCollectorUpdated extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save FeeCollectorUpdated entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type FeeCollectorUpdated must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("FeeCollectorUpdated", id.toString(), this);
    }
  }

  static load(id: string): FeeCollectorUpdated | null {
    return changetype<FeeCollectorUpdated | null>(
      store.get("FeeCollectorUpdated", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get fromFeeCollector(): Bytes {
    let value = this.get("fromFeeCollector");
    return value!.toBytes();
  }

  set fromFeeCollector(value: Bytes) {
    this.set("fromFeeCollector", Value.fromBytes(value));
  }

  get toFeeCollector(): Bytes {
    let value = this.get("toFeeCollector");
    return value!.toBytes();
  }

  set toFeeCollector(value: Bytes) {
    this.set("toFeeCollector", Value.fromBytes(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value!.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get blockTimestamp(): BigInt {
    let value = this.get("blockTimestamp");
    return value!.toBigInt();
  }

  set blockTimestamp(value: BigInt) {
    this.set("blockTimestamp", Value.fromBigInt(value));
  }

  get transactionHash(): Bytes {
    let value = this.get("transactionHash");
    return value!.toBytes();
  }

  set transactionHash(value: Bytes) {
    this.set("transactionHash", Value.fromBytes(value));
  }
}

export class VPNDLocked24H extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save VPNDLocked24H entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type VPNDLocked24H must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("VPNDLocked24H", id.toString(), this);
    }
  }

  static load(id: string): VPNDLocked24H | null {
    return changetype<VPNDLocked24H | null>(store.get("VPNDLocked24H", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get lastLock(): BigInt {
    let value = this.get("lastLock");
    return value!.toBigInt();
  }

  set lastLock(value: BigInt) {
    this.set("lastLock", Value.fromBigInt(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }
}

export class CumulativeVPNDDeposited extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save CumulativeVPNDDeposited entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type CumulativeVPNDDeposited must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("CumulativeVPNDDeposited", id.toString(), this);
    }
  }

  static load(id: string): CumulativeVPNDDeposited | null {
    return changetype<CumulativeVPNDDeposited | null>(
      store.get("CumulativeVPNDDeposited", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }
}

export class CumulativeVAPEClaimed extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save CumulativeVAPEClaimed entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type CumulativeVAPEClaimed must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("CumulativeVAPEClaimed", id.toString(), this);
    }
  }

  static load(id: string): CumulativeVAPEClaimed | null {
    return changetype<CumulativeVAPEClaimed | null>(
      store.get("CumulativeVAPEClaimed", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }
}

export class USDMetrics extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save USDMetrics entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type USDMetrics must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("USDMetrics", id.toString(), this);
    }
  }

  static load(id: string): USDMetrics | null {
    return changetype<USDMetrics | null>(store.get("USDMetrics", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get vpndDeposited(): BigInt {
    let value = this.get("vpndDeposited");
    return value!.toBigInt();
  }

  set vpndDeposited(value: BigInt) {
    this.set("vpndDeposited", Value.fromBigInt(value));
  }

  get vapeSurrenderedUSD(): BigDecimal {
    let value = this.get("vapeSurrenderedUSD");
    return value!.toBigDecimal();
  }

  set vapeSurrenderedUSD(value: BigDecimal) {
    this.set("vapeSurrenderedUSD", Value.fromBigDecimal(value));
  }

  get vapePriceRealTimeUSD(): BigDecimal {
    let value = this.get("vapePriceRealTimeUSD");
    return value!.toBigDecimal();
  }

  set vapePriceRealTimeUSD(value: BigDecimal) {
    this.set("vapePriceRealTimeUSD", Value.fromBigDecimal(value));
  }

  get vapeRealTimeMcapUSD(): BigDecimal {
    let value = this.get("vapeRealTimeMcapUSD");
    return value!.toBigDecimal();
  }

  set vapeRealTimeMcapUSD(value: BigDecimal) {
    this.set("vapeRealTimeMcapUSD", Value.fromBigDecimal(value));
  }

  get vapeFDVRealTimeUSD(): BigDecimal {
    let value = this.get("vapeFDVRealTimeUSD");
    return value!.toBigDecimal();
  }

  set vapeFDVRealTimeUSD(value: BigDecimal) {
    this.set("vapeFDVRealTimeUSD", Value.fromBigDecimal(value));
  }
}
