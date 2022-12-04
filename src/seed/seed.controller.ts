import { Controller, Get } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';


@Controller('seed')
export class SeedController {

  private readonly axios: AxiosInstance = axios;

  @Get()
  async executeSeed() {
    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10');
    data.results.forEach(({ name, url}) => {
      const segments = url.split('/');
      const no = Number(segments[segments.length - 2]);
      console.log({name, no});
    })
    return data.results;
  }

}
