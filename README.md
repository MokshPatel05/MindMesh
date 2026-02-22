# MindMesh

MindMesh is a full‑stack real-time collaboration app (audio/video calls + chat) built with a Node.js + Express backend using Socket.IO and a React frontend (Create React App). The project demonstrates WebRTC signaling via Socket.IO, in‑memory room/message management, and a simple users API.

---

## Table of contents

- [Features](#features)
- [Tech stack & libraries](#tech-stack--libraries)
- [Architecture & file structure](#architecture--file-structure)
- [Socket events / Real-time behavior](#socket-events--real-time-behavior)
- [API routes](#api-routes)
- [Environment variables](#environment-variables)
- [Local setup (development)](#local-setup-development)
- [Production / deployment notes](#production--deployment-notes)
- [Known limitations](#known-limitations)
- [Contributing](#contributing)
- [License & contact](#license--contact)

---

## Features

- Real-time room-based audio/video calls (signaling for WebRTC handled via Socket.IO).
- Real-time text chat in rooms, with simple in-memory message persistence (history delivered to newly joined clients).
- User management API scaffold under `/api/v1/users`.
- Uses MongoDB (via Mongoose) for persistent data (user-related features).
- Frontend built with React and Material UI.

---

## Tech stack & libraries

Backend (backend/package.json)
- Node.js + Express
- socket.io
- mongoose (MongoDB)
- bcrypt
- cors
- crypto
- http-status
- nodemon (used in scripts; included in package.json)
- pm2 (used in `prod` script - expected in runtime environment)

Frontend (frontend/package.json)
- React (Create React App)
- react-router-dom
- axios
- socket.io-client
- Material UI (MUI): `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`
- http-status
- web-vitals
- Testing utils: `@testing-library/react`, etc.

(See the two package.json files for full dependency versions.)

---

## Architecture & file structure (high level)

- backend/
  - package.json
  - package-lock.json
  - src/
    - app.js                 -- main Express + Socket.IO server entry
    - controllers/
      - socketManager.js     -- Socket.IO setup and event handlers (room management, chat, signaling)
    - routes/
      - users.routes.js      -- user-related API endpoints (mounted at `/api/v1/users`)
    - models/ (likely user schemas) 
- frontend/
  - package.json
  - package-lock.json
  - public/
  - src/                    -- React app source (built with Create React App)
  - README.md               -- CRA-generated README

---

## Socket events / Real-time behavior

Implemented in `backend/src/controllers/socketManager.js`. Important events:

- `join-call` (payload: path/room)
  - Adds socket to in-memory `connections[path]`.
  - Records `timeOnline[socket.id]`.
  - Emits `user-joined` to every client in the room with the new socket id and full connections list.
  - If the room has stored messages, sends them to the newly joined socket via `chat-message`.

- `signal` (payload: toId, message)
  - Used for WebRTC signaling. Forwards signaling message to the `toId` socket as `signal` with the sender socket id.

- `chat-message` (payload: data, sender)
  - Finds the room the sender belongs to, stores the message in in-memory `messages[room]`, and broadcasts `chat-message` to all sockets in that room.
  - Stored message shape includes sender, data, and socket-id-sender.

- `disconnect`
  - Calculates time online.
  - Finds and removes socket from any room in `connections`.
  - Broadcasts `user-left` to remaining members of the room.
  - Removes empty rooms from `connections`.

Important: messages and connections are stored in server memory (plain objects). They reset when the server restarts.

---

## API routes

- Users API is mounted at: `/api/v1/users` (see `backend/src/routes/users.routes.js`).
- The server listens on port 8000 by default (see `backend/src/app.js`).

(Explore further in the `backend/src` folder to see the exact controllers and models used for user handling.)

---

## Environment variables

Create a `.env` (or set env vars in your host) and provide these values:

- MONGO_URI (recommended) — MongoDB connection string (replace any hard-coded string in `app.js` with this env var)
- PORT (optional) — Backend port (defaults to 8000)
- FRONTEND_URL / CORS_ORIGIN (optional) — Frontend origin to restrict CORS (the server currently allows `*` in Socket.IO CORS)

Example `.env`:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/mindmesh?retryWrites=true&w=majority
PORT=8000
```

Important security note: Do not commit secrets (like DB credentials) to the repo. Remove the hard-coded string from `backend/src/app.js` and use `process.env.MONGO_URI` before production.

---

## Local setup (development)

Prerequisites:
- Node.js (v16+ recommended)
- npm
- MongoDB Atlas or local MongoDB instance

1. Clone the repo
```bash
git clone https://github.com/MokshPatel05/MindMesh.git
cd MindMesh
```

2. Backend
```bash
cd backend
# install dependencies
npm install

# set MONGO_URI in your environment (see .env example above)
export MONGO_URI="your-mongo-uri"

# run in dev with hot reload (nodemon)
npm run dev

# or run production (node)
npm start

# `prod` script uses pm2:
npm run prod
```

The backend default listens on port 8000.

3. Frontend
```bash
cd frontend
npm install
npm start
```

The CRA frontend runs on port 3000 by default. Ensure your frontend is configured to connect to the backend socket and API endpoints (e.g., `http://localhost:8000`).

---

## Example: How WebRTC signaling typically flows (frontend perspective)

1. A user creates/joins a room and emits `join-call` with the room path.
2. The backend informs other participants (`user-joined`) so peers can initiate WebRTC connections.
3. Peers exchange SDP/ICE candidates via `signal` events using socket ids.
4. Text messages are sent via `chat-message` and broadcast to the room.

Frontend should use `socket.io-client` and WebRTC (RTCPeerConnection) with the usual offer/answer/ICE exchange.

---

## Known limitations & TODOs

- In-memory storage:
  - Rooms (`connections`) and chat history (`messages`) are stored in memory and will be lost on server restart. Consider persisting messages and room metadata to MongoDB for production.
- Hard-coded MongoDB connection string currently exists in `backend/src/app.js`. Replace with env var usage for security.
- Authentication & authorization:
  - Add token-based authentication (JWT) for secure user identity and access control.
- Scalability:
  - Socket.IO running on a single server will not scale across multiple instances without a shared adapter (Redis adapter or similar).

---

## Deployment notes

- Use environment variables for secrets (MONGO_URI, any JWT secrets).
- If deploying multiple backend instances, configure Socket.IO with a message broker/adapter (e.g., Redis) so sockets can be routed across instances.
- Use HTTPS / secure WebSocket (wss://) in production.
- Consider containerizing backend & frontend or deploying frontend as static build to a CDN.

---

## Contributing

Contributions are welcome. Typical workflow:
- Fork the repo
- Create a feature branch
- Open a pull request with a clear description and tests where applicable

Please file issues for bugs or feature requests.

---

## License & contact

- Repository owner: MokshPatel05
- For questions or help, open an issue in the repository.

---