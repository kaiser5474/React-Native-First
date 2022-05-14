import React, { useState } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import {useTailwind} from 'tailwind-rn';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import Card from '../components/Card';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const [lista, setLista] = useState([]);
  
  const tailwind = useTailwind();
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
    <>
      {
        lista.map(item => 
          <View style={styles.container2}>
            <Card name={item.name} img={item.image} key={item.id} created={item.created}/>
          </View>
        )
      }    
    </>
  );
}

const styles = StyleSheet.create({
  container2:{
    height: 220,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    alignItems: 'center'
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    textAlign: "center",
  },
  image2: {
    flex: 1,
    justifyContent: "center"
  },
});
