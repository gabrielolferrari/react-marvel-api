import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Linking,
  Image,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  h2text: {
    fontFamily: 'Verdana',
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ed1d24',
  },
  flatview: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 30,
    paddingRight: 15,
    paddingLeft: 15,
    borderRadius: 2,
  },
  imageArea: {
    flex: 1,
    width: '15%',
  },
  image: {
    width: 100,
    height: 140,
  },
  infoArea: {
    flex: 1,
    width: '85%',
    justifyContent: 'center',
  },
  name: {
    fontFamily: 'Verdana',
    fontSize: 16,
    textAlign: 'right',
    color: '#FFF',
  },
  buy: {
    marginTop: 10,
    textAlign: 'right',
    fontSize: 14,
    color: '#ed1d24',
    fontWeight: 'bold',
  },
});

const GET_FAVORITES = gql`
    query {
      favorites {
        id,
        comicid,
        title,
        image,
      }
    }
`;

class Favorites extends Component {
  state = {
    favorites: [],
  }

  async componentDidMount() {
    const observableQuery = this.props.client.watchQuery({
      query: GET_FAVORITES,
      pollInterval: 1000,
    });

    observableQuery.subscribe({
      next: ({ data }) => this.setState({ favorites: data.favorites }),
    });
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
                <View style={styles.imageArea}>
                  <Image
                    source={`${item.image}/portrait_xlarge.jpg`}
                    style={styles.image}
                  />
                </View>
                <View style={styles.infoArea}>
                  <Text style={styles.name}>{item.title}</Text>
                  <Text style={styles.buy}>Comprar</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

export default withApollo(Favorites);
