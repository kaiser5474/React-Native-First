import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useQuery, gql } from "@apollo/client";

// const FILMS_QUERY = gql`
// query {
//   characters(page: 2, filter: { name: "rick" }) {
//     info {
//       count
//     }
//     results {
//       name
//       status
//       image
//     }
//   }
// }
// `;

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  // const { data, loading, error } = useQuery(FILMS_QUERY);
  return (
    <View style={styles.container}>
      <Text>Hola</Text>     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
