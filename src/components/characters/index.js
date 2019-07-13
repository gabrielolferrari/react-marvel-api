import React, { Component } from 'react';
import { getCharacters } from '../../services/MarvelAPI';

export default class CharactersList extends Component {
  state = {
    characters: [],
  }

  async componentDidMount() {
    try {
      await getCharacters().then((response) => {
        this.setState({ characters: response.data.data.results });
      });
    } catch (e) {
      console.log(`Request failed: ${e}`);
    }
  }

  render() {
    return (
      <ul>
        <l1>
          { this.state.characters.map(character => <li>{character.name}</li>)}
        </l1>
      </ul>
    );
  }
}
