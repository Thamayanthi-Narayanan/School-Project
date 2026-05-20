# School CRM

School Management System — React SaaS scaffold.

## Stack

- React (functional components + hooks)
- React Router
- Axios
- Vite
- Plain CSS only

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

## Project structure

See `.cursor/rules/school-crm-project.mdc` for architecture and conventions.

- `src/apis/` — API modules and Axios config
- `src/components/` — UI components (`js/`, `css/`, `hooks/` per feature)
- `src/pages/` — page-level components (add when building modules)
- `src/routes/` — router and route definitions
- `src/layouts/` — shared layouts
- `src/styles/` — global styles

## Scripts

| Command        | Description      |
|----------------|------------------|
| `npm run dev`  | Development server |
| `npm run build`| Production build |
| `npm run lint` | ESLint           |
