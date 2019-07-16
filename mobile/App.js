import React from 'react';
import { StyleSheet, View } from 'react-native';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Favorites from './components/favorites';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: false,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#373737',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <Favorites />
      </View>
    </ApolloProvider>
  );
}
