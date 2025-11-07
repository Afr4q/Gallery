# Photography showcase (local)

This is a minimal, responsive HTML gallery to showcase your photographs. It uses CSS Grid and `object-fit: cover` so photos of different sizes fill each panel nicely.

Files added
- `index.html` — main markup with three gallery panels.
- `styles.css` — responsive layout and overlay styles.
- `script.js` — small interactions: click to open image, and scroll-to-top button.

Add your photos
1. Place your photos inside the `src/` folder (create it if missing). Keep original file extensions (jpg, png, webp, etc.).
2. Run the generator to build `images.json` which the site reads to display all images automatically.

Generate the images list (one-time or when you add/remove photos)
If you have Node installed, run:

```powershell
npm install # optional
npm run generate-images
```

This will create/update `images.json` with a list of all image files under `src/`.

How it handles different sizes
- Images use `width:100%`, `height:100%` and `object-fit: cover` so they will fill their panel while preserving aspect ratio. This prevents squashing/stretches and crops the image as needed (centered).
- On small screens the panels stack vertically for easier browsing.

Run locally
1. After generating `images.json`, open `index.html` in your browser (double-click or use "Open File").
2. Click or press Enter on any photo to open the lightbox; use Arrow keys to navigate and Escape to close.

Next improvements (optional)
- Add a lightbox (modal) to view full-resolution photos without leaving the site.
- Add keyboard navigation and captions/metadata for accessibility.
- Dynamically load images from a folder or JSON for larger galleries.
