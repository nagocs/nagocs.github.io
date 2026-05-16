# Weboldal — Projekt README

## Projekt Megnevezése & Rövid Leírás

Ez a repository egy személyes/portfólió statikus weboldalának forráskódja, amely Astro alapú statikus webframeworkre épül. A projekt technológiai stackje: Astro, Tailwind CSS, TypeScript, és többnyelvűség (i18n) támogatás. A cél egy könnyen karbantartható, gyors és SEO-barát weboldal biztosítása kutatói/professzionális önéletrajz, publikációs lista és blog megjelenítéséhez.

## Főbb Funkciók

- Reszponzív felület: Header és Sidebar komponensek mobil- és desktopra optimalizálva.
- Többnyelvű (i18n) tartalomkezelés: lokalizált szövegek és nyelvválasztó, fordítási szótárak használata.
- CV oldal: karikás (radial/circular) skill-értékelő komponens a készségek vizuális megjelenítéséhez.
- Publikációs lista: BibTeX feldolgozásból generált publikációs lista (BibTeX-to-JSON pipeline / collection).
- Blog motor: Markdown/MDX alapú bejegyzések, KaTeX matematikai renderelés és Mermaid diagram-támogatás beépítve.
- AI chatbot előkészítés: struktúrált előkészítés az AI chatbot integrációhoz (konfigurációs helyek, API-horgok), a tényleges üzembe helyezés opcióként elérhető.

## Projekt Struktúra

Fontosabb mappák és fájlok (sémás tree):

```
/
├── public/ # statikus erőforrások (képek, favicon)
├── src/
│ ├── content/ # tartalomgyűjtemények: blog, publications, cv
│ ├── i18n/ # lokalizációs szótárak és konfiguráció
│ ├── layouts/ # oldal- és post-layoutok
│ ├── components/ # újrahasználható UI komponensek (Header, Sidebar, SkillCircle, PublicationList)
│ └── pages/ # útvonalak: index.astro, cv.astro, publications.astro, blog/[slug].astro
├── package.json
├── astro.config.\* # Astro konfiguráció (integrációk, build beállítások)
└── .github/workflows/ # GitHub Actions workflow a GitHub Pages deploy-hoz
```

## Futtatás

```
npm run dev
npx wrangler dev --remote
```
