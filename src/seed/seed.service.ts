import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name) //Método para injectar modelos en el servicio
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter
  ) { }

  async executeSeed() {
    await this.pokemonModel.deleteMany({}); //Elimina todos los elementos de la colección
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    const pokemonToInsert: { name: string, no: number }[] = [];
    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/');
      const no = Number(segments[segments.length - 2]);
      pokemonToInsert.push({ name, no });
    })
    this.pokemonModel.insertMany(pokemonToInsert); //Inserta todos lo elementos en bloque en una sola ocasión
    return 'Seed Executed';
  }

}

