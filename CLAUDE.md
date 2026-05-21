# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio and essay site for Sheraz Ahmed. It's a **React 18 single-page application with no build step** — JSX is transpiled at runtime using Babel standalone, and React/ReactDOM are loaded from CDN. This means any `.jsx` file change is immediately live when you refresh the browser.

## Development Workflow

**No npm or build step required.** To develop:

1. Open `index.html` in a browser (Safari, Chrome, Firefox all work)
2. Edit any `.jsx` file and refresh the page to see changes
3. Open DevTools console to catch any JSX syntax errors or runtime errors

For local development, you can use a simple HTTP server:
```bash
python3 -m http.server 8000  # Run from this directory, visit http://localhost:8000
```

## Architecture

### Entry Point & App Shell

- **`index.html`**: Loads React/ReactDOM from CDN, Babel standalone, and all JSX modules in order. Theme sync happens synchronously before the page paints (no flash of wrong theme).
- **`app.jsx`**: Main app component that orchestrates:
  - **Tweaks state**: Manages theme (dark/light), accent color, density (compact/regular/airy), font pairing, and hero layout variant
  - **Hash routing**: Parses `#essay/N` to open essay reader; anything else shows home page
  - **Scroll reveal animations**: Attaches IntersectionObserver to elements with `.reveal` class
  - **CSS custom properties**: Applies tweaks to root element (`--accent`, `--font-sans`, etc.)
  - **localStorage persistence**: Saves theme preference across sessions

### Component Organization

**Section components** (in `sections/`): Each section is an independent component mounted in App.

- `nav.jsx`: Top navigation bar with theme toggle
- `hero.jsx`: Hero section with optional layout variants (default, split, centered)
- `now.jsx`: "Now" strip (what Sheraz is currently working on)
- `projects.jsx`: Project grid pulled from `PROJECTS` in data.jsx
- `essays.jsx`: Essay list that opens essay reader on click
- `hire.jsx`: Call-to-action section
- `education.jsx`: Education/credentials
- `github.jsx`: GitHub stats or links
- `newsletter.jsx`: Newsletter signup
- `about.jsx`: About section
- `essay-reader.jsx`: Full-screen essay viewer (opened via hash route)

### State & Data

- **`data.jsx`**: Static data exports (`PROJECTS`, `ESSAYS`, `EDUCATION`, etc.) used by sections
- **`tweaks-panel.jsx`**: Reusable tweaks UI shell and form controls (`useTweaks` hook, `TweakToggle`, `TweakColor`, `TweakRadio`, `TweakSelect`, `TweakSlider`)
- **`icons.jsx`**: Icon components (SVG or symbol definitions)

### Styling

- **`styles.css`**: Single stylesheet with CSS variables for theming. The app manipulates `--accent`, `--accent-fg`, `--accent-soft`, `--font-sans`, `--font-mono`, `--font-serif`, `--density` at runtime to change layout and colors globally. Theme-aware classes target `[data-theme="light"]` vs `[data-theme="dark"]` and `[data-density="compact"]` etc.

## Key Patterns

### Tweaks System

The tweaks system is a lightweight state management pattern for runtime UI customization:

1. **Define defaults** in app.jsx as `TWEAK_DEFAULTS` (wrapped in `/*EDITMODE-BEGIN*/.../*EDITMODE-END*/` markers for integration with design tools)
2. **Use the hook**: `const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);`
3. **Mutate state**: `setTweak('dark', !t.dark)` or `setTweak('accent', newColor)`
4. **Apply globally**: Use `t.fieldName` to read values; app.jsx applies them to CSS custom properties and `data-*` attributes

All tweak values persist to localStorage automatically via `useTweaks`.

### Hash Routing

Hash-based routing for essay reader:
- `#essay/0` opens essay 0 (from `ESSAYS` array in data.jsx)
- `#essay/5` opens essay 5, etc.
- Invalid indices or no hash shows home page

The `useRoute()` hook listens for `hashchange` events and parses the fragment. The `EssayReader` component overlays the page when a route is active; click "close" strips the hash without reloading.

### Scroll Reveal

Elements with `class="reveal"` fade in as they enter the viewport via `IntersectionObserver`. The app reruns the observer when the route changes (because section remounting resets classes).

## CSS Architecture

- **CSS variables** at root control everything: `--accent`, `--font-sans`, `--density`, etc.
- **Color utilities**: `accentFg()` and `hexToRgba()` functions compute contrasting text color and transparent accent values
- **Responsive** via `[data-density]` attribute (changes padding, gaps, and layout scales)
- **Dark/light mode** via `[data-theme="dark"]` and `[data-theme="light"]` selectors

## Common Tasks

### Adding a New Section

1. Create `sections/your-section.jsx` with a component export
2. Add `<script type="text/babel" src="sections/your-section.jsx"></script>` to index.html in load order
3. Import and mount the component in `app.jsx` (likely inside `<main>`)
4. Wrap in `<div className="reveal">` if you want scroll animations

### Adding/Editing Projects or Essays

- Edit `data.jsx`: `PROJECTS` array or `ESSAYS` array
- Changes are live on refresh; no rebuild needed
- Essays are Markdown-like objects with title, date, and body text (parsed by `EssayReader`)

### Changing Tweaks Options

- Edit `TWEAK_DEFAULTS` in `app.jsx` to add new fields
- Add UI controls in the `<TweaksPanel>` block
- Apply them to the page via `React.useEffect` that reads `t.fieldName` and updates CSS/DOM

### Fixing Layout Across Densities

- Inspect `data-density` attribute on root (compact/regular/airy)
- Use CSS to scale padding/gaps: `[data-density="compact"] { gap: 12px; }` etc.
- Test all three densities in the Tweaks panel

## Notes for Future Work

- **No TypeScript**: Pure JavaScript/JSX. Use JSDoc comments if type hints are needed.
- **React 18 UMD**: Functions, hooks, context work normally. Concurrent features aren't used (no Suspense, etc.).
- **Module order matters**: Ensure dependencies are loaded before dependents in index.html (e.g., `data.jsx` before `projects.jsx`).
- **LocalStorage**: Automatically cleared if user clears browser cache; no server state.
- **Performance**: All assets are static and cacheable; no API calls unless explicitly added (newsletter signup, GitHub stats, etc.).
