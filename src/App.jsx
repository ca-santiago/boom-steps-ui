import React, { StrictMode } from 'react'
import MainRouter from './router'

import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {

  return (
    <StrictMode>
      <QueryClientProvider contextSharing={false} client={queryClient}>
        <MainRouter />
      </QueryClientProvider>
    </StrictMode>
  )
}

export default App
