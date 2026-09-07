# Node.js PostgreSQL Users API

An Express API for user management backed by PostgreSQL.

## Run locally

Configure `PORT`, `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, and `DB_PASSWORD`
in `.env`, then run:

```bash
npm start
```

For development with automatic restarts:

```bash
npm run dev
```

## API documentation

After starting the server, open:

- Swagger UI: `http://localhost:<PORT>/api-docs`
- OpenAPI JSON: `http://localhost:<PORT>/api-docs.json`

The Swagger UI includes runnable requests for the health check and all user CRUD
operations. Validate that every route is present in the generated document with:

```bash
npm run validate:docs
```

## Endpoints

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/health` | Check API and database health |
| `GET` | `/users?search=<text>` | List users, optionally filtering by name or email |
| `POST` | `/users` | Create a user |
| `PUT` | `/users/{id}` | Replace a user's name and email |
| `DELETE` | `/users/{id}` | Delete a user |
