# Home Assistant Next.js Starter

This is a very basic Next.js starter for creating custom frontends for Home Assistant.
It includes auth and connection functionality from [`home-assistant-js-websocket`](https://github.com/home-assistant/home-assistant-js-websocket).

# Features

- [x] Authentication
- [x] Connection management
- [x] Entity helper hooks
- [ ] Service helpers
- [ ] Config helpers

# Getting Started

1. Clone this repository

```shell
$ git clone https://github.com/dangreco/home-assistant-nextjs-starter 
```

2. Install dependencies
```shell
$ yarn
```

3. Edit `utils/config.ts` with the name of your app:
```tsx
const APP_NAME = 'app-name'; // <- Edit this!

export {
  APP_NAME,
}
```

4. Start the dev server
```shell
$ yarn dev
```

5. Open up `localhost:3000` in your browser, you're done!

# Hooks

## Entities

- `useEntity( entityId: string )` Retrieves an entity for the given `entityId`,`undefined` if the entity is not found.

- `useEntities( entityIds?: string[] )` Retrives an object of entities matching the given `entityIds`. If a given entity with ID `entityId` was not found, the corresponding entry `myEntities[entityId]` will be `undefined`. If `entityIds` is undefined, this hook returns all entities.

- `useDomain( domain: string )` Retrieves an object of entities matching the given `domain`. E.g., `useDomain('light')` will return all entities with IDs matching `light.xxxxxxxx`. 

- `useQuery( query: string )` Searches all available entites by `query`. Matches are based on both the `entity_id` and `friendly_name` of the entity. 

- **TODO** `useHistory( entityId: string )` ~~Retrieves the history for an entity given its `entityId`.~~

## Other

- `useDiscovery( max?: number )` Finds Home Assistant servers on the local network. Stops the search once `max` instances are found. If `max` is undefined, this will search forever.

- `useAuth()` Retrieves current authentication information. The field `logout` is a function to log out of the current auth.

- `useHass()` Retrieves the current Home Assistant state, incuding fields `connection`, `entities`, `services`, `config`. 


# Pages

- `pages/index.tsx` This is where your "dashboard" should go. The user will be redirected to this route after succesful authentication.

- `pages/auth/index.tsx` This is where the user will find a Home Assistant instance and authenticate.