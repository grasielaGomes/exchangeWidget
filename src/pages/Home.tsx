import { ExchangeHeader } from "../components/header/ExchangeHeader"
import { HistoryTable } from "../components/table/HistoryTable";
import { makeServer } from '../services/mirage/index';

export default () => {
  makeServer();
  return (
    <>
      <ExchangeHeader />
      <HistoryTable />
    </>
  );
}