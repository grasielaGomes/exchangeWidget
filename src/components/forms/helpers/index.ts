import { Btc, Eth, Ltc, Xrp, Eur, Usd, Gbp, Cad } from "../../../assets";

export const cryptoOptions = [
  { id: 1, value: "Bitcoin", icon: Btc },
  { id: 2, value: "Ethereum", icon: Eth },
  { id: 3, value: "Ripple", icon: Xrp },
  { id: 4, value: "Litcoin", icon: Ltc }
];

export const currenciesOptions = [
  { id: 1, value: "EUR", icon: Eur },
  { id: 2, value: "USD", icon: Usd },
  { id: 3, value: "GBP", icon: Gbp },
  { id: 4, value: "CAD", icon: Cad }
];

export const countries = {
  "EUR": "fr-FR",
  "USD": "en-US",
  "GBP": "en-GB",
  "CAD": "en-CA"
}

export const initialOption = { value: "", icon: "", id: "" };
