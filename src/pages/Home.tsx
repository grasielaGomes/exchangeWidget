import { QueryClientProvider, QueryClient } from 'react-query';

import { ExchangeHeader } from "../components/header/ExchangeHeader"
import { HistoryTable } from "../components/table/HistoryTable";
import { makeServer } from '../services/mirage/index';

const queryClient = new QueryClient();

export default () => {
  makeServer();
  return (
    <QueryClientProvider client={queryClient}>
      <ExchangeHeader />
      <HistoryTable />
    </QueryClientProvider>
  );
}