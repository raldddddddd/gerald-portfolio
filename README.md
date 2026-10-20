# Gerald Santiago — Portfolio

A personal portfolio built with Next.js, React, and TypeScript. It presents Gerald's background, skills, experience, and software, AI, data, and product design projects.

## Local development

1. Install Node.js 20 or newer and npm.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open [http://localhost:3000](http://localhost:3000).

Available checks:

- `npm run lint` — run ESLint with the Next.js Core Web Vitals and TypeScript rules.
- `npx tsc --noEmit` — run the TypeScript compiler without emitting files.
- `npm run build` — create a production build.
- `npm run start` — serve the production build.

## Content and assets

Most portfolio content lives in [`data/portfolio.ts`](./data/portfolio.ts), including profile details, skills, projects, experience, organizations, and contact links. Project screenshots, organization logos, and the resume live in [`public`](./public).

Project entries support a primary image or an image carousel, optional GitHub, live-site, and Figma links, technology tags, and featured placement. The same project data powers the homepage project console and the reusable project cards.

## Routes and sections

- `/` — portfolio homepage with `#home`, `#about`, `#skills`, `#projects`, `#experience`, and `#contact` sections.
- `/projects` — complete project grid.

The site supports light and dark themes, responsive layouts, reduced-motion preferences, and keyboard interaction. The Contact section includes an interactive sleeping cat that reacts to the email and footer contact links.

## Deployment

The project is ready for a standard Next.js deployment. No environment variables or backend services are required.
