import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Linking,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  h2text: {
    marginTop: 10,
    fontFamily: 'Helvetica',
    fontSize: 36,
    fontWeight: 'bold',
  },
  flatview: {
    justifyContent: 'center',
    paddingTop: 30,
    borderRadius: 2,
  },
  name: {
    fontFamily: 'Verdana',
    fontSize: 18,
  },
  email: {
    color: 'red',
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
});

const GET_FAVORITES = gql`
    query {
      favorites {
        id,
        comicid,
        title,
      }
    }
`;

class Favorites extends Component {
  state = {
    favorites: [],
  }

  async componentDidMount() {
    const favoriteQuery = this.props.client.query({ query: GET_FAVORITES, fetchPolicy: 'network-only' });
    favoriteQuery.then(((resolve) => { this.setState({ favorites: resolve.data.favorites }); }));
  }

  handleClick = (title) => {
    Linking.canOpenURL(this.props.url).then((supported) => {
      if (supported) {
        Linking.openURL(`https://www.ebay.com/sch/i.html?_nkw=${title}`);
      } else {
        console.log(`Don't know how to open URI: ${this.props.url}`);
      }
    });
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <Text style={styles.h2text}>
            My Favorites
          </Text>
          <FlatList
            data={this.state.favorites}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this.handleClick(item.title)}>
                <View style={styles.flatview} key={item.id}>
                  <Text style={styles.name}>{item.title}</Text>
                  <Text style={styles.email}>Comprar</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ApolloProvider>
    );
  }
}

export default withApollo(Favorites);
