import { request } from '@playwright/test';

export class PokemonApiSpeciesPage {
  async getEvolutionChainUrl(speciesUrl: string) {
    const requestContext = await request.newContext()
    const speciesResponse = await requestContext.get(speciesUrl);
    const speciesData = await speciesResponse.json();
    return speciesData.evolution_chain.url;
  }
}
