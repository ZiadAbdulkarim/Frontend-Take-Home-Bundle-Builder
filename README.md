# Security System Builder

A React/Vite prototype for a multi-step security system bundle builder with a live review panel, responsive layout, variant-aware quantity handling, and local persistence.

## What’s included

- Four-step accordion builder
- Product cards with pricing, badges, variants, and quantity steppers
- Live review panel that updates as selections change
- Variant-specific quantities for color options
- Local persistence with `localStorage` so a saved configuration restores on reload

## Stack

- React 18
- Vite
- CSS Modules

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Then open the local Vite URL shown in the terminal, typically http://localhost:5173.

### 3. Build for production

```bash
npm run build
```

### 4. Preview the production build

```bash
npm run preview
```

## Notes

- The app uses a local data file under [src/data/bundleData.js](src/data/bundleData.js) for the seed content and initial state.
- The current persistence flow saves the builder state locally in the browser so a shopper can return later and continue editing.
- The UI is responsive and designed to stay usable down to smaller screen sizes.
