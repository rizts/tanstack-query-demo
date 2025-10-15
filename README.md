# React TanStack Query & Form Validation - Setup Guide

## Prerequisites
- Node.js (v18 or higher)
- npm atau yarn
- tailwind (v4)

## 1. Setup Project

```bash
# Create Vite + React project
npm create vite@latest tanstack-query-demo -- --template react

cd tanstack-query-demo

# Installl dependencies
npm install @tanstack/react-query react-hook-form zod @hookform/resolvers
npm install -D typescript @types/react @types/react-dom
npm install -D tailwindcss postcss autoprefixer
npm install -D @tailwindcss/postcss
```

## 2. Configure Typescript

Generate `tsconfig.json`:
```bash
npx tsc --init
```

Update `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    /* Path alias */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

Create `tsconfig.node.json`:
```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}
```

## 3. Configure Tailwind CSS

Create `postcss.config.js`:
```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

Edit `src/index.css`:
```css
@import "tailwindcss";
```

## 4. Installl shadcn/ui

Init `shadcn`:
```bash
npx shadcn@latest init
```

Add component `Input`:
```bash
npx shadcn@latest add form input
```

Add component `Button`:
```bash
npx shadcn@latest add button
```

Add component `Card`:
```bash
npx shadcn@latest add card
```

Add component `Tabs`:
```bash
npx shadcn@latest add tabs
```

## 5. Installl TanStack Query

Install `TanStack Query`:
```bash
npm install @tanstack/react-query
```

## 6. React Hook Form and Zod validation

Installation:
```bash
npm install react-hook-form zod @hookform/resolvers
```

## 7. Unit Testing

Install Vitest and dependencies
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

Install Mock Service Worker
```bash
npm install -D msw@latest
```

Running test:
```bash
npm run test
```

## 8. Project Structure
```
src/
├── components.json
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── public
│	 └── vite.svg
├── README.md
├── src
│	 ├── App.tsx
│    ├── assets
│    │    └── react.svg
│    ├── components
│    │    ├── form
│    │    │    ├── RegistrationForm.test.tsx
│    │    │    └── RegistrationForm.tsx
│    │    ├── scroll
│    │    │    ├── InfinitePostList.test.tsx
│    │    │    └── InfinitePostList.tsx
│    │    └── ui
│    │        ├── button.tsx
│    │        ├── card.tsx
│    │        ├── form.tsx
│    │        ├── input.tsx
│    │        ├── label.tsx
│    │        └── tabs.tsx
│    ├── index.css
│    ├── lib
│    │    └── utils.ts
│    ├── main.tsx
│    └── test
│        ├── mocks
│        │    ├── handlers.ts
│        │    └── server.ts
│        └── setup.ts
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## 9. Deploy ke Vercel

### Open Vercel Dashboard:

* Open [Vercel](https://vercel.com/)
* Login or Signup
* Click "Add New" -> Project
* Import Git Repository
* Select Repository, and then import
* Deploy it


## Features
✅ Infinite scroll dengan TanStack Query
✅ Set proper Query keys
✅ Automatic caching
✅ Prefetching next page
✅ Using React Hook Form and Form validation with Zod
✅ Phone number validation
✅ Auto-disable submit button
✅ Loading & error states

## API used:
- JSONPlaceholder API: https://jsonplaceholder.typicode.com/posts
- Pagination: `?_page=X&_limit=10`