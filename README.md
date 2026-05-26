# Work Journal — Frontend

React-based UI for logging and filtering daily work records.

> Make sure the backend is running before starting the frontend.

---

## Tech Stack

| Tool                | Why                                                                                                                                                             |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **React 19 + Vite** | Instant HMR, minimal config, fastest dev feedback loop                                                                                                          |
| **TypeScript**      | Shared type contracts with the backend DTOs; catches integration errors at compile time                                                                         |
| **RTK Query**       | Server state with automatic caching and tag-based invalidation — no manual `useEffect` fetching or loading flags                                                |
| **Mantine UI**      | Production-ready component library; `DatePickerInput`, `Select`, `Modal`, `Notifications` and `modals.openConfirmModal` work out of the box without extra setup |
| **Formik + Yup**    | Formik handles form state and submission lifecycle; Yup schemas are declarative, reusable and easy to extend                                                    |
| **Day.js**          | Tiny date library for formatting; used to send `YYYY-MM-DD` strings to the API instead of ISO timestamps to avoid timezone drift                                |

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm v9+
- Backend running at `http://localhost:5000` (see backend README)

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env
```

```env
VITE_API_URL=http://localhost:5000
```

> All environment variables must be prefixed with `VITE_` to be exposed to the browser by Vite.

### 3. Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Available Scripts

| Script            | Description                                      |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Start dev server with HMR                        |
| `npm run build`   | Type-check and build for production into `dist/` |
| `npm run preview` | Preview the production build locally             |
| `npm run lint`    | Run ESLint across the project                    |
