# <img src="https://user-images.githubusercontent.com/87744767/156889575-f2850a70-bb88-4c33-9ad1-dbc34154f7f6.png" width="24"> Pokédex Lite

| <a href="https://angular.io/" alt="angular site"><img src="https://cdn.worldvectorlogo.com/logos/angular-3.svg" alt="angular" height="24" align="center"></a> | <a href="https://www.typescriptlang.org/" alt="typescript site"><img src="https://i.pinimg.com/originals/c3/8e/e8/c38ee8475ee7f3680f706c56c3a1194c.png" alt="typescript" height="32" align="center"></a> |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                          **13.2.5**                                                                           |                                                                                                **4.5.2**                                                                                                 |

## Setting Up

1. Clonar esta repo

   ```console
       git clone https://github.com/lesrz/pokedex-lite
       cd pokedex-lite
   ```

2. Instalar dependencias

   ```console
       npm install
   ```

3. Correr el proyecto en modo de desarrollo

   ```console
       ng serve -o
   ```

   > Abrirá una pestaña con la URL `localhost:4200`

   ### Full script

   ```console
       git clone https://github.com/lesrz/pokedex-lite
       cd pokedex-lite
       npm install
       ng serve -o
   ```

## API Proxy

Pokédex Lite está configurado para correr en un entorno de desarrollo, por lo cual la configuración de CORS sólo incluye el puerto de `localhost:4200`, faltando otro tipo de configuración para el entorno de producción.

Utilizo un proxy configurado en `proxy.conf.json` para apuntar al URL del API como conexión segura. Referencia[^1].

```
    "/api": {
    "target": "API-URL", // API-URL representa la URL real de la API
    "secure": true,
    "changeOrigin": true,
    "pathRewrite": {
      "^/api": ""
        }
    }
```

## Login

Es recomendable loggear con el user `trainer` para una mejor experiencia, ya que configuré el array de Pokémon con datos e imágenes reales.

[^1]: [Fixing CORS errors with Angular CLI proxy](https://levelup.gitconnected.com/fixing-cors-errors-with-angular-cli-proxy-e5e0ef143f85)
