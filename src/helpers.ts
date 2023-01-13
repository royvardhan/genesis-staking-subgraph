import { Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import {
  USDMetrics,
  VPNDLocked24H,
  CumulativeVPNDDeposited,
  CumulativeVAPEClaimed,
  VapePrice1D,
  VapePrice5M,
  VapePrice1H,
} from "../generated/schema";
import {
  Deposit as DepositEvent,
  Claim as ClaimEvent,
  GenesisStaking,
} from "../generated/GenesisStaking/GenesisStaking";

import {
  getDailyID,
  formatAmount,
  getVPNDPriceInUSD,
  getAVAXPriceInUSD,
  get5MinID,
  getHourlyID,
} from "./getters";
import { Transfer as TransferEvent, WAVAX } from "../generated/WAVAX/WAVAX";

export function calculateVapePrice(vpndSurrenderedUSD: BigDecimal): BigDecimal {
  return vpndSurrenderedUSD.div(BigInt.fromI32(420000).toBigDecimal());
}

export function calculateVapeFDV(vapePrice: BigDecimal): BigDecimal {
  return vapePrice.times(BigInt.fromI32(21000000).toBigDecimal());
}

export function calculateVapeMcap(vapePrice: BigDecimal): BigDecimal {
  return vapePrice.times(BigInt.fromI32(420000).toBigDecimal());
}

export function updateUSDMetrics(event: DepositEvent): void {
  let usdMetrics = USDMetrics.load("USDMetrics");
  if (!usdMetrics) {
    usdMetrics = new USDMetrics("USDMetrics");
    usdMetrics.vpndDeposited = event.params.amount;
    usdMetrics.vpndSurrenderedUSD = event.params.amount
      .toBigDecimal()
      .times(getVPNDPriceInUSD());
    usdMetrics.vapePriceRealTimeUSD = calculateVapePrice(
      usdMetrics.vpndSurrenderedUSD
    );
    usdMetrics.vapeFDVRealTimeUSD = calculateVapeFDV(
      usdMetrics.vapePriceRealTimeUSD
    );
    usdMetrics.vapeRealTimeMcapUSD = calculateVapeMcap(
      usdMetrics.vapePriceRealTimeUSD
    );
  } else {
    usdMetrics.vpndDeposited = usdMetrics.vpndDeposited.plus(
      event.params.amount
    );
    usdMetrics.vpndSurrenderedUSD = usdMetrics.vpndDeposited
      .toBigDecimal()
      .times(getVPNDPriceInUSD());
    usdMetrics.vapePriceRealTimeUSD = calculateVapePrice(
      usdMetrics.vpndSurrenderedUSD
    );
    usdMetrics.vapeFDVRealTimeUSD = calculateVapeFDV(
      usdMetrics.vapePriceRealTimeUSD
    );
    usdMetrics.vapeRealTimeMcapUSD = calculateVapeMcap(
      usdMetrics.vapePriceRealTimeUSD
    );
  }
  usdMetrics.save();
}

export function updateVPNDLocked24H(event: DepositEvent): void {
  let vpndLocked24H = VPNDLocked24H.load(
    getDailyID(event.block.timestamp).toString()
  );
  if (!vpndLocked24H) {
    vpndLocked24H = new VPNDLocked24H(
      getDailyID(event.block.timestamp).toString()
    );
    vpndLocked24H.lastUpdated = event.block.timestamp;
    vpndLocked24H.amount = event.params.amount;
  }
  vpndLocked24H.save();
}

export function updateCumulativeVPNDDeposited(event: DepositEvent): void {
  let cumulativeVPNDDeposited = CumulativeVPNDDeposited.load(
    "CumulativeVPNDDeposited"
  );
  if (!cumulativeVPNDDeposited) {
    let cumulativeVPNDDeposited = new CumulativeVPNDDeposited(
      "CumulativeVPNDDeposited"
    );
    cumulativeVPNDDeposited.amount = event.params.amount;
    cumulativeVPNDDeposited.save();
  } else {
    cumulativeVPNDDeposited.amount = cumulativeVPNDDeposited.amount.plus(
      event.params.amount
    );
    cumulativeVPNDDeposited.save();
  }
}

export function updateCumulativeVAPEClaimed(event: ClaimEvent): void {
  let cumulativeVAPEClaimed = CumulativeVAPEClaimed.load(
    "CumulativeVAPEClaimed"
  );
  if (!cumulativeVAPEClaimed) {
    cumulativeVAPEClaimed = new CumulativeVAPEClaimed("CumulativeVAPEClaimed");
    cumulativeVAPEClaimed.amount = event.params.amount;
  } else {
    cumulativeVAPEClaimed.amount = cumulativeVAPEClaimed.amount.plus(
      event.params.amount
    );
  }
  cumulativeVAPEClaimed.save();
}

export function updateVapePrice(event: TransferEvent): void {
  let cumulativeVPNDDeposited = CumulativeVPNDDeposited.load(
    "CumulativeVPNDDeposited"
  );
  let totalVPNDDeposited: BigInt;
  if (!cumulativeVPNDDeposited) {
    totalVPNDDeposited = BigInt.fromI32(0);
  } else {
    totalVPNDDeposited = cumulativeVPNDDeposited.amount;
  }

  let vapePrice5M = VapePrice5M.load(get5MinID(event).toString());
  if (!vapePrice5M) {
    vapePrice5M = new VapePrice5M(get5MinID(event).toString());
    vapePrice5M.lastUpdated = event.block.timestamp;
    vapePrice5M.price = calculateVapePrice(
      totalVPNDDeposited.toBigDecimal().times(getVPNDPriceInUSD())
    );
    vapePrice5M.save();
  }

  let vapePrice1H = VapePrice1H.load(getHourlyID(event).toString());
  if (!vapePrice1H) {
    vapePrice1H = new VapePrice1H(getHourlyID(event).toString());
    vapePrice1H.lastUpdated = event.block.timestamp;
    vapePrice1H.price = calculateVapePrice(
      totalVPNDDeposited.toBigDecimal().times(getVPNDPriceInUSD())
    );
    vapePrice1H.save();
  }

  let vapePrice1D = VapePrice1D.load(
    getDailyID(event.block.timestamp).toString()
  );
  if (!vapePrice1D) {
    vapePrice1D = new VapePrice1D(getDailyID(event.block.timestamp).toString());
    vapePrice1D.lastUpdated = event.block.timestamp;
    vapePrice1D.price = calculateVapePrice(
      totalVPNDDeposited.toBigDecimal().times(getVPNDPriceInUSD())
    );
    vapePrice1D.save();
  }
}
