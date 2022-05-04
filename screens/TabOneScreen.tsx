import { StyleSheet, ImageBackground } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useQuery, gql } from "@apollo/client";
import { useState, useEffect } from 'react';
import { client } from '../App';

const FILMS_QUERY = gql`
query {
  characters(page: 2, filter: { name: "rick" }) {
    info {
      count
    }
    results {
      name
      status
      image
    }
  }
}
`;

// const x = () => {
//   const { data, loading, error } = useQuery(FILMS_QUERY);
//   if(loading){
//     return;
//   }
//   return data
// }

// const [loading, setLoading] = useState(false);

// useEffect(() => {
//   console.log(loading)
// }, [loading])


export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const { data, loading, error } = useQuery(FILMS_QUERY);
  if (loading) return <Text>Loading</Text>;
  if (error) return <Text>There is an Error!</Text>;
  //console.log(data.Object)
//   fetch('https://rickandmortyapi.com/graphql', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     query: `
//         {
//             generalSettings {
//                 url
//             }
//         }
//     `,
//   }),
// })
//   .then(res => res.json())
//   .then(res => console.log(res))

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/images/splash.png')} resizeMode="cover" style={styles.image}>        
          {/* {data.results.map((result : any) => (
            <Text style={styles.title}>{result}</Text>
          ))}           */}
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
      </ImageBackground>      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
});
