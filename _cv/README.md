# CV sources

HTML and CSS sources of the two resume PDFs published in `images/cv/`:

| Source | PDF | Language |
|---|---|---|
| `cv-fr.html` | `images/cv/cv-stasboyeldieu.pdf` | French |
| `cv-en.html` | `images/cv/resume-stasboyeldieu.pdf` | English |

The folder starts with an underscore, so GitHub Pages (Jekyll) does not publish it.

## Rebuild the PDFs

Needs Google Chrome and a network connection (fonts come from Google Fonts). Run from this folder:

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless=new --no-pdf-header-footer --virtual-time-budget=12000 \
  --print-to-pdf=../images/cv/cv-stasboyeldieu.pdf "file://$PWD/cv-fr.html"
"$CHROME" --headless=new --no-pdf-header-footer --virtual-time-budget=12000 \
  --print-to-pdf=../images/cv/resume-stasboyeldieu.pdf "file://$PWD/cv-en.html"
```

Each CV must stay on one A4 page: check with `pdfinfo <file> | grep Pages`.
