import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {PropsWithChildren} from 'react';

export const queryClient = new QueryClient();

const ReactQueryProvider = (props: PropsWithChildren) => {
  const {children} = props;

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
