import {Character} from "../model/Character";
import {Films} from "../model/Films";
import {urlTransformer} from "./requestTransformer";
import {Planet} from "../model/Planet";
import {Specie} from "../model/Specie";
import {Vehicles} from "../model/Vehicles";
import {Starship} from "../model/Starship";

export class RequestMapper {
  public static fromCharactersRequest(id: string, payload: any): Character {
    return {
      id: id,
      nombre: payload.name,
      altura: payload.height,
      color_ojo: payload.eye_color,
      color_pelo: payload.hair_color,
      color_piel: payload.skin_color,
      especie: payload.species.map((url: string) => urlTransformer(url)),
      fecha_nacimiento: payload.birth_year,
      genero: payload.gender,
      masa: payload.mass,
      naves: payload.starships.map((url: string) => urlTransformer(url)),
      pelicula: payload.films.map((url: string) => urlTransformer(url)),
      planeta_hogar: urlTransformer(payload.homeworld),
      vehiculo: payload.vehicles.map((url: string) => urlTransformer(url)),
    }
  }

  public static fromFilmsRequest(id: string, payload: any): Films {
    return {
      id: id,
      director: payload.director,
      episodio: payload.episode_id,
      productor: payload.producer,
      texto_apertura: payload.opening_crawl,
      titulo: payload.title,
      especies: payload.species.map((url: string) => urlTransformer(url)),
      fecha_lanzamiento: payload.release_date,
      naves: payload.starships.map((url: string) => urlTransformer(url)),
      personajes: payload.characters.map((url: string) => urlTransformer(url)),
      planetas: payload.planets.map((url: string) => urlTransformer(url)),
      vehiculos: payload.vehicles.map((url: string) => urlTransformer(url))
    }
  }

  public static fromPlanetsRequest(id: string, payload: any): Planet {
    return {
      id,
      nombre: payload.name,
      clima: payload.climate.split(','),
      diametro: payload.diameter,
      gravedad: payload.gravity,
      peliculas: payload.films.map((url: string) => urlTransformer(url)),
      periodo_orbital: payload.orbital_period,
      periodo_rotacion: payload.rotation_period,
      poblacion: payload.population,
      residentes: payload.residents.map((url: string) => urlTransformer(url)),
      superficie_agua: payload.surface_water,
      terreno: payload.terrain.split(',')
    }
  }

  public static fromSpeciesRequest(id: string, payload: any): Specie {
    return {
      id,
      nombre: payload.name,
      altura_promedio: payload.average_height,
      clasificacion: payload.classification,
      colores_cabello: (payload.hair_colors?.split(',') ?? []).filter(Boolean),
      colores_ojo: (payload.eye_colors?.split(',')?? []).filter(Boolean),
      colores_piel: (payload.skin_colors?.split(',')?? []).filter(Boolean),
      designacion: payload.designation,
      idioma: payload.language,
      peliculas: payload.films.map((url: string) => urlTransformer(url)),
      personajes: payload.people.map((url: string) => urlTransformer(url)),
      planeta_hogar: urlTransformer(payload.homeworld) || payload.homeworld,
      promedio_vida: payload.average_lifespan
    }
  }

  public static fromVehiclesRequest(id: string, payload: any): Vehicles {
    return {
      id,
      nombre: payload.name,
      capacidad_carga: payload.cargo_capacity,
      clase_vehiculo: payload.vehicle_class,
      consumibles: payload.consumables,
      costo_en_creditos: payload.cost_in_credits,
      fabricante: payload.manufacturer,
      longitud: payload.length,
      modelo: payload.model,
      pasajeros: payload.passengers,
      peliculas: payload.films.map((url: string) => urlTransformer(url)),
      pilotos: payload.pilots.map((url: string) => urlTransformer(url)),
      tripulacion: payload.crew,
      velocidad_maxima_atmosfera: payload.max_atmosphering_speed
    }
  }

  public static fromStarshipsRequest(id: string, payload: any): Starship {
    return {
      id,
      nombre: payload.name,
      capacidad_carga: payload.cargo_capacity,
      consumibles: payload.consumables,
      costo_en_creditos: payload.cost_in_credits,
      fabricante: payload.manufacturer,
      longitud: payload.length,
      modelo: payload.model,
      pasajeros: payload.passengers,
      tripulacion: payload.crew,
      velocidad_maxima_atmosfera: payload.max_atmosphering_speed,
      calificacion_hiperimpulsor: payload.hyperdrive_rating,
      MGLT: payload.MGLT,
      clase_vehiculo: payload.starship_class,
      peliculas: payload.films.map((url: string) => urlTransformer(url)),
      pilotos: payload.pilots.map((url: string) => urlTransformer(url)),
    }
  }
}