# UI Kit Template — SCSS + Design Tokens

Template pentru un UI kit / design system bazat pe:

- **Design tokens** procesate cu **Style Dictionary** → CSS custom properties în `:root`
- **SCSS** compilat cu **Sass**
- **Prettier** pentru formatare

## Cerințe

- [Node.js](https://nodejs.org/) **22+** (aliniat cu `style-dictionary@5`)

## Instalare

```bash
npm install
```

## Comenzi

- **`npm run tokens`**: generează `assets/css/base/variables.css` din `assets/tokens/tokens.json`
- **`npm run dev`**: watch SCSS → CSS (`assets/scss/main.scss` → `assets/css/main.css`)
- **`npm run build:css`**: build SCSS → CSS o singură dată
- **`npm run format`**: formatează fișierele cu Prettier

### Workflow recomandat

```bash
# 1) după ce modifici token-urile
npm run tokens

# 2) în timpul dezvoltării stilurilor
npm run dev
```

## Structura proiectului

```
assets/
  tokens/
    tokens.json           ← sursa de design tokens (exemplu)
    config.mjs            ← configurare Style Dictionary
  css/
    base/
      variables.css       ← generat automat din tokens (nu edita manual)
      custom-variables.css← variabile custom (scrise manual)
    main.css              ← generat automat din SCSS (nu edita manual)
  scss/
    main.scss             ← entrypoint SCSS
    base/                 ← reset/global/typography/utilities/layout
    design-system/        ← stiluri “design system”
    components/           ← componente UI
    static-presentation/  ← stiluri pentru paginile demo (index + static)
static/
  design-system/          ← pagini HTML demo (design system)
  components/             ← pagini HTML demo (componente)
index.html                ← hub demo local
```

## Editarea stilurilor

- Editează fișierele din `assets/scss/` — **nu** edita direct `assets/css/main.css`
- Partialele SCSS folosesc `@use` și sunt importate în `assets/scss/main.scss`

## Editarea token-urilor

- Modifică `assets/tokens/tokens.json`
- Rulează `npm run tokens` ca să regenerezi `assets/css/base/variables.css`
