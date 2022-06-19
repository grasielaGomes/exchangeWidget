import { createServer, Model, Factory } from "miragejs";
import { faker } from "@faker-js/faker";
import { TransactionI, CryptoRatesI } from "../interfaces";

const cryptoCode = ["Bitcoin", "Ethereum", "Ripple", "Litcoin"];
const currencyCode = ["USD", "EUR", "GBP", "CAD"];
const status = ["LIVE", "EXCHANGED"];

export const makeServer = () => {
  const server = createServer({
    models: {
      transaction: Model.extend<Partial<TransactionI>>({}),
      rates: Model.extend<Partial<CryptoRatesI>>({})
    },

    factories: {
      transaction: Factory.extend({
        amount: () => faker.finance.amount(1, 5, 0),
        currencyRate: () => faker.finance.amount(0.00004, 2, 6),
        date: () => faker.date.recent(100),
        from: (i: number) => cryptoCode[i % cryptoCode.length],
        id: () => faker.finance.bitcoinAddress(),
        to: (i: number) => currencyCode[i % currencyCode.length],
        totalAmount: "",
        status: (i: number) => status[i % status.length]
      }),
      rate: Factory.extend({
        timestamp: () => faker.date.recent(100),
        target: (i) => currencyCode[i % currencyCode.length],
        rates: {
          Bitcoin: faker.finance.amount(0.00004, 0.00008, 6),
          Ethereum: faker.finance.amount(0.05, 0.08, 3),
          Litcoin: faker.finance.amount(0.01, 0.04, 3),
          Ripple: faker.finance.amount(2, 5, 2)
        }
      })
    },

    seeds(server) {
      server.createList("transaction", 5);
      server.createList("rate", 4);
    },

    routes() {
      this.namespace = "api";
      this.timing = 750;
      this.get("/transactions");

      this.post("/transactions");

      this.get("/rates");
    }
  });

  return server;
};
