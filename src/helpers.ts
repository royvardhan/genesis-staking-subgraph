import { Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import {
  USDMetrics,
  VPNDLocked24H,
  CumulativeVPNDDeposited,
  CumulativeVAPEClaimed,
  VapePrice1D,
  VapePrice5M,
  VapePrice1H,
  VPNDLocked1H,
  VPNDLocked12H,
  VPNDLocked6H,
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
  get5MinID,
  getHourlyID,
  get12HID,
  get6HID,
} from "./getters";
import { Transfer as TransferEvent, WAVAX } from "../generated/WAVAX/WAVAX";

export function calculateVapePrice(vpndSurrenderedUSD: BigDecimal): BigDecimal {
  return vpndSurrenderedUSD.div(BigInt.fromI32(420000).toBigDecimal());
}

export function calculateVapeFDV(vapePrice: BigDecimal): BigDecimal {
  return vapePrice.times(BigInt.fromI32(21000000).toBigDecimal());
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
    vpndLocked24H.amount = formatAmount(event.params.amount.toBigDecimal(), 18);
  } else {
    vpndLocked24H.lastUpdated = event.block.timestamp;
    vpndLocked24H.amount = vpndLocked24H.amount.plus(
      formatAmount(event.params.amount.toBigDecimal(), 18)
    );
  }
  vpndLocked24H.save();
}

export function updateVPNDLocked1H(event: DepositEvent): void {
  let vpndLocked1H = VPNDLocked1H.load(
    getHourlyID(event.block.timestamp).toString()
  );
  if (!vpndLocked1H) {
    vpndLocked1H = new VPNDLocked1H(
      getHourlyID(event.block.timestamp).toString()
    );
    vpndLocked1H.lastUpdated = event.block.timestamp;
    vpndLocked1H.amount = formatAmount(event.params.amount.toBigDecimal(), 18);
  } else {
    vpndLocked1H.lastUpdated = event.block.timestamp;
    vpndLocked1H.amount = vpndLocked1H.amount.plus(
      formatAmount(event.params.amount.toBigDecimal(), 18)
    );
  }
  vpndLocked1H.save();
}

export function updateVPNDLocked6H(event: DepositEvent): void {
  let vpndLocked6H = VPNDLocked6H.load(
    get6HID(event.block.timestamp).toString()
  );
  if (!vpndLocked6H) {
    vpndLocked6H = new VPNDLocked6H(get6HID(event.block.timestamp).toString());
    vpndLocked6H.lastUpdated = event.block.timestamp;
    vpndLocked6H.amount = formatAmount(event.params.amount.toBigDecimal(), 18);
  } else {
    vpndLocked6H.lastUpdated = event.block.timestamp;
    vpndLocked6H.amount = vpndLocked6H.amount.plus(
      formatAmount(event.params.amount.toBigDecimal(), 18)
    );
  }
  vpndLocked6H.save();
}

export function updateVPNDLocked12H(event: DepositEvent): void {
  let vpndLocked12H = VPNDLocked12H.load(
    get12HID(event.block.timestamp).toString()
  );
  if (!vpndLocked12H) {
    vpndLocked12H = new VPNDLocked12H(
      get12HID(event.block.timestamp).toString()
    );
    vpndLocked12H.lastUpdated = event.block.timestamp;
    vpndLocked12H.amount = formatAmount(event.params.amount.toBigDecimal(), 18);
  } else {
    vpndLocked12H.lastUpdated = event.block.timestamp;
    vpndLocked12H.amount = vpndLocked12H.amount.plus(
      formatAmount(event.params.amount.toBigDecimal(), 18)
    );
  }
  vpndLocked12H.save();
}

export function updateCumulativeVPNDDeposited(event: DepositEvent): void {
  let cumulativeVPNDDeposited = CumulativeVPNDDeposited.load(
    "CumulativeVPNDDeposited"
  );
  if (!cumulativeVPNDDeposited) {
    let cumulativeVPNDDeposited = new CumulativeVPNDDeposited(
      "CumulativeVPNDDeposited"
    );
    cumulativeVPNDDeposited.amount = formatAmount(
      event.params.amount.toBigDecimal(),
      18
    );
    cumulativeVPNDDeposited.save();
  } else {
    cumulativeVPNDDeposited.amount = cumulativeVPNDDeposited.amount.plus(
      formatAmount(event.params.amount.toBigDecimal(), 18)
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
    cumulativeVAPEClaimed.amount = formatAmount(
      event.params.amount.toBigDecimal(),
      18
    );
  } else {
    cumulativeVAPEClaimed.amount = cumulativeVAPEClaimed.amount.plus(
      formatAmount(event.params.amount.toBigDecimal(), 18)
    );
  }
  cumulativeVAPEClaimed.save();
}

export function updateVapePrice(event: TransferEvent): void {
  let cumulativeVPNDDeposited = CumulativeVPNDDeposited.load(
    "CumulativeVPNDDeposited"
  );
  let totalVPNDDeposited: BigDecimal;
  if (!cumulativeVPNDDeposited) {
    totalVPNDDeposited = BigInt.fromI32(0).toBigDecimal();
  } else {
    totalVPNDDeposited = cumulativeVPNDDeposited.amount;
  }

  let vapePrice5M = VapePrice5M.load(get5MinID(event).toString());
  if (!vapePrice5M) {
    vapePrice5M = new VapePrice5M(get5MinID(event).toString());
    vapePrice5M.lastUpdated = event.block.timestamp;
    vapePrice5M.price = calculateVapePrice(
      totalVPNDDeposited.times(getVPNDPriceInUSD())
    );
    vapePrice5M.save();
  }

  let vapePrice1H = VapePrice1H.load(
    getHourlyID(event.block.timestamp).toString()
  );
  if (!vapePrice1H) {
    vapePrice1H = new VapePrice1H(
      getHourlyID(event.block.timestamp).toString()
    );
    vapePrice1H.lastUpdated = event.block.timestamp;
    vapePrice1H.price = calculateVapePrice(
      totalVPNDDeposited.times(getVPNDPriceInUSD())
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
      totalVPNDDeposited.times(getVPNDPriceInUSD())
    );
    vapePrice1D.save();
  }
}

export function updateUSDMetrics(event: TransferEvent): void {
  let cumulativeVPNDDeposited = CumulativeVPNDDeposited.load(
    "CumulativeVPNDDeposited"
  );
  let totalVPNDDeposited: BigDecimal;
  if (!cumulativeVPNDDeposited) {
    totalVPNDDeposited = BigInt.fromI32(0).toBigDecimal();
  } else {
    totalVPNDDeposited = cumulativeVPNDDeposited.amount;
  }
  let usdMetrics = USDMetrics.load("USDMetrics");
  if (!usdMetrics) {
    usdMetrics = new USDMetrics("USDMetrics");
    usdMetrics.price = calculateVapePrice(
      totalVPNDDeposited.times(getVPNDPriceInUSD())
    );
    usdMetrics.vpndSurrenderedUSD = totalVPNDDeposited.times(
      getVPNDPriceInUSD()
    );
    usdMetrics.vapeFDVRealTimeUSD = calculateVapeFDV(usdMetrics.price);

    usdMetrics.lastUpdated = event.block.timestamp;
  } else {
    usdMetrics.price = calculateVapePrice(
      totalVPNDDeposited.times(getVPNDPriceInUSD())
    );
    usdMetrics.vpndSurrenderedUSD = totalVPNDDeposited.times(
      getVPNDPriceInUSD()
    );
    usdMetrics.vapeFDVRealTimeUSD = calculateVapeFDV(usdMetrics.price);

    usdMetrics.lastUpdated = event.block.timestamp;
  }
  usdMetrics.save();
}
