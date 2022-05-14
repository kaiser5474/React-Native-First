import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache()
});

export default function App() {

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme(); 

  if (!isLoadingComplete) {
    return null;
  } else {
    return (      
        <SafeAreaProvider>
          <ApolloProvider client={client}>
            <TailwindProvider utilities={utilities}>
              <Navigation colorScheme={colorScheme} />          
              <StatusBar />
            </TailwindProvider>
          </ApolloProvider>
        </SafeAreaProvider>
    );
  }
}
