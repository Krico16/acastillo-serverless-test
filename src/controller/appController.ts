import {DynamoDBService} from "../service/dynamodb.service";
import {RequestMapper} from "../utils/requestMapper";
import {customAlphabet} from "nanoid";
import {SWapiService} from "../service/SWapi.service";

export class AppController {
  private dbService;
  private readonly SWapiService;

  constructor() {
    this.dbService = new DynamoDBService();
    this.SWapiService = new SWapiService();
  }

  async getAll(event: any, context: any) {
    const {category} = event.pathParameters;
    const table = dbGroup[category];
    if (!table) {
      return {
        statusCode: 404,
        body: JSON.stringify({message: 'Category not found'})
      }
    }
    const result = await this.dbService.getAll(table);

    return result ? {
      statusCode: 200,
      body: JSON.stringify(result)
    } : {
      statusCode: 500,
      body: JSON.stringify({message: 'Internal server error'})
    }
  }

  async getById(event: any, context: any) {
    const {category, id} = event.pathParameters;
    const table = dbGroup[category];
    if (!table) {
      return {
        statusCode: 404,
        body: JSON.stringify({message: 'Category not found'})
      }
    }
    const result = await this.dbService.getById(table, id);
    if (!result) {
      return {
        statusCode: 404,
        body: JSON.stringify({message: 'Not found'})
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    }
  }

  async save(event: any, context: any) {
    const {category} = event.pathParameters;
    const table = dbGroup[category];
    const parser = dbParsers[table];
    const body = JSON.parse(event.body);
    try {
      const result = await this.dbService.save(table, parser(body));
      if (!result) {
        return {
          statusCode: 400,
          body: JSON.stringify({message: 'Bad request'})
        }
      }
      return {
        statusCode: 201,
        body: JSON.stringify(result)
      }
    } catch (error) {
      console.error(error)
      return {
        statusCode: 500,
        body: JSON.stringify({message: 'Internal server error'})
      }
    }
  }

  async saveFromApi(event: any, context: any) {
    const {category, id} = event.pathParameters;
    const table = dbGroup[category];
    const parser = dbParsers[category];
    console.log(table, parser)
    try {
      const apiResult = await this.SWapiService.sendGetRequest(`/${category}/${id}`);
      const result = await this.dbService.save(table, parser(apiResult));
      if (!result) {
        return {
          statusCode: 400,
          body: JSON.stringify({message: 'Bad request'})
        }
      }
      return {
        statusCode: 201,
        body: JSON.stringify(result)
      }
    } catch (error) {
      console.error(error)
      return {
        statusCode: 500,
        body: JSON.stringify({message: 'Internal server error'})
      }
    }
  }
}


enum dbGroup {
  'personajes' = 'PeopleTable',
  'planetas' = 'PlanetsTable',
  'naves' = 'StarshipsTable',
  'vehiculos' = 'VehiclesTable',
  'especies' = 'SpeciesTable',
  'peliculas' = 'FilmsTable',
  'people' = 'PeopleTable',
  'planets' = 'PlanetsTable',
  'starships' = 'StarshipsTable',
  'vehicles' = 'VehiclesTable',
  'species' = 'SpeciesTable',
  'films' = 'FilmsTable',
}
const customID = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 5);

const dbParsers = {
  'personajes': (payload) => RequestMapper.fromCharactersRequest(customID(), payload),
  'planetas': (payload) => RequestMapper.fromPlanetsRequest(customID(), payload),
  'naves': (payload) => RequestMapper.fromStarshipsRequest(customID(), payload),
  'vehiculos': (payload) => RequestMapper.fromVehiclesRequest(customID(), payload),
  'especies': (payload) => RequestMapper.fromSpeciesRequest(customID(), payload),
  'peliculas': (payload) => RequestMapper.fromFilmsRequest(customID(), payload),
  'people': (payload) => RequestMapper.fromCharactersRequest(customID(), payload),
  'planets': (payload) => RequestMapper.fromPlanetsRequest(customID(), payload),
  'starships': (payload) => RequestMapper.fromStarshipsRequest(customID(), payload),
  'vehicles': (payload) => RequestMapper.fromVehiclesRequest(customID(), payload),
  'species': (payload) => RequestMapper.fromSpeciesRequest(customID(), payload),
  'films': (payload) => RequestMapper.fromFilmsRequest(customID(), payload),
};
