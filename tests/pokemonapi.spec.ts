import { test, expect, request } from '@playwright/test';
import { PokemonApiPage } from '../pageobjects/pokemon/PokemonApiPage';
import { PokemonApiSpeciesPage } from '../pageobjects/pokemon/PokemonApiSpeciesPage';
import { PokemonApiEvolutionChainPage } from '../pageobjects/pokemon/PokemonApiEvolutionChainPage';
import { PokemonApiPowerDataPage } from '../pageobjects/pokemon/PokemonApiPowerDataPage.ts';

const pokemonApiPage = new PokemonApiPage();
const pokemonApiSpeciesPage = new PokemonApiSpeciesPage();
const pokemonApiEvolutionChainPage = new PokemonApiEvolutionChainPage();
const pokemonApiPowerDataPage = new PokemonApiPowerDataPage();

test('Verify Squirtle API response is 200 OK', async () => {
  const namePokemon = 'squirtle';
  const response = await pokemonApiPage.getPokemonConnection(namePokemon);
  const statusCode = response.status();
  expect(statusCode).toBe(200);
});

test('Validate Pokemon Evolution for charmander', async () => {
  const namePokemon = 'charmander';
  const speciesUrl = await pokemonApiPage.getPokemonSpeciesUrl(namePokemon);
  const evolutionChainUrl = await pokemonApiSpeciesPage.getEvolutionChainUrl(speciesUrl);
  const evolutionNames = await pokemonApiEvolutionChainPage.getEvolutionName(evolutionChainUrl);
  expect(evolutionNames).toEqual(['charmander', 'charmeleon', 'charizard']);
});

test('Validate Pokemon Movements for Squirtle', async () => {
  const namePokemon = 'squirtle';
  const moves = await pokemonApiPage.getPokemonMoves(namePokemon);
  const orderedMoves = moves.reduce((acc: string[], move: string) => {
    const insertIndex = acc.findIndex(item => item > move);
    if (insertIndex === -1) acc.push(move);
    else acc.splice(insertIndex, 0, move);
    return acc;
  }, []);
  expect(orderedMoves).toBeInstanceOf(Array);
  expect(orderedMoves.length).toBeGreaterThan(0);
});

test('Validate Secret Power of Pikachu', async () => {
  const requestContext = await request.newContext()
  const namePokemon = 'pikachu';
  const powerUrl = await pokemonApiPage.getPokemonPowerUrl(namePokemon);
  const powerData = await pokemonApiPowerDataPage.getPowerData(powerUrl);
   const power = powerData.power;
  expect(power).toBe(70);
});
