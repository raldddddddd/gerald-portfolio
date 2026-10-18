# Gerald Santiago — Portfolio

A small, editable portfolio starter built with Next.js and TypeScript. It uses the Next.js App Router and is ready to deploy to Vercel.

## Local setup

1. Install Node.js (version 20 or newer) and npm.
2. In this folder, run `npm install`.
3. Start the development server with `npm run dev`.
4. Open [http://localhost:3000](http://localhost:3000).

To make a production build, run `npm run build`, then `npm run start`.

## Edit your content

Most portfolio content lives in [`data/portfolio.ts`](./data/portfolio.ts). Update the name, introduction, education, skills, projects, internship, contact links, dates, technology tags, and image paths there. The layout components read that data, so routine content edits do not require editing the page layouts.

Project entries have `githubUrl`, `liveUrl`, and `image` fields. Add a URL to show the corresponding project link. Put image files under `public/images/` and set `image` to a path such as `/images/project-name.png` to show it on the reusable project card.

Public contact information is stored in `portfolio.contact` and shown in the Contact section and site footer.

Project and internship summaries currently use Lorem Ipsum placeholders. Replace them with your own descriptions when ready.

## Portfolio sections

- `#home` — Personal introduction
- `#projects` — Projects and experience
- `#about` — Education, coursework, skills, and certifications
- `#contact` — Public contact links

The portfolio is a single scrolling page at `/`; the navigation links scroll to these sections.

The main `/` hero uses an interactive, centered project console. An experimental cat-themed hero preview is available at `/cat-theme`.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, import that repository and keep the detected Next.js settings.
3. Deploy. Vercel will build the site and provide a deployment URL.
4. Later GitHub pushes will trigger new deployments.

No environment variables or backend services are required for this starter.
