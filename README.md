## Setup

Instalación de paquetes segun tu manejador:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Iniciar el proyecto en el servidor de desarrollo (local) segun tu manejador `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Compila la app para producción:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Corre un preview:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```


## DESCRIPCIÓN 
Aplicación web desarrollada con Nuxt 4, Vue y Pinia.
Incluye una pantalla de inicio de sesión (login simulado) cuyo objetivo es demostrar el manejo básico del enrutamiento en Nuxt. Este proceso se gestiona mediante un middleware que valida si el estado de autenticación —almacenado en Pinia— es verdadero antes de permitir el acceso a determinadas rutas.

La aplicación también cuenta con un dashboard de búsqueda de libros que consume la API pública de Open Library. Este módulo presenta los resultados en dos vistas (grid y lista), e incluye un buscador con dos criterios (Titulo y Autor) y un filtro adicional por fecha.

Además, las búsquedas se manejan mediante query params, lo que permite conservar el estado en la URL. De esta forma, al copiar y pegar la dirección, el usuario puede recuperar exactamente el mismo estado de búsqueda.

La arquitectura del proyecto sigue el enfoque convencional de Nuxt, separando responsabilidades entre la capa de interfaz de usuario, la gestión de estado con Pinia y la integración con la API externa. Toda la lógica relacionada con filtrado y paginación fluye a través de Pinia, garantizando una gestión centralizada, consistente y escalable del estado.