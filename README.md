# Koduru Abhi Ram — Developer Portfolio

A responsive, single-page portfolio for Koduru Abhi Ram. It uses no build step or package installation. The default visual direction is white, with seven alternate palettes available from the animated orb; typography pairs Manrope and DM Mono.

## Preview

Open `index.html` in a browser. For a local server, open a terminal in this folder and run:

```sh
python -m http.server 8000
```

Then visit <http://localhost:8000>.

## Update the portfolio

- Update the About text, project details, education entries, certifications, or activities in `index.html` as your experience changes.
- The LinkedIn URL is in both connection buttons in `index.html`; update it if your profile URL changes.
- Email and phone are intentionally not displayed.
- The portrait is stored as `abhi-ram-portrait.png` beside `index.html`.

## Motion and accessibility

The page adapts Motion Primitives patterns such as staggered entrance groups, in-view reveals, and restrained hover feedback using lightweight CSS and the browser's `IntersectionObserver`. The hero includes a layered, holographic name treatment inspired by your sample; it stays readable and becomes static when reduced motion is requested.

The page also includes an accessible mobile navigation menu, active section indication, a reading progress line, a pointer-responsive hero graphic on mouse devices, and expandable GreenBagIt concept details. The contrasting, animated hero orb is a keyboard-accessible theme switcher for sky blue, violet, emerald, amber, rose, teal, white, and black full-page palettes. Reduced-motion settings keep the content visible and stop decorative animation.

Motion Primitives is a React and Tailwind component collection. If you move this design into a React app later, its [Animated Group](https://motion-primitives.com/docs/animated-group) and [In View](https://motion-primitives.com/docs/in-view) components are good matches for the reveal patterns used here.
