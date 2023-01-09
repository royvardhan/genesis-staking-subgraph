import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import {
  // USDMetrics,
  VPNDLocked24H,
  CumulativeVPNDDeposited,
  CumulativeVAPEClaimed,
} from "../generated/schema";
import {
  Deposit as DepositEvent,
  Claim as ClaimEvent,
} from "../generated/GenesisStaking/GenesisStaking";
import {
  getDailyID,
  formatAmount,
  getVPNDPriceInUSD,
  getAVAXPriceInUSD,
} from "./getters";

export function calculateVapePrice(vpndSurrenderedUSD: BigDecimal): BigDecimal {
  return vpndSurrenderedUSD.div(BigInt.fromI32(420000).toBigDecimal());
}

export function calculateVapeFDV(vapePrice: BigDecimal): BigDecimal {
  return vapePrice.times(BigInt.fromI32(21000000).toBigDecimal());
}

export function calculateVapeMcap(vapePrice: BigDecimal): BigDecimal {
  return vapePrice.times(BigInt.fromI32(420000).toBigDecimal());
}

// export function updateUSDMetrics(event: DepositEvent): void {
//   let usdMetrics = USDMetrics.load("USDMetrics");
//   if (!usdMetrics) {
//     usdMetrics = new USDMetrics("USDMetrics");
//     usdMetrics.vpndDeposited = event.params.amount;
//     usdMetrics.vapeSurrenderedUSD = event.params.amount
//       .toBigDecimal()
//       .times(getVPNDPriceInUSD());
//     usdMetrics.vapePriceRealTimeUSD = calculateVapePrice(
//       usdMetrics.vapeSurrenderedUSD
//     );
//     usdMetrics.vapeFDVRealTimeUSD = calculateVapeFDV(
//       usdMetrics.vapePriceRealTimeUSD
//     );
//     usdMetrics.vapeRealTimeMcapUSD = calculateVapeMcap(
//       usdMetrics.vapePriceRealTimeUSD
//     );
//   } else {
//     usdMetrics.vpndDeposited = usdMetrics.vpndDeposited.plus(
//       event.params.amount
//     );
//     usdMetrics.vapeSurrenderedUSD = usdMetrics.vpndDeposited
//       .toBigDecimal()
//       .times(getVPNDPriceInUSD());
//     usdMetrics.vapePriceRealTimeUSD = calculateVapePrice(
//       usdMetrics.vapeSurrenderedUSD
//     );
//     usdMetrics.vapeFDVRealTimeUSD = calculateVapeFDV(
//       usdMetrics.vapePriceRealTimeUSD
//     );
//     usdMetrics.vapeRealTimeMcapUSD = calculateVapeMcap(
//       usdMetrics.vapePriceRealTimeUSD
//     );
//   }
//   usdMetrics.save();
// }

export function updateVPNDLocked24H(event: DepositEvent): void {
  let vpndLocked24H = VPNDLocked24H.load(getDailyID(event).toString());
  if (!vpndLocked24H) {
    vpndLocked24H = new VPNDLocked24H(getDailyID(event).toString());
    vpndLocked24H.lastLock = event.block.timestamp;
    vpndLocked24H.amount = event.params.amount;
  } else {
    vpndLocked24H.lastLock = event.block.timestamp;
    vpndLocked24H.amount = vpndLocked24H.amount.plus(event.params.amount);
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
