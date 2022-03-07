# <img src="https://user-images.githubusercontent.com/87744767/156889575-f2850a70-bb88-4c33-9ad1-dbc34154f7f6.png" width="24"> Pokédex Lite

| <a href="https://angular.io/" alt="angular site"><img src="https://cdn.worldvectorlogo.com/logos/angular-3.svg" alt="angular" height="24" align="center"></a> | <a href="https://www.typescriptlang.org/" alt="typescript site"><img src="https://i.pinimg.com/originals/c3/8e/e8/c38ee8475ee7f3680f706c56c3a1194c.png" alt="typescript" height="32" align="center"></a> |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                          **13.2.5**                                                                           |                                                                                                **4.5.2**                                                                                                 |

[![Figma Design](https://img.shields.io/badge/figma-design%20file-orange)](https://www.figma.com/file/YGnnCFY9270C0OdSR6x13a/pok%C3%A9dex-lite?node-id=0%3A1)

> <a href="https://user-images.githubusercontent.com/87744767/156983748-3c64f73e-b1a4-4098-bafe-6a7e70459632.png" alt="expandir">**🔗 Expand diagram**</a> 💡 Abrir en nueva pestaña: `CTRL + Click` <p align="left"><img src="https://user-images.githubusercontent.com/87744767/156983748-3c64f73e-b1a4-4098-bafe-6a7e70459632.png" alt="diagrama" height=140></p>

<p align="center"><img src="https://user-images.githubusercontent.com/87744767/157090639-016732ff-5acb-45dc-bdcf-99ab5d2e5b6e.png" alt="captura" width="900" height="100%"></p>

> **🛠 Tools:** Visual Studio Code, Figma, Postman, HTTPie, Swagger

## Index

- [Setting Up](#setting-up)
  - [Full script](#full-script)
- [API Proxy](#api-proxy)
- [Login](#login)
- [Pokédex Service](#pokédex-service)
- [To Do](#to-do)

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

## Pokédex Service

**Añadir**

La funcionalidad de añadir Pokémon crea un objeto `null`. No logré encontrar la causa desde el front, parece ser algún error de la API ya que ingresando los siguientes datos:

```json
{
  "pokemon": {
    "id": 303,
    "name": "Mawile",
    "lvl": 12,
    "evolutionId": 0,
    "abilities": [
      {
        "name": "Mordisco",
        "description": "Un voraz bocado que puede hacer retroceder al objetivo."
      },
      {
        "name": "Llanto Falso",
        "description": "Lágrimas de cocodrilo que bajan mucho la Defensa Especial del objetivo."
      }
    ],
    "type": ["steel", "fairy"],
    "image": "https://static.wikia.nocookie.net/espokemon/images/b/bd/Mawile.png/revision/latest?cb=20150301011351"
  },
  "userId": "1"
}
```

La API resuelve sin problemas, aceptando los datos tal cual están (la interface dentro de `pokedex.service.ts` refleja este body hasta en órden), pero al solicitar la lista nuevamente figura como `null`. El resultado es igual tanto en la app como en mis tests de Postman y HTTPie.

Es posible que haya algo muy obvio que no estoy viendo, pero al estar cerca de la fecha límite y sin acceso a la base de datos no podré solucionarlo.

## To Do

- [ ] Evitar que se hagan solicitudes a la API cada vez que se carga la página `home`. (Alta prioridad)
- [ ] Abstraer componentes como `container`, `button`, `input` para reutilizarlos en toda la aplicación.
- [ ] Mejorar lógica de sesión. Actualmente se puede acceder a la página `login` incluso si ya hay un usuario loggeado.
- [ ] Añadir guards para los componentes de `edit` y `add` Pokémon.
- [ ] Lanzar excepciones para todo en la UI.
- [ ] Limitar las opciones que el usuario puede editar/agregar en `types`.
- [ ] Crear una función para matchear `evolutionId` a sus respectivos datos y mostrarlos.
- [ ] Implementar redirección de URLs no existentes a `404` (actualmente sólo accesible ingresando /404).
- [ ] Barra de búsqueda.
- [ ] Subir imágen desde archivo local utilizando un servicio de terceros.

[^1]: [Fixing CORS errors with Angular CLI proxy](https://levelup.gitconnected.com/fixing-cors-errors-with-angular-cli-proxy-e5e0ef143f85)
