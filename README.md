# Modelia — Mini AI Studio (Mock)

A small React + TypeScript app implementing the Modelia front-end assignment (mocked backend).

## Features
- Upload & preview image (client-side downscale to <=1920px)
- Prompt + Style selection with live summary
- Mocked generation API with simulated latency & 20% error chance
- Automatic retry with exponential backoff (up to 3 attempts)
- Abort an in-flight generation
- History of last 5 generations persisted to `localStorage`
- Accessibility and keyboard navigation considered
- TypeScript strict mode, TailwindCSS, ESLint + Prettier

## Setup
1. `pnpm install`
2. `pnpm run dev`

## Scripts
- `pnpm run dev` — start dev server
- `pnpm run build` — build
- `pnpm run preview` — preview build & see the PWA installable APP (#PR not merged - OPEN)
- `pnpm run lint` — eslint

## Notes
- This app uses a mocked API to simulate backend behavior. See `src/api/imageGenApi.ts`.
- The project is intentionally small and demonstrates engineering decisions, PWA feature and accessibility.

## TODOs / future improvements
- Add Playwright e2e tests
- Add robust image processing workers / web workers
- Server-side implementation and real AI integration
