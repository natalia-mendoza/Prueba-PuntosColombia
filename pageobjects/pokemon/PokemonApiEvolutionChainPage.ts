import { request } from '@playwright/test';

export class PokemonApiEvolutionChainPage {
  async getEvolutionName(evolutionChainUrl: string) {
    const requestContext = await request.newContext()
    const evolutionChainResponse = await requestContext.get(evolutionChainUrl);
    const evolutionChainData = await evolutionChainResponse.json();
    const evolutions = evolutionChainData.chain;
    const evolutionNames: string[] = [];

    let currentChain = evolutions;
    while (currentChain) {
      evolutionNames.push(currentChain.species.name);
      currentChain = currentChain.evolves_to && currentChain.evolves_to[0];
    }

    return evolutionNames;
  }
}
