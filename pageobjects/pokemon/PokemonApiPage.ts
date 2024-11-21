import { APIRequestContext, APIResponse, request } from '@playwright/test';

export class PokemonApiPage {

  async getPokemonConnection(namePokemon: string): Promise<APIResponse> {
    const requestContext = await request.newContext()
    const response = await requestContext.get(`https://pokeapi.co/api/v2/pokemon/${namePokemon}`);
    if (!response.ok()) throw new Error(`Error fetching Pokemon data for ${namePokemon}`);
    return response;
  }

  async getPokemonData(namePokemon: string) {
    const response = await this.getPokemonConnection(namePokemon);
    return response.json();
  }

  async getPokemonMoves(namePokemon: string) {
    const pokemonData = await this.getPokemonData(namePokemon);
    return pokemonData.moves.map((move: any) => move.move.name);
  }

  async getPokemonSpeciesUrl(namePokemon: string) {
    const pokemonData = await this.getPokemonData(namePokemon);
    return pokemonData.species.url;
  }

  async getPokemonPowerUrl(namePokemon: string) {
    const pokemonData = await this.getPokemonData(namePokemon);
    const secretPowerMove = pokemonData.moves.find((move: any) => move.move.name === 'secret-power');
    return secretPowerMove.move.url;
  }
}