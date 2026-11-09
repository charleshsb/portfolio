# Portfolio

Personal site of Charles Henry Stas Boyeldieu, backend developer (Ruby on Rails): [www.stasboyeldieu.com](https://www.stasboyeldieu.com).

Plain HTML, CSS and JS, no build step and no tracking. Served by GitHub Pages from `master`.

- `index.html`, `css/style.css`, `js/script.js`: the single page.
- `images/cv/`: the two resume PDFs, `cv-stasboyeldieu.pdf` (French) and `resume-stasboyeldieu.pdf` (English). The resume button opens the one matching the browser language. The sources live in the second-brain repo, which publishes the PDFs here.
- After a CSS or JS change, bump the `?v=N` query in `index.html`, otherwise the browser cache (10 minutes) can serve a stale file.

Preview locally: `python3 -m http.server 8000`.
