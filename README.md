# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS

## Adding a prospect preview
1. Open `src/data/businesses.ts` and add a `BusinessConfig` entry with a unique `slug` (spread an existing config to start).
2. Add it to the `businesses` array.
3. Visit `/preview/<slug>`. `/` always shows the default sample (Northline). Unknown slugs show a friendly fallback.
Images go in `src/assets/` and are imported at the top of the data file.
