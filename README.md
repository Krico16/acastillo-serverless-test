# Serverless StarWars API integration 

## Rules:

- Crear una API en Node.js con el framework Serverless para un despliegue en
  AWS.
- Adaptar y transformar los modelos de la API SWAPI a español, es decir tienen que mapear todos los nombres de los atributos del inglés al español. 
  - Ejemplo:
    ```
      { “name” : “Luke”}
    ```
    debería ser
    ```
      { “nombre” : “Luke”}
    ```

- Integrar la API de prueba StarWars API (líneas abajo está el link) se deben integrar uno o más endpoints.
- Crear un modelo de su elección mediante el uso de un endpoint POST, la data se tendrá que almacenar dentro de una base de datos.
- Crear un endpoint GET que muestre la data almacenada.

## SOLUTION:

  Para la solución de este problema se utilizó el framework Serverless para la creación de una API en Node.js, 
  la cual se desplegó en AWS. Se crearon 4 endpoints, 2 GET y 2 POST.
  Los endpoints GET se encargan de obtener la información de la base de datos. Los endpoints POST se encargan de 
  almacenar la información en la base de datos y de obtener la información de la API de StarWars.
  Para poder realizar la integración con la API de StarWars se utilizó el paquete axios, el cual permite realizar 
  peticiones HTTP. Se creó un endpoint que recibe un parámetro proxy y se encarga de realizar una petición a la 
  API de StarWars y guardar la información obtenida.
  Para poder abarcar todos los endpoints que ofrece la API de StarWars, se dividió la información de cada endpoint en 
  diferentes tablas de la base de datos. Se crearon 6 tablas, una para cada endpoint de la API de StarWars
  y se decidieron los siguientes categorias para cada tabla:
  - personas
  - planetas
  - peliculas
  - especies
  - vehiculos
  - naves

## ENDPOINTS:

  La url de la API desplegada en AWS es la siguiente:
  ```
    https://hyfmfpdsw8.execute-api.us-east-1.amazonaws.com/prod
  ```
  Con el fin de simplificar las operaciones, se decidió utilizar el siguiente formato para los endpoints:


  ### Obtener información de una categoria:

<details>
  <summary><code>GET</code> <code><b>/{categoria}</b></code> <code>(Obtiene toda la informacion de una categoria)</code></summary>

  ##### Parameters

> | name        |  type     | data type | description                        |
> |-------------|-----------|-----------|------------------------------------|
> | `categoria` |  required | string    | Debe ser una categoria de la lista |


  ##### Responses
  
  > | http code | content-type                      | response                                 |
  > |-----------|-----------------------------------|------------------------------------------|
  > | `200`     | `application/json;charset=UTF-8`        | `{"id":"ABCDE", ...}`                    |
  
  ##### Example cURL
  
  > ```shell
  > curl -X GET https://hyfmfpdsw8.execute-api.us-east-1.amazonaws.com/prod/planetas
  > ```
  
</details>

  ### Obtener información de un elemento en la categoria por id:
<details>
  <summary><code>GET</code> <code><b>/{categoria}/{id}</b></code> <code>(Obtiene toda la informacion de 1 elemento)</code></summary>

  ##### Parameters

> | name        |  type     | data type | description                        |
> |-------------|-----------|-----------|------------------------------------|
> | `categoria` |  required | string    | Debe ser una categoria de la lista |
> | `id`        |  required | string    | El id de elemento                  |

  ##### Responses

> | http code | content-type                      | response                                 |
> |-----------|-----------------------------------|------------------------------------------|
> | `200`     | `application/json;charset=UTF-8`        | `{"id":"ABCDE", ...}`                    |

  ##### Example cURL

  > ```shell
  > curl -X GET https://hyfmfpdsw8.execute-api.us-east-1.amazonaws.com/prod/planetas/DBAZK
  > ```

</details>

------------------------------------------------------------------------------------------


### Crear un elemento en la categoria:
<details>
  <summary><code>POST</code> <code><b>/{categoria}</b></code></summary>

  ##### Body

> | name                | type     | data type | description                       |
> |---------------------|----------|-----------|-----------------------------------|
> | `id`                | required | string    | El id de elemento                 |
> | `titulo`            | required | string    | Titulo del episodio               |
> | `episodio`          | required | string    | Numero de episodio                |
> | `texto_apertura`    | required | string    | Texto de apertura del episodio    |
> | `director`          | required | string    | Nombre del director               |
> | `productor`         | required | string    | Nombre del productor              |
> | `personajes`        | required | string    | Personajes que aparecen           |
> | `planetas`          | required | string    | Planetas que aparecen             |
> | `naves`             | required | string    | Naves usadas en el episodio       |
> | `vehiculos`         | required | string    | Vehiculos usadas en el episodio   |
> | `especies`          | required | string    | Especies que aparecen             |
> | `fecha_lanzamiento` | required | string    | Fecha de lanzamiento del episodio |

  ##### Responses

> | http code | content-type                      | response                                 |
> |-----------|-----------------------------------|------------------------------------------|
> | `200`     | `application/json;charset=UTF-8`        | `{"id":"ABCDE", ...}`                    |

  ##### Example cURL

  > ```shell
  > curl -X POST https://hyfmfpdsw8.execute-api.us-east-1.amazonaws.com/prod/peliculas
  > ```

</details>

### Obtener información de un elemento en la categoria desde swapi y guardarla:

<details>
  <summary><code>POST</code> <code><b>/{categoria}/{id}</b></code> <code>(Este endpoint utiliza la informacion dada en swapi)</code> </summary>

  ##### Parameters

> | name        |  type     | data type | description                        |
> |-------------|-----------|-----------|------------------------------------|
> | `categoria` |  required | string    | el nombre de la categoria en swapi |
> | `id`        |  required | int       | El id de elemento                  |

  ##### Responses

> | http code | content-type                      | response              |
> |-----------|-----------------------------------|-----------------------|
> | `200`     | `application/json;charset=UTF-8`        | `{"id":"ABCDE", ...}` |
> | `200`     | `application/json;charset=UTF-8`        | `[]`                  |

  ##### Example cURL

  > ```shell
  > curl -X POST https://hyfmfpdsw8.execute-api.us-east-1.amazonaws.com/prod/films/1
  > ```

</details>
