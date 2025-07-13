# Project Conventions (GEMINI.md)

This document outlines the coding conventions and best practices for this Next.js project to ensure consistency, readability, and maintainability across the team.

## 1. Naming Conventions

- **Variables & Functions:** `snake_case` (e.g., `user_name`, `get_user_data`).
- **Constants:** `SCREAMING_SNAKE_CASE` for global constants (e.g., `API_URL`).
- **Types & Interfaces:** `Capital_Snake_Case` (e.g., `User_Type`, `User_Interface`).
- **Components:** `Capital_Snake_Case` (e.g., `User_Profile`, `Header`).
- **Hooks:** `use` prefix with `snake_case` (e.g., `use_user_data`, `use_auth`).
- **Files:** `kebab-case` (e.g., `user-profile.tsx`, `auth.service.ts`).
- **Folders:** `kebab-case` (e.g., `src/components`, `src/lib`).

**Note:** These naming conventions apply to project-specific code. When using external libraries or frameworks (e.g., `shadcn/ui`), it is acceptable to use their established naming conventions for components, files, and other assets.

## 2. Code Style

- **Indentation:** 4 spaces.
- **Semicolons:** Always use semicolons at the end of statements.
- **Quotes:** Prefer double quotes (`"`) for strings, as is common in JSX.
- **Braces:** K&R style (opening brace on the same line as the statement).
- **Line Length:** Aim for a maximum of 100-120 characters per line for readability.
- **Imports:** Group imports, with external modules first, then internal modules, separated by a blank line. Use `@/` alias for internal modules.

  ```typescript
  import { NextPage } from 'next';
  import { useState, useEffect } from 'react';

  import { UserProfile } from '@/components/user-profile';
  import { api } from '@/lib/api';
  ```

## 3. Programming Paradigm

- **TypeScript First:** Leverage TypeScript's features (interfaces, types, enums) for strong typing and better code predictability.
- **Functional Programming First:** The entire codebase should adhere to functional programming principles.
  - **Purity & Components:** React components should be pure functions of their props and state. For a given set of props and state, a component should always render the same output.
  - **Immutability:** State and props are to be treated as immutable. Never mutate state or props directly. Use state update functions and object/array spreading (`{...obj}`, `[...arr]`) to create new state objects.
  - **Composition:** Build complex UI by composing smaller, reusable components.
  - **Side Effects:** Isolate side effects (like data fetching, subscriptions, or manual DOM manipulations) in `useEffect` hooks.
- **Function Declarations:** Prefer using arrow functions (`=>`) for components and functions for their conciseness and lexical `this` binding.

  ```typescript
  const My_Component: React.FC<Props> = ({ name }) => {
    return <div>Hello, {name}</div>;
  };
  ```

- **Asynchronous Operations:** Use `async/await` for handling promises, especially for data fetching in Server Components or API routes.

## 4. Error Handling

- **Error Boundaries:** For client-side components, use React Error Boundaries to catch rendering errors in a component tree and display a fallback UI.
- **Try-Catch:** In Server Components, API routes, and other server-side code, use `try-catch` blocks for asynchronous operations that might throw errors.

## 5. Module Aliases

- Use the `@/` alias for imports from the root directory to avoid long relative paths (e.g., `import { Button } from '@/components/ui/button';`).

## 6. Environment Variables

- Manage sensitive information and configuration using environment variables.
- For client-side access, prefix variables with `NEXT_PUBLIC_`.
- Access them via `process.env.VARIABLE_NAME`.
- Ensure a `.env.local.example` file is provided (without sensitive values) for team members.

## 7. Data Fetching

- **Server Components:** Prefer fetching data in Server Components to keep client-side JavaScript bundles small.
- **API Routes:** For client-side data fetching or mutations, create API routes in the `app/api` directory.
- **Centralized Logic:** Keep data fetching logic organized, for example, in a `lib` or `services` directory.

---

*This document is a living guide and may be updated as the project evolves.*
