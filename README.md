# 🔠 Hangman2 — Serverless Frontend Hangman Game (React + Redux Toolkit + Firebase)

> A work-in-progress Hangman game built with React, Redux Toolkit and Firebase (Functions, Firestore).
> Includes a monorepo structure, typed backend logic, and Firebase Functions for server-side word validation.
> A bit of Jest tests a bit of docs for now.

- 🎮 [Live Demo](https://hangman.maxkab.com) — play right in your browser

---

## ✨ Features

- 🧩 **Classic Hangman gameplay** — guess the word letter by letter
- ⚡️ **Realtime Firestore updates** — no refresh needed
- 🧠 **Letter validation via Firebase Functions**
- 🗂️ **Monorepo structure** — clean separation of frontend and backend
- 🌍 **100% serverless** — deployable on Firebase

---

## 🧱 Stack

| Layer     | Tech                      |
| --------- | ------------------------- |
| Frontend  | React, Tailwind CSS, Vite |
| Backend   | Firebase Functions        |
| Database  | Firestore (NoSQL)         |
| API Layer | Codegen                   |
| Tooling   | TypeScript, Monorepo      |

---

## 📁 Structure

```bash
hangman2/
├── functions/      # Firebase Functions
├── src/            # Frontend app (React + Redux Toolkit + Tailwind)
        ├── src/providers/firebase  # Functions Client
└── graphql/        # Shared schema + typegen config
```
