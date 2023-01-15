import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { Deposit as DepositEvent } from "../generated/GenesisStaking/GenesisStaking";
import { Transfer as TransferEvent } from "../generated/WAVAX/WAVAX";
import { DeployedBlockTimeStamp } from "./constants";
import { Pair } from "../generated/GenesisStaking/Pair";
import {
  VPND_AVAX_PAIR,
  AVAX_USDC_PAIR,
  BIGINT_TEN,
  USDC_DECIMALS,
  AVAX_DECIMALS,
} from "./constants";

export function getDailyID(timestamp: BigInt): number {
  let dailyID = (timestamp.toI32() - DeployedBlockTimeStamp) / 86400;

  return dailyID + 1;
}

export function get5MinID(event: TransferEvent): number {
  let id = (event.block.timestamp.toI32() - DeployedBlockTimeStamp) / 300;
  return id + 1;
}

export function getHourlyID(timestamp: BigInt): number {
  let id = (timestamp.toI32() - DeployedBlockTimeStamp) / 3600;
  return id + 1;
}

export function get12HID(timestamp: BigInt): number {
  let id = (timestamp.toI32() - DeployedBlockTimeStamp) / 43200;
  return id + 1;
}

export function get6HID(timestamp: BigInt): number {
  let id = (timestamp.toI32() - DeployedBlockTimeStamp) / 21600;
  return id + 1;
}

export function formatAmount(amount: BigDecimal, decimals: i32): BigDecimal {
  return amount.div(BIGINT_TEN.pow(decimals as u8).toBigDecimal());
}
export function getAVAXPriceInUSD(): BigDecimal {
  let pair = Pair.bind(AVAX_USDC_PAIR);
  let reserves = pair.getReserves();
  let reserve0 = reserves.getReserve0();
  let reserve1 = reserves.getReserve1();

  let avaxPrice = formatAmount(reserve1.toBigDecimal(), USDC_DECIMALS).div(
    formatAmount(reserve0.toBigDecimal(), AVAX_DECIMALS)
  );
  return avaxPrice;
}

export function getVPNDPriceInUSD(): BigDecimal {
  let pair = Pair.bind(VPND_AVAX_PAIR);
  let reserves = pair.getReserves();
  let reserve0 = reserves.getReserve0().toBigDecimal();
  let reserve1 = reserves.getReserve1().toBigDecimal();

  let vpndPriceInAVAX = reserve1.div(reserve0);

  let vpndPriceInUSD = getAVAXPriceInUSD().times(vpndPriceInAVAX);
  return vpndPriceInUSD;
}
