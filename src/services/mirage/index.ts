import { Dayjs } from 'dayjs';
import { createServer, Model, Factory } from 'miragejs';
import { faker } from "@faker-js/faker";

type Transaction = {
  amount: string;
  currencyRate: number | string;
  date: Dayjs | string | Date;
  from: string;
  id: string | number;
  to: string;
  status: string;
};

const cryptoCode = ["BTC", "ETH", "LTC", "XRP"];
const currencyCode = ["USD", "EUR", "GBP", "CAD"];
const status = ["LIVE", "EXCHANGED"];

export const makeServer = () => {
  const server = createServer({
    models: {
      transaction: Model.extend<Partial<Transaction>>({})
    },

    factories: {
      transaction: Factory.extend({
        amount: () => faker.finance.amount(1, 10000),
        currencyRate: () => faker.finance.amount(1, 50000),
        date: () => faker.date.recent(100),
        from: () => cryptoCode[Number(faker.finance.amount(0, 3, 0))],
        id: () => faker.finance.bitcoinAddress(),
        to: () => currencyCode[Number(faker.finance.amount(0, 3, 0))],
        status: () => status[Number(faker.finance.amount(0, 1, 0))]
      })
    },

    seeds(server) {
      server.createList("transaction", 50);
    },

    routes() {
      this.namespace = "api";
      this.timing = 750;
      this.get("/transactions");
      this.post("/transactions");
    }
  });

  return server;
}