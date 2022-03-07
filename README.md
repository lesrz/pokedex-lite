# <img src="https://user-images.githubusercontent.com/87744767/156889575-f2850a70-bb88-4c33-9ad1-dbc34154f7f6.png" width="24"> Pokédex Lite

| <a href="https://angular.io/" alt="angular site"><img src="https://cdn.worldvectorlogo.com/logos/angular-3.svg" alt="angular" height="24" align="center"></a> | <a href="https://www.typescriptlang.org/" alt="typescript site"><img src="https://i.pinimg.com/originals/c3/8e/e8/c38ee8475ee7f3680f706c56c3a1194c.png" alt="typescript" height="32" align="center"></a> |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                          **13.2.5**                                                                           |                                                                                                **4.5.2**                                                                                                 |

[![Figma Design](https://img.shields.io/badge/figma-design%20file-orange)](https://www.figma.com/file/YGnnCFY9270C0OdSR6x13a/pok%C3%A9dex-lite?node-id=0%3A1)

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

> API-URL representa la URL de la API a consumir

```json
    "/api": {
    "target": "API-URL",
    "secure": true,
    "changeOrigin": true,
    "pathRewrite": {
      "^/api": ""
        }
    }
```

> Añadir las siguientes opciones a `angular.json` para no tener que llamar al proxy en la consola

```json
    "serve":
        {
          "options": {
            "browserTarget": "projectname:build",
            "proxyConfig": "./proxy.conf.json"
        },
```

## Login

Es recomendable loggear con el user `trainer` para una mejor experiencia, ya que configuré el array de Pokémon con datos e imágenes reales.

## To Do

- [ ] Evitar que se hagan solicitudes a la API cada vez que se carga la página `home`. (Alta prioridad)
- [ ] Abstraer componentes como `container`, `button`, `input` para reutilizarlos en toda la aplicación.
- [ ] Mejorar lógica de sesión. Actualmente se puede acceder a la página `login` incluso si ya hay un usuario loggeado.
- [ ] Añadir guards para los componentes de `edit` y `add` Pokémon.
- [ ] Lanzar excepciones para todo en la UI.
- [ ] Limitar las opciones que el usuario puede editar/agregar en `types`.
- [ ] Crear una función para matchear `evolutionId` a sus respectivos datos y mostrarlos.
- [ ] Barra de búsqueda.
- [ ] Subir imágen desde archivo local utilizando un servicio de terceros.

[^1]: [Fixing CORS errors with Angular CLI proxy](https://levelup.gitconnected.com/fixing-cors-errors-with-angular-cli-proxy-e5e0ef143f85)
