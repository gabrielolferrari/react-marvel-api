import React, { Component } from 'react';
import { getCharacters } from '../../services/MarvelAPI';

export default class CharactersList extends Component {
  state = {
    characters: []
  }

  async componentDidMount() {
    try {
      await getCharacters().then((response) => {
        this.setState({ characters: response.data.data.results })
        console.log(this.state.characters)
       });
    } catch (e) {
      console.log(`Request failed: ${e}`);
    }
  }

  render() {
    return (
      <ul>
       { this.state.characters.map(character => <li>{character.name}</li>)}
      </ul>
    )
  }
}