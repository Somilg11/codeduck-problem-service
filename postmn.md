# Postman collection for Problem Service

This repo includes a Postman collection to exercise the Problem Service v1 API.

Files added:
- `postman_collection.json` — Postman collection you can import directly into Postman.

Base URL and environment
- The server listens on `http://localhost:3001` by default. The collection includes a collection variable `baseUrl` set to `http://localhost:3001/api/v1`.
- If you run the server on a different port or host, update the `baseUrl` collection variable in Postman.

How to import
1. Open Postman.
2. File > Import > Choose File > select `postman_collection.json` from the repo root.
3. The collection `Problem Service API` will appear.

Common variables
- `baseUrl` — base url (default: `http://localhost:3001/api/v1`).
- `problemId` — saved automatically by the Create Problem request; used by Get/Update/Delete requests.
- `searchQuery` — default sample query for the Search request.

Requests included

- Ping
  - Ping - root (Pong): GET `{{baseUrl}}/ping` — returns JSON { message: 'Pong!' }
  - Ping - health: GET `{{baseUrl}}/ping/health` — returns text 'OK'

- Problems
  - Create Problem: POST `{{baseUrl}}/problems` — JSON body sample:

```json
{
  "title": "Sum Two Numbers",
  "description": "Given two numbers, return their sum.",
  "difficulty": "easy",
  "editorial": "Add the two numbers.",
  "testcases": [
    { "input": "1 2", "output": "3" },
    { "input": "5 7", "output": "12" }
  ]
}
```

  - Get All Problems: GET `{{baseUrl}}/problems` — returns array of problems and total count.
  - Get Problem by ID: GET `{{baseUrl}}/problems/{{problemId}}` — requires `problemId` set (from Create Problem).
  - Update Problem: PUT `{{baseUrl}}/problems/{{problemId}}` — sample body: `{ "title": "Sum Two Numbers - Updated" }`.
  - Delete Problem: DELETE `{{baseUrl}}/problems/{{problemId}}` — deletes the problem.
  - Find By Difficulty: GET `{{baseUrl}}/problems/difficulty/easy` — replace `easy` with `medium` or `hard` as needed.
  - Search Problems: GET `{{baseUrl}}/problems/search?q={{searchQuery}}` — searches title and description.

Notes and tips
- The Create Problem request saves the created problem's `_id` into the collection variable `problemId` so subsequent requests can use it. If your DB rejects a duplicate title (model has unique index on `title`), change the title before creating.
- The collection includes basic tests that assert status codes and a few response fields.
- If you run the server under a different base path (or behind a proxy), update `baseUrl` accordingly.

Troubleshooting
- If Create Problem returns a validation error, check the response body for the validation message (server uses zod). Ensure required fields are provided.
- If the server is not running, start it: from the project root run `npm install` (if needed) and `npm run dev` or `npm start` depending on your scripts.

That's it — import the collection and you can run individual requests or the entire collection runner.
