![Node.js + TypeScript](https://miro.medium.com/v2/resize:fit:1200/1*13tuiEIYR-qJpX4WKW-dng.png)

# Node TS Starter 2025

A minimal TypeScript Node.js starter project featuring Express, Prisma ORM, authentication utilities, and Zod validation.

This repository is a scaffold for small APIs or services. It includes a simple auth flow, Prisma schema and migrations, and TypeScript configuration for production builds and developer convenience.

## Key Features

- Express server
- Prisma as the ORM with migrations and generated client
- JWT-based authentication helpers and middleware
- Password hashing with bcrypt
- Input validation using Zod
- TypeScript strict mode and a production build pipeline

## Prerequisites

- Node.js (recommended: 18+)
- npm
- A database supported by Prisma (e.g., PostgreSQL, MySQL, SQLite). Set via `DATABASE_URL` in `.env`.

## Quick start

1. Clone the repo:

	git clone <repo-url>
	cd node-ts-starter-2025

2. Install dependencies:

	cmd
	npm install

3. Create a `.env` file in the project root (an example is below):

	```text
	DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
	JWT_SECRET=your_jwt_secret_here
	PORT=3000
	```

4. Generate Prisma client and run migrations (development):

	cmd
	npx prisma generate
	npx prisma migrate dev --name init

5. Start in development mode (uses ts-node-dev):

	cmd
	npm run dev

6. Build and run production bundle:

	cmd
	npm run build
	npm start

## Available npm scripts

- `npm run dev` — start server with automatic restart for development (uses `ts-node-dev`).
- `npm run build` — compile TypeScript into `./dist` (uses `tsc`).
- `npm start` — run the compiled production bundle from `dist`.

These are defined in `package.json`.

## Environment variables

At minimum configure the following in `.env`:

- `DATABASE_URL` — connection string for Prisma
- `JWT_SECRET` — secret used to sign JWT tokens
- `PORT` — port the Express server listens on (default 3000)

## Prisma

- Prisma schema: `prisma/schema.prisma`
- Migrations are stored in: `prisma/migrations`
- There is a TypeScript-based Prisma config at `prisma.config.ts` (loads `.env`).

Common commands:

	cmd
	npx prisma generate
	npx prisma migrate dev
	npx prisma migrate deploy

Note: If you run into TypeScript issues with `prisma.config.ts` being outside `src/`, see Troubleshooting below.

## Project structure (top-level)

- `src/` — application source files
  - `app.ts`, `server.ts` — server bootstrap
  - `config/` — configuration (includes `prisma.ts`)
  - `controllers/` — route handlers (e.g., `auth.controller.ts`, `user.controller.ts`)
  - `middlewares/` — Express middlewares (auth, validation)
  - `routes/` — route registration (e.g., `auth.routes.ts`, `user.routes.ts`)
  - `services/` — business logic and helpers (e.g., `auth.service.ts`)
  - `utils/`, `models/`, `validation/` — supporting code
- `prisma/` — Prisma schema & migrations
- `tsconfig.json` — TypeScript configuration
- `prisma.config.ts` — Prisma TypeScript configuration (project root)

## Notes on TypeScript configuration

You may see an error like:

```
File '.../prisma.config.ts' is not under 'rootDir' './src'. 'rootDir' is expected to contain all source files.
```

Cause: `tsconfig.json` has `rootDir` set to `./src`, but `prisma.config.ts` is located at the project root. TypeScript expects all included source files to be inside `rootDir`.

Options to resolve:

1. Move `prisma.config.ts` into `src/` (recommended if you want it compiled with the app).
2. Change `rootDir` in `tsconfig.json` to `.` so files at the root are included:

	```jsonc
	{
	  "compilerOptions": {
		 "rootDir": ".",
		 "outDir": "./dist"
	  }
	}
	```

3. Exclude the file from compilation if it should not be part of the ts program (the repository already added `prisma.config.ts` to `exclude` in `tsconfig.json`).

Pick the option that matches how you run Prisma and whether you want `prisma.config.ts` compiled with your app.

## Development notes

- The project uses strict TypeScript settings (`strict: true`) and `esModuleInterop`.
- If you change the Prisma schema, run `npx prisma generate` and appropriate migration commands.

## Try it — quick commands

Install dependencies:

```cmd
npm install
```

Generate Prisma client and run dev migration:

```cmd
npx prisma generate
npx prisma migrate dev --name init
```

Run in development (auto-reload):

```cmd
npm run dev
```

Build and run production output:

```cmd
npm run build
npm start
```

## Example .env (create `.env` at project root)

```text
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
JWT_SECRET=your_jwt_secret_here
PORT=3000
```

## Tests & Linting

This project includes Jest for testing and ESLint + Prettier for linting/formatting.

Available test & lint scripts (from `package.json`):

- `npm test` — run Jest tests with coverage (`jest --coverage`).
- `npm run test:watch` — run Jest in watch mode.
- `npm run lint` — run ESLint across `src/**/*.ts`.
- `npm run lint:fix` — run ESLint and attempt to fix problems.

Notes:

- Jest is configured via `jest.config.js` to use `ts-jest` and run tests matching `**/__tests__/**/*.test.ts`.
- Supertest is available as a dev dependency for HTTP integration tests.
- ESLint is configured with TypeScript support (`@typescript-eslint/parser` and plugin) and integrates Prettier.

Suggested quick commands:

```cmd
# Run tests once with coverage
npm test

# Run tests in watch mode during development
npm run test:watch

# Run linter
npm run lint

# Auto-fix lint problems
npm run lint:fix
```

## Contributing

1. Fork the repo and create a feature branch.
2. Open a pull request with a clear description of changes.

## License

This project currently has `ISC` listed in `package.json`. Adjust or add a LICENSE file if needed.
