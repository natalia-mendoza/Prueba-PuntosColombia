import { request } from '@playwright/test';

export class PokemonApiPowerDataPage {
  async getPowerData(powerUrl: string) {
    const requestContext = await request.newContext()
    const powerResponse = await requestContext.get(powerUrl);
    const powerData = await powerResponse.json();

    return powerData;
  }
}