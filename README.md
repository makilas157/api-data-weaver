# API Data Weaver

https://github.com/makilas157/tevexxo-frontend.git
Please connect every page of this frontend to my existing backend API instead of using any mock/local/dummy data.

Backend base URL: https://YOUR_API_BASE_URL_HERE

(store this in an environment variable, e.g. VITE_API_BASE_URL, and use it everywhere instead of hardcoding)

Requirements:

1. Go through every page and every form/component that currently uses static, hardcoded, or placeholder data (courses, contact form, enquiry form, login/signup, testimonials, pricing, any list or detail view, etc.).

2. Replace each one with a real API call (fetch or axios) to the matching endpoint on my backend, e.g.:

   - GET /api/courses -> courses listing page

   - POST /api/contact -> contact/enquiry form

   - POST /api/auth/login and /api/auth/signup -> login/signup forms

   - GET /api/courses/:id -> course detail page

   (adjust endpoint names/paths to match what actually makes sense for each page — ask me if unsure, don't guess silently for critical ones)

3. For every API call, add:

   - a loading state (spinner or skeleton, matching existing design)

   - proper error handling (show a friendly error message, don't break the UI)

   - success feedback for form submissions (e.g. toast/message)

4. Keep all existing UI, layout, styling, and animations exactly as they are — this is only a data-wiring change, not a redesign.

5. Use TypeScript types/interfaces for the API request and response shapes.

6. Do not remove any existing functionality; only replace the data source.

After making changes, list out every page/component you updated and which endpoint each one now calls, so I can verify against my backend.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f7bed4e8-2386-4f2a-825a-1b2dcd19c433).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
