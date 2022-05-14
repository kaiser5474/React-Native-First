import React, { useState } from 'react';
import { ScrollView } from 'react-native';

import { RootTabScreenProps } from '../types';
import {
  ApolloClient,
  InMemoryCache,
  gql
} from "@apollo/client";
import Card from '../components/Card';
import {formatearFechaUS} from '../helpers/index';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const [lista, setLista] = useState([]);

  const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql",
    cache: new InMemoryCache()
  });

  client
  .query({
    query: gql`
    query {
      characters(page: 2, filter: { name: "rick" }) {
        info {
          count
        }
        results {
          id
          name
          image
          species
          created
        }
      }
      location(id: 1) {
        id
      }
      episodesByIds(ids: [1, 2]) {
        id
      }
    }
    `
  })
  .then(result => setLista(result.data.characters.results));

  return (
    <ScrollView>
      {
        lista.map(item => 
            <Card key={item.id} name={item.name} img={item.image} created={formatearFechaUS(item.created)}/>
        )
      }    
    </ScrollView>
  );
}
