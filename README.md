# Shabka Group Website

Website for Shabka Ideal Private Limited, built with Next.js 14, React, TypeScript, GSAP, and MongoDB.

## Requirements

- Node.js **18.17 or later** is the minimum for this Next.js 14 project. Use a currently supported Node.js LTS release for new installations. [Next.js 14 system requirements](https://nextjs.org/docs/14/getting-started/installation)
- npm, installed with Node.js.
- MongoDB for the contact enquiry form and admin dashboard. MongoDB Atlas or a reachable self-hosted MongoDB instance will work.
- An internet connection in visitors’ browsers to load the Google Fonts used by the site. The site’s image assets are stored locally in `public/`.

`npm install` installs the packages listed in `package.json`: Next.js 14.2.15, React 18.3.1, React DOM 18.3.1, GSAP, MongoDB’s Node.js driver, TypeScript, and the Node/React type definitions. There is currently no package lockfile, so use `npm install` (not `npm ci`) to install dependencies.

## Install and run locally

Clone the repository and install the project dependencies:

```bash
git clone https://github.com/rohitkumar91131/sbhaka-group-real-state-.git
cd sbhaka-group-real-state-
npm install
```

Create a local environment file from the example:

```bash
cp .env.example .env.local
```

On Windows PowerShell, use `Copy-Item .env.example .env.local` instead. Set the values in `.env.local` (see [Environment variables](#environment-variables) below), then start Next.js:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `MONGODB_URI` | Yes, for contact submissions and admin | MongoDB connection string. Create a database user and allow the app server to connect to the database. Keep this value private. |
| `MONGODB_DB` | No | Database name. Defaults to `shabka_group`. |
| `ADMIN_PASSWORD` | Yes, for admin sign-in | Password for `/admin`. Set a strong, unique password and keep it private. |

The `.env.example` file contains placeholders only. Never put real credentials in `.env.example`, source files, or Git. `.env.local` is excluded by `.gitignore`.

The public website can render without MongoDB credentials, but contact submissions and admin sign-in will not work until `MONGODB_URI` is set. Admin sign-in also requires `ADMIN_PASSWORD`.

## Available commands

```bash
npm run dev     # Start the local development server
npm run build   # Create a production build
npm run start   # Serve the production build (run build first)
npm run lint    # Run the configured Next.js lint command
```

The `lint` script is present in `package.json`, but ESLint and `eslint-config-next` are not currently listed as dependencies. If linting is needed, install and configure those packages first.

## Contact form and admin dashboard

The contact form stores enquiries in MongoDB; it does not send email. Enquiries appear in the password-protected admin dashboard at `/admin`.

- Contact records are written to the `contact_enquiries` collection. They include the submitted name, email, optional phone, selected business area, message, and submission time.
- Admin sessions are stored in `admin_sessions`; the app creates the expiry index when an admin session is created.
- The admin APIs require `MONGODB_URI` and `ADMIN_PASSWORD`. In production, serve the site over HTTPS so secure admin cookies work correctly.

## Main pages and API routes

| Route | Purpose |
| --- | --- |
| `/` | Home page and business overview |
| `/about` | Company story and business sections |
| `/divisions/real-estate` | Real Estate division |
| `/divisions/impex` | Impex division |
| `/divisions/agro` | Agro division |
| `/divisions/stones` | Stones division |
| `/privacy-policy` | Privacy Policy |
| `/admin` | Enquiry dashboard |
| `POST /api/contact` | Validate and store a contact enquiry |
| `POST /api/admin/login` | Sign in to the admin dashboard |
| `GET /api/admin/enquiries` | Fetch enquiries for an authenticated admin |
| `POST /api/admin/refresh` | Refresh an admin session |
| `DELETE /api/admin/refresh` | End an admin session |

## Project structure

```text
app/                 Next.js App Router pages, API routes, and global styles
components/          Shared page sections, navigation, galleries, and admin UI
lib/                 MongoDB connection and admin authentication helpers
lib.json             Site copy, navigation, contact details, and division data
public/              Logos, icons, hero art, and business gallery images
```

Most site copy, navigation, footer links, and division summaries are in `lib.json`. Division-specific galleries are defined in `components/*-gallery.tsx`, and their images live under the matching folder in `public/`.

## Production deployment

Deploy to a Node.js host that supports Next.js server rendering and API routes. Configure `MONGODB_URI`, `MONGODB_DB` (optional), and `ADMIN_PASSWORD` in the host’s environment settings, then build and start the app:

```bash
npm install
npm run build
npm run start
```

This application uses server API routes and MongoDB, so it is not a static-only website and cannot be deployed with a static export alone.
