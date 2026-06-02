# How to run NoteMe locally

## Prerequisites
- Node.js 18+
- MongoDB (local OR free Atlas account)

---

## Step 1 — Set up MongoDB

**Option A: MongoDB Atlas (easiest, free)**
1. Go to https://mongodb.com/atlas and create a free account
2. Create a free M0 cluster
3. Under "Connect" → "Drivers" → copy the connection string
4. It looks like: `mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/noteme`

**Option B: Local MongoDB**
- Install MongoDB Community Edition and start it
- Your URI is simply: `mongodb://localhost:27017/noteme`

---

## Step 2 — Configure the .env file

Open `.env` in the project root and set your values:

```
MONGO_URI=mongodb://localhost:27017/noteme   ← paste your URI here
JWT_SECRET=any_long_random_string_here
PORT=5000
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

---

## Step 3 — Install dependencies

```bash
npm install
```

---

## Step 4 — Run both servers at once

```bash
npm run dev:full
```

This starts:
- **Backend** on http://localhost:5000
- **Frontend** on http://localhost:5173

The Vite proxy forwards all `/api/*` requests to the backend automatically.

---

## Or run them separately

Terminal 1 (backend):
```bash
npm run dev:server
```

Terminal 2 (frontend):
```bash
npm run dev
```

---

## Test it

1. Open http://localhost:5173/signup
2. Fill in the form and click "Create Free Account"
3. You should be redirected to the dashboard

If you see any error, check Terminal 1 for backend logs.
