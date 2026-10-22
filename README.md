# Night Creative site

This folder is a complete static site for GitHub Pages. It uses only local files and browser-native HTML, CSS, and JavaScript.

## Add a portfolio entry

1. Add the image files to `assets/`.
2. Add an object to the `window.NC_PORTFOLIO` list in `portfolio.js`.
3. Set `category` to `cards`, `fashion`, `concept`, or `content` so the card appears under the matching filter.
4. Add each gallery image to the project's `images` list. Include a short, descriptive `alt` for every image.

The portfolio card and image gallery are generated from `portfolio.js`; the layout and price list are in `index.html` and `style.css`.

## Publish with GitHub Pages

Copy the contents of this folder into the root of the `NightCreative-` repository. In GitHub, open **Settings → Pages** and choose **Deploy from a branch**, then select the `main` branch and `/(root)` folder. The site uses relative paths, so it works at the repository's `/NightCreative-/` Pages address.

The files here are prepared locally. Publishing requires uploading them to GitHub and selecting the Pages source.
