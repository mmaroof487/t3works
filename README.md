# T3Works

T3Works is a production-ready frontend foundation built with modern tooling for speed, scalability, and developer experience.

## Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Code Quality**: ESLint, Prettier

## Project Structure

```
t3works/
├── public/           # Static assets
├── src/
│   ├── assets/       # Source assets (images, fonts)
│   ├── components/   # Reusable UI components
│   ├── hooks/        # Custom React hooks
│   ├── layouts/      # Page layouts
│   ├── lib/          # Utility functions and shared logic
│   ├── pages/        # Route components (Pages)
│   ├── types/        # TypeScript definitions
│   ├── App.tsx       # Root component and router config
│   ├── index.css     # Global styles and Tailwind imports
│   └── main.tsx      # Application entry point
├── .github/          # GitHub Actions workflows
```

## Local Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd t3works
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev`: Starts the local development server.
- `npm run build`: Compiles TypeScript and builds the project for production.
- `npm run preview`: Bootstraps a local server to preview the production build.
- `npm run lint`: Runs ESLint to catch code quality issues.
- `npm run format`: Formats code using Prettier.
- `npm run format:check`: Verifies that code is formatted according to Prettier rules.

## CI/CD

This project uses **GitHub Actions** for Continuous Integration.
The CI workflow automatically runs on `main` branch pushes and pull requests to ensure:

- Dependencies install correctly
- Code passes ESLint checks
- Code is formatted with Prettier
- TypeScript compilation succeeds
- The production build succeeds

# t3works
