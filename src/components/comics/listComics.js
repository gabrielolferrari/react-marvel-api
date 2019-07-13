import React, { Component } from 'react';
import { getComics } from '../../services/MarvelAPI';
import CardComic from './cardComic';

export default class ListComics extends Component {
  state = {
    comics: [],
  };

  async componentDidMount() {
    try {
      await getComics().then((response) => {
        this.setState({ comics: response.data.data.results });
       });
    } catch (e) {
      console.log(`Request failed: ${e}`);
    }
  }

  render() {
    return (
      <React.Fragment>
      {
        this.state.comics.map((comic) =>
        <CardComic key={comic.id.toString()} info={comic} />
        )
      }
      </React.Fragment>
    );
  }
}