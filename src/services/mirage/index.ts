import { createServer, Model, Factory, RestSerializer } from "miragejs";
import dayjs from "dayjs";
import { faker } from "@faker-js/faker";

import { TransactionI, CryptoRatesI } from "../interfaces";

const cryptoCode = ["Bitcoin", "Ethereum", "Ripple", "Litcoin"];
const currencyCode = ["USD", "EUR", "GBP", "CAD"];
const status = ["LIVE", "EXCHANGED"];

export const makeServer = () => {
  const server = createServer({
    // Set serializer type
    serializers: {
      application: RestSerializer
    },

    // Set db models
    models: {
      transaction: Model.extend<Partial<TransactionI>>({}),
      rates: Model.extend<Partial<CryptoRatesI>>({})
    },

    // Set factories schema
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
          Bitcoin: () => faker.finance.amount(0.00004, 0.00008, 6),
          Ethereum: () => faker.finance.amount(0.05, 0.08, 3),
          Litcoin: () => faker.finance.amount(0.01, 0.04, 3),
          Ripple: () => faker.finance.amount(2, 5, 2)
        }
      })
    },

    // Creates db seeds
    seeds(server) {
      server.createList("transaction", 30);
      server.createList("rate", 4);
    },

    routes() {
      // Define routes prefix
      this.namespace = "api";

      // Define latency time
      this.timing = 750;

      // Define routes
      this.get("/transactions", (schema) => {
        // Sort transactions by date
        return schema.all("transaction").sort((a, b) => {
          return dayjs(b.date).diff(dayjs(a.date));
        });
      });

      this.post("/transactions");
      this.get("/rates");
    }
  });

  return server;
};
