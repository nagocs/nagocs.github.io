# Academix — személyes kutatói weboldal

Agócs Norbert magyar–angol portfólióoldala: bemutatkozás, önéletrajz, publikációk, szakmai blog és oktatási katalógus. Az Astro build közben statikus HTML-oldalakat készít, amelyeket a repository GitHub Actions-folyamata GitHub Pagesre telepít.

A konfigurált webcím: [nagocs.github.io](https://nagocs.github.io). Az oldalhoz nincs szükség saját API-ra, adatbázisra vagy API-kulcsra. A korábbi chatbot és a hozzá tartozó külön Cloudflare Worker eltávolításra került.

## Technológiák

- Astro 6, TypeScript és Astro-komponensek.
- Tailwind CSS 4 a Vite-integráción keresztül.
- Astro Content Layer és MDX a tartalmakhoz.
- `remark-math` és `rehype-katex` a matematikai képletekhez; `astro-mermaid` a diagramokhoz.
- `bibtex-parse-js` a publikációk build közbeni feldolgozásához.
- npm és `package-lock.json` a reprodukálható csomagtelepítéshez.

A pontos csomagverziókat a lockfájl rögzíti. A projekt kizárólag statikus GitHub Pages-telepítésre van beállítva; Cloudflare-eszközöket nem használ.

## Helyi indítás

Előfeltétel: Node.js legalább **22.12.0**, valamint npm. A CI Node.js **24**-et használ; a környezetek egyezéséhez ezt a főverziót érdemes használni.

A projekt gyökérkönyvtárában:

```sh
npm ci
npm run dev
```

A fejlesztői szerver alapértelmezett címe [http://localhost:4321](http://localhost:4321). A gyökéroldal a magyar kezdőlapra irányít át; az angol változat az `/en/` útvonalon érhető el.

Statikus build és annak helyi előnézete:

```sh
npm run build
npm run preview
```

A build kimenete a `dist/` mappa. A `npm run preview` az elkészült buildet szolgálja ki; forrásmódosítás után előbb új build szükséges.

## Útvonalak

| Útvonal                    | Tartalom                                                          |
| -------------------------- | ----------------------------------------------------------------- |
| `/`                        | Kliensoldali átirányítás az alapértelmezett nyelvre (`hu`)        |
| `/hu/`, `/en/`             | Bemutatkozás és a nyelv három legfrissebb blogbejegyzése          |
| `/{lang}/cv`               | Önéletrajz, kutatás, oktatás, közéleti tevékenységek és készségek |
| `/{lang}/publications`     | A közös BibTeX-fájlból előállított publikációs lista              |
| `/{lang}/blog`             | Az adott nyelv bejegyzései, dátum szerint csökkenő sorrendben     |
| `/{lang}/blog/{slug}`      | Egy blogbejegyzés                                                 |
| `/{lang}/teaching/`        | Nyilvános tantárgykatalógus                                       |
| `/{lang}/teaching/{slug}/` | Tantárgy alkalmai és tananyagai                                   |

A `lang` értéke `hu` vagy `en`. A nyelvi útvonalakat a lapok `getStaticPaths()` függvényei generálják. A fejléc HU/EN nyelvváltója a megfelelő nyelvi oldalra vezet. Fordítás nélküli bejegyzésnél a másik nyelv bloglistáját nyitja meg, és ezt a hivatkozás hozzáférhető neve is jelzi.

## Projektfelépítés

```text
.github/workflows/deploy.yml    GitHub Pages build és telepítés
public/                        Profilkép, faviconok és statikus fájlok
src/
  components/                  Header, Sidebar, PostCard, CVSection, SkillRating
  content/
    about/                     hu.md és en.md bemutatkozás
    blog/                      Markdown/MDX blogbejegyzések
    research/                  Jelenleg nem bekötött mintatartalom
    teaching/                  Tantárgyanként egy JSON-fájl; a minta draft
  content.config.ts            A blog és about gyűjtemény sémái
  data/publications.bib        A publikációk adatforrása
  i18n/
    ui.ts                      Nyelvek, közös feliratok és kapcsolati hivatkozások
    utils.ts                   Nyelvfelismerés és fordítási segédfüggvények
    routes.ts                  Kanonikus útvonalak és fordítási kapcsolatok
    cvData.ts                  Magyar és angol CV-adatok, címkék és típusok
  layouts/                     Közös oldalkeret és blogelrendezés
  pages/                       Statikusan generált útvonalak
  styles/global.css            Tailwind belépési pont
astro.config.mjs               Statikus kimenet, MDX, matematika, Mermaid, Tailwind
package.json                   Függőségek és npm-parancsok
package-lock.json              Rögzített függőségi fa
tests/routes.test.mjs          Nyelvi útvonalak tesztjei a Node.js tesztfuttatójával
scripts/check-build.mjs        A generált oldalak és metaadatok ellenőrzése
AGENTS.proposed.md             Javasolt projektutasítások; még nem aktív AGENTS.md
```

## Tartalom szerkesztése

### Bemutatkozás, CV és feliratok

- A bemutatkozást a `src/content/about/hu.md` és `en.md` fájlokban szerkeszd. Az opcionális `title` metaadat mellett a törzsszöveg adja a megjelenített tartalmat.
- A CV-adatok és szekciócímkék a `src/i18n/cvData.ts` fájlban vannak. Az összetartozó magyar és angol adatokat együtt tartsd naprakészen; a készségszintek tartománya **1–6**.
- A közös navigációs és oldalsávfeliratok, valamint a kapcsolati hivatkozások a `src/i18n/ui.ts` fájlban találhatók. Néhány oldalspecifikus felirat még közvetlenül a komponensekben szerepel.
- A profilképet a `public/avatar.png`, a faviconokat a `public/` megfelelő fájljai adják.

### Blogbejegyzés hozzáadása

Hozz létre egy `.md` vagy `.mdx` fájlt a `src/content/blog/` könyvtárban. Például `pelda-bejegyzes.md`:

```md
---
title: 'Példabejegyzés'
description: 'Rövid összefoglaló a listázó oldalhoz.'
pubDate: 2026-10-29
lang: 'hu'
category: 'Kutatás'
tags: ['Szimuláció']
---

A bejegyzés szövege.
```

A `title`, `description`, `pubDate` és `lang` kötelező. A `category` alapértéke `blog-post`, a `tags` alapértéke üres lista. A sémát a `src/content.config.ts` határozza meg.

Az URL a nyelvből és a fájlnév kiterjesztés nélküli utolsó útvonaleleméből épül fel: a fenti példa `/hu/blog/pelda-bejegyzes`. Egy nyelven belül a fájlnevek almappák használatakor is legyenek egyediek, mert az útvonal-generálás elhagyja a szülőmappákat. A fordítás külön bejegyzés, saját `lang` mezővel. A fordításpár mindkét tagjának ugyanazt az opcionális `translationKey` értéket add meg (például `translationKey: constitutive-models`). Ez különböző fájlneveknél is összekapcsolja a nyelvváltót és a `hreflang` metaadatokat. Egy kulcshoz nyelvenként egy bejegyzés tartozhat; a többértelmű párosítás megállítja a buildet. Kulcs nélkül nem feltételezünk fordítást, még egyező fájlnév esetén sem. Automatikus szövegfordítás nincs.

Matematikai képletekhez használható a `$...$` és `$$...$$` jelölés, diagramhoz `mermaid` nyelvű kódblokk. Mindkettőre van példa a `src/content/blog/post-1.md` fájlban. A bejegyzések renderelését a `BlogPostLayout.astro` végzi, amely a KaTeX stíluslapját is betölti.

### Publikáció hozzáadása

A `src/data/publications.bib` fájlt szerkeszd. A publikációs oldal közvetlenül ebből olvas; nincs külön publikációs Content Layer-gyűjtemény. Az `article`, `book` és `inproceedings` típusokhoz külön megjelenítési ág tartozik.

A közös mezők: `author`, `title`, `year`; a megjelenési helyet típustól függően például a `journal`, `publisher` vagy `booktitle` adja. A cím linkjéhez a `doi` elsőbbséget élvez a `url` mezővel szemben. A lista a BibTeX-fájl sorrendjét követi, nem rendez automatikusan év szerint.

A `src/content/research/paper-1.md` mintafájl jelenleg nem adatforrása egyik oldalnak sem. A BibTeX-olvasás hibáját az oldal naplózza, de üres listával folytathatja a buildet, ezért a publikációkat külön is ellenőrizni kell.

## Oktatási anyagok kezelése

### Felépítés és hozzáférés

Az Oktatás / Teaching katalógus nyilvános, a védett fájlokat az egyetemi SharePoint tárolja. A weboldal nem léptet be és nem oszt jogosultságot: a SharePoint ellenőrzi az egyetemi Microsoft-fiókot. A korábban mérlegelt közös tantárgyjelszó, saját munkamenet és Cloudflare-tárhely nem része a megoldásnak. Nincs szükség Microsoft API-kulcsra, Graph-integrációra vagy új függőségre.

A szerkezet: **tantárgy → témakör/alkalom → tananyag**; nincs félév szerinti bontás. A felület magyar és angol, a tananyag nyelve ettől függetlenül magyar, német vagy angol, akár több is egyszerre. Angol cím vagy leírás hiányában a magyar szöveg jelenik meg megfelelő `lang` jelöléssel. Az alkalmak és tananyagkártyák egy oldalon, közvetlenül egymás alatt jelennek meg. A tantárgyi anyaglista JavaScript nélkül is teljes egészében olvasható.

Minden tananyaglink `target="_blank"` és `rel="noopener noreferrer"` attribútumot kap. A katalógus nyitva marad; az új lapot, előnézetet és letöltést a böngésző és a SharePoint kezeli. Kereszt-domaines SharePoint-linkből a weboldal nem tud garantált közvetlen letöltést kikényszeríteni.

### Új tantárgy és tananyag

A kinézet kipróbálásához a `demo-tantargy.json` egy látható, kétnyelvű demó tantárgyat ad három alkalommal és nyolc fiktív tananyaggal. A hivatkozások dummy linkek, nem valódi letöltések. A demó elrejtéséhez állítsd a fájl tantárgyszintű `draft` mezőjét `true`-ra. A külön `minta-tantargy.json` továbbra is rejtett szerkesztési sablon.

1. Másold a `src/content/teaching/minta-tantargy.json` fájlt például `mechanika.json` néven.
2. Adj egyedi, kisbetűs, ékezet nélküli, kötőjeles `slug` értéket. A fájlnév is kövesse ezt. Töltsd ki a `title`, `description` és `order` mezőket.
3. A `sessions` listában hozz létre alkalmakat egyedi `id`, `title`, `order` és `materials` mezőkkel. Az opcionális `description` rövid bevezetőt ad az alkalomhoz. Az `order` szerint növekvő a sorrend.
4. A SharePointon feltöltött fájlhoz másold a **meglévő jogosultsággal rendelkezők** számára használható hivatkozást; az URL-t változtatás nélkül tedd az anyag `url` mezőjébe.
5. Add meg a tananyag alábbi mezőit. Egy alkalom legfeljebb öt anyagot tartalmazhat.
6. Cseréld ki az összes minta-URL-t, ellenőrizd a jogosultságokat, majd állítsd a tantárgy `draft` értékét `false`-ra. A minta alapból rejtett; kitöltetlen minta-URL-lel nem publikálható.
7. Futtasd az ellenőrzéseket, majd a szokásos GitHub-munkafolyamatban publikálj. Saját adminfelület nincs; a JSON GitHubon böngészőből is szerkeszthető.

| Mező                   | Jelentés                                                                                                                            |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | A tantárgyon belül egyedi, állandó azonosító; a kártya linkje `#material-{id}`. Ne nevezd át pusztán fájlcsere miatt.               |
| `title`, `description` | Objektum kötelező `hu` és opcionális `en` szöveggel.                                                                                |
| `type`                 | `pdf`, `python`, `html`, `latex`, `zip` vagy `github`. A HTML/LaTeX ZIP-csomag is jelölhető `html`/`latex` típussal.                |
| `languages`            | Nem üres lista: `hu`, `de`, `en`; a fájl nyelve, nem a katalógusé.                                                                  |
| `access`               | `university` (alapérték) vagy `public`. A címke önmagában nem változtat jogosultságot.                                              |
| `url`                  | HTTPS-hivatkozás. Egyetemi anyagnál `*.sharepoint.com` cím szükséges. Beágyazott felhasználónév/jelszó nem engedélyezett.           |
| `sizeBytes`            | A fájl valós mérete bájtban, maximum 5 000 000. GitHub-hivatkozásnál elhagyható.                                                    |
| `updated`              | Valós naptári dátum `YYYY-MM-DD` alakban; kézzel frissítendő.                                                                       |
| `draft`                | Anyagnál és alkalomnál alapból `false`, tantárgynál alapból `true`. A rejtett elemek és metaadataik kimaradnak a generált oldalból. |

A build elutasítja a hibás mezőket, dátumokat, URL-eket és az ismétlődő azonosítókat. Az 5 MB-os méretet a megadott metaadat alapján ellenőrzi: a külső fájlt nem tölti le, tehát valós méretét feltöltéskor ellenőrizd. Tantárgyból és alkalomból nincs mesterséges darabszámkorlát; a négy tantárgy és tantárgyanként 14 alkalom kezelhető.

### Saját tantárgy létrehozása lépésről lépésre

**Egy tantárgyhoz egy JSON-fájl tartozik.** Nem kell külön Astro-oldalt írnod, a menüt módosítanod vagy kézzel létrehoznod az angol oldalt. A rendszer a tartalomfájlból automatikusan elkészíti mindkét nyelvi változatot.

#### 1. Hozd létre a tantárgy fájlját

Helyben másold le a `src/content/teaching/minta-tantargy.json` fájlt ugyanabba a mappába, például `mechanika.json` néven. GitHubon is elvégezheted: másold ki a sablon tartalmát, majd a `src/content/teaching` mappában az **Add file → Create new file** művelettel hozz létre egy `mechanika.json` fájlt, és illeszd be a tartalmat.

Az alábbi teljes, egyalkalmas példa is bemásolható az új fájlba. A `mechanika` név csak példa: írd át a saját tantárgyad nevére. A `draft: true` miatt egyelőre nem jelenik meg a katalógusban.

```json
{
  "slug": "mechanika",
  "title": { "hu": "Mechanika", "en": "Mechanics" },
  "description": {
    "hu": "Előadásjegyzetek, gyakorlófeladatok és segédanyagok.",
    "en": "Lecture notes, practice problems and learning resources."
  },
  "order": 1,
  "draft": true,
  "sessions": [
    {
      "id": "01-bevezetes",
      "title": {
        "hu": "1. alkalom — Bevezetés",
        "en": "Session 1 — Introduction"
      },
      "description": { "hu": "Az első alkalomhoz tartozó anyagok." },
      "order": 1,
      "materials": [
        {
          "id": "bevezeto-jegyzet",
          "title": { "hu": "Bevezető jegyzet", "en": "Introductory notes" },
          "description": { "hu": "Az előadás PDF-jegyzete." },
          "type": "pdf",
          "languages": ["hu"],
          "access": "university",
          "url": "https://YOUR-TENANT.sharepoint.com/REPLACE-WITH-FILE-LINK",
          "sizeBytes": 1200000,
          "updated": "2026-10-29",
          "draft": false
        }
      ]
    }
  ]
}
```

#### 2. Írd át a tantárgy adatait

- `slug`: egyedi webcímrész, például `mechanika` vagy `mernoki-modellezes`; kisbetűs, ékezet és szóköz nélküli név. A `mechanika` példából `/hu/teaching/mechanika/` és `/en/teaching/mechanika/` oldal készül.
- `title` és `description`: a tantárgy megjelenített neve és összefoglalója. A `hu` kötelező; az `en` elhagyható, ilyenkor az angol felületen is a magyar tartalom látszik.
- `order`: sorrend a tantárgylistán; például a négy saját tantárgynál `1`, `2`, `3`, `4`.
- `draft`: amíg készíted, maradjon `true`. A tantárgyszintű `draft` az összes alatta szereplő alkalmat és anyagot is elrejti a weboldalról.

#### 3. Töltsd fel és kösd be a fájlokat

Az egyetemi SharePointon töltsd fel a tananyagot a tantárgy megfelelő mappájába. A lent leírt jogosultságok beállítása után másold ki a meglévő hozzáféréssel rendelkezőknek szóló fájlhivatkozást. A JSON `url` mezőjében a **teljes mintacímet** cseréld erre a linkre; ne próbálj fájlnévből kézzel SharePoint-címet összeállítani.

Állítsd be a fájltípust, a tananyag tényleges nyelvét, a bájtban megadott fájlméretet és a frissítés dátumát. Windowsban a fájl Tulajdonságok ablakában a **Méret** sor bájtértékét használd, ne a lemezen elfoglalt méretet; a JSON-ba csak a számjegyek kerüljenek, például `1200000`. Az útmutatóban szereplő méretet és dátumot is cseréld valós adatra.

További anyaghoz másolj egy teljes objektumot a `materials` listába. Adj neki új `id` értéket, címet, leírást és linket. Az anyagazonosító a teljes tantárgyon belül legyen egyedi. Egy alkalomhoz legfeljebb öt anyag tartozhat. A kártyák a `materials` listában megadott sorrendben jelennek meg.

#### 4. Add hozzá a többi alkalmat

Másolj egy teljes alkalomobjektumot a `sessions` listába. Az új alkalomnál módosítsd az `id`, `title`, `description`, `order` és `materials` mezőket. Például a második alkalom azonosítója `02-egyensuly`, az `order` értéke `2`. Az alkalmakat az `order` rendezi, nem az azonosító elején álló szám.

Ha még nincs anyag egy alkalomhoz, használj üres `"materials": []` listát. Ekkor az alkalom megjelenik egy rövid „még nincs közzétett tananyag” üzenettel. Ha magát az alkalmat sem szeretnéd mutatni, adj hozzá `"draft": true` mezőt. Egy később megjelenő tananyag ugyanígy külön elrejthető.

A JSON-ban dupla idézőjeleket használj, az egymás utáni objektumok közé tegyél vesszőt, az utolsó objektum után viszont ne. Megjegyzéseket (`// ...`) ne írj a JSON-fájlba.

#### 5. Ellenőrizd, majd jelenítsd meg

Cseréld ki az összes közzétenni kívánt minta-URL-t. Ezután a fájl tetején lévő, tantárgyszintű `draft` értékét állítsd `false`-ra. A tantárgy újraépítés után automatikusan megjelenik az Oktatás menüpont alatt.

Helyi szerkesztésnél a projekt gyökerében futtasd:

```sh
npm test
npm run build
npm run check:build
```

A `npm run dev` a forrásmódosításokat figyelő fejlesztői előnézetet indítja. A `npm run preview` az utolsó buildet mutatja, ezért ennél minden tartalomváltoztatás után új `npm run build` szükséges. A helyi címen nézd meg a tantárgy mindkét nyelvi oldalát, és próbáld ki a tananyaglinkeket megfelelő hallgatói fiókkal is.

GitHubos szerkesztésnél mentsd a kész fájlt a **Commit changes** művelettel. A `main` ágra kerülő változás elindítja a telepítést; ha másik ágon dolgozol, előbb a megszokott módon juttasd a változást a `main` ágra. Az **Actions** felületen várd meg a sikeres folyamatot, majd ellenőrizd az éles Oktatás oldalt. A hibás JSON vagy a tartalomsémának nem megfelelő adat megállítja a buildet; a hibaüzenet alapján javítsd az érintett mezőt.

#### 6. Ismételd meg a többi tantárgynál

Minden további tantárgy külön fájlt és külön `slug` értéket kapjon. Az alkalom- és anyagazonosítók más tantárgyban újra használhatók. A demó eltüntetéséhez a `demo-tantargy.json` tetején állítsd `true`-ra a `draft` mezőt, majd építsd újra az oldalt. A rejtett szerkesztési sablont megtarthatod későbbre.

### SharePoint előkészítése és ellenőrzése

- Használj intézményi SharePoint-webhelyet, tantárgyanként elkülönített dokumentumtárral vagy megfelelő jogosultságú mappával. Az oktató szerkeszthet, a tantárgy hallgatói csak olvashatnak és letölthetnek.
- A hallgatói csoportot a tényleges kurzus résztvevőire korlátozd. Az egész egyetemnek szóló link és az automatikus szerkesztői csoporttagság nem helyettesíti ezt.
- Ellenőrizd a szülőből örökölt jogosultságokat és a korábbi megosztási linkeket is. Ne maradjon „Anyone” link a védett anyaghoz. A weboldal ezeket a beállításokat nem tudja ellenőrizni.
- Egy mintafájlt próbálj ki kijelentkezve, jogosult hallgatói fiókkal és jogosultság nélküli fiókkal. A jogosult hallgató letölthet, de nem írhatja át; a többiek közvetlen URL-lel sem férhetnek hozzá.
- Hozzáférés visszavonásakor a SharePoint-csoporttagságot, közvetlen jogosultságokat és megosztási linkeket módosítsd. A katalógus linkjének törlése vagy a `draft` beállítása nem vonja vissza a fájlhozzáférést. Már letöltött példány nem hívható vissza.
- Az intézményi tárhelykvóta, csoportkezelés és bejelentkezési szabályok a tényleges egyetemi környezetben ellenőrizendők; ezt a repository nem konfigurálja.

### Fájlcsere, nyilvánossá tétel és csomagolás

Fájlfrissítéskor lehetőleg a meglévő SharePoint-fájlt cseréld/verziózd, majd ellenőrizd, működik-e a hivatkozás. Frissítsd a `sizeBytes` és `updated` adatokat. Áthelyezés vagy törlés/újrafeltöltés esetén a link is változhat; az anyag `id` értéke maradjon állandó. A SharePoint-fájlok verziózása az intézményi beállításoktól függ; a Git csak a katalógus módosításait tárolja.

Külsősöknek szánt anyagnál először hozz létre ellenőrzött nyilvános példányt (például nyilvános GitHub-repositoryban vagy annak kiadásában), majd erre cseréld az URL-t és állítsd `public`-ra a címkét. Kijelentkezett böngészőben ellenőrizd. Egy `access` mező módosítása önmagában nem publikál fájlt.

HTML-anyagnál az önálló `.html` letölthető; mellékfájlok esetén a teljes könyvtárat ZIP-be csomagold relatív hivatkozásokkal és `index.html` kezdőlappal. A leírás tartalmazza a kicsomagolás és megnyitás módját. Ha a HTML helyi webszervert vagy internetkapcsolatot igényel, ezt is jelezd és próbáld ki. Python-kód mellé írd le a környezetet és a szükséges csomagokat. LaTeX-sablonhoz ajánlott a forrás-ZIP, fordítási útmutató és külön minta-PDF; a GitHub forráslink külön anyagként felvehető. A weboldal nem futtat Python-kódot és nem fordít LaTeX-et.

**A repository nyilvános:** draftként sem kerülhet bele bizalmas fájl, megoldókulcs, névsor vagy titok. A draft csak a generált katalógusból rejt el. A védett fájlok ne kerüljenek a `public/`, `src/` vagy a publikált `dist/` könyvtárba. A ki nem adott megoldásokat olyan védett helyen tárold, amelyre a hallgatók még nem kaptak hozzáférést.

### Oktatási rész ellenőrzése

Az `npm test` a tartalomsémát, a draft-kezelést és a nyelvi útvonalakat is ellenőrzi. A build és a `check:build` a létrejövő oldalakat vizsgálja. A valódi SharePoint-jogosultságokat és fájlokat külön, a fenti fiókokkal kell tesztelni. Mobilon és asztali nézetben ellenőrizd az alkalmak sorrendjét, a tananyagkártyákat, a HU/EN nyelvváltót és az új lapon megnyíló hivatkozásokat. A mintatantárgyhoz nem készül publikus oldal; amíg nincs publikált tantárgy, a katalógus rövid feltöltés alatti üzenetet mutat.

## Telepítés

A `.github/workflows/deploy.yml` a `main` ágra történő pushra vagy kézi `workflow_dispatch` indításra fut:

1. Node.js 24 környezetet készít elő.
2. `npm ci` után futtatja a `npm run build` parancsot.
3. Futtatja az útvonalteszteket és a generált oldalak ellenőrzését (`npm test`, `npm run check:build`).
4. Feltölti a `dist/` mappát Pages-artifactként.
5. Telepít a `github-pages` környezetbe.

A repository GitHub Pages-beállításában a GitHub Actions forrás szükséges; a tényleges távoli beállítást ez a leírás nem ellenőrzi. A workflow nem futtat külön lintet vagy teljes típuselemzést. Helyi `deploy` script nincs: a telepítést a Pages-workflow végzi.

Más domainre vagy alkönyvtárba költözéskor az `astro.config.mjs` `site` értékét és a jelenlegi, gyökértől induló linkeket is felül kell vizsgálni. A statikus oldal GitHub Pageses futtatásához Cloudflare-fiók nem szükséges.

## Ellenőrzés változtatás után

```sh
npm test
npm run build
npm run check:build
git diff --check
```

Az `npm test` a Node.js beépített tesztfuttatójával ellenőrzi a nyelvi útvonalakat és a fordításpárokat. A `check:build` a friss `dist/` kimeneten vizsgálja a HTML-nyelvet, leírásokat, canonical és kölcsönös hreflang hivatkozásokat, helyi linkeket és a tipográfiai stílusok jelenlétét. A build nem teljes TypeScript-típusellenőrzés; külön lint vagy Astro check nincs beállítva. Új ellenőrző függőséget csak jóváhagyás után adj hozzá.

Felület- vagy tartalomváltoztatáskor az előnézetben nézd meg a magyar és angol kezdőlapot, CV-t, bloglistát és publikációkat, valamint egy blogbejegyzést. Ellenőrizd mobilon a menüt és az oldalsávot, továbbá a képleteket, diagramokat és a hivatkozásokat.

## Karbantartás és fennmaradó korlátok

- A `preview` script az Astro statikus előnézetét indítja. A használaton kívüli Cloudflare-konfiguráció, Wrangler és helyi deploy/typegen scriptek eltávolítva.
- Egyetlen ikoncsomag maradt: a meglévő `lucide-astro`. A másik, nem használt csomag eltávolítása megőrizte a GitHub- és LinkedIn-ikonokat is. A megmaradt csomagot az npm elavultnak jelöli; a további migráció külön, jóváhagyott függőségváltás lehet.
- A közös keret az oldal nyelvét, lokalizált leírását, egyedi címét, záró perjeles canonical URL-jét és a tényleges fordítások hreflang hivatkozásait állítja elő. A gyökérbeli átirányító oldal `noindex` jelölést kap. Blogbejegyzésnél a leírás a frontmatterből származik.
- A fejléc, a menügomb, a lábléc, a készségszintek és a CV üres állapota lokalizált. A zárt mobilmenü nem fókuszálható, az Escape bezárja. A Tailwind Typography plugin be van kapcsolva.
- A Mermaid továbbra is csak diagramot tartalmazó oldalon tölti be a renderelőt. A D3, a színek, a HTML-tisztítás, az ikonkezelés, a dátumkezelés és a közös segédek külön csomagokba kerülnek. A központi minifikált Mermaid-csomag körülbelül 607 kB-ról 494 kB-ra csökkent. A **Wardley-parser mintegy 612 kB-os csomagja továbbra is méretfigyelmeztetést okoz**; a telepített könyvtár ezt egyetlen előre csomagolt modulként szállítja, és csak Wardley-diagramnál importálja. A figyelmeztetési határt nem emeltük meg, diagramtípust nem kapcsoltunk ki.

A csomagméret további csökkentéséhez a Mermaid/parser csomag külön vizsgálata vagy jóváhagyott cseréje/frissítése szükséges. A kisebb Mermaid-változat nem azonos képességű: többek között diagramtípusokat és a lusta betöltést is elhagyja, ezért nem helyettesíti változatlan működéssel a jelenlegi megoldást. Lásd a [Mermaid hivatalos leírását](https://mermaid.js.org/config/usage#tiny-mermaid).

Ha korábban települt a chatbot Workere vagy létrejött hozzá API-kulcs, a helyi kód törlése ezeket a távoli erőforrásokat nem törli.

## AI-val végzett projektmunka

A javasolt projektspecifikus szabályok az [AGENTS.proposed.md](AGENTS.proposed.md) fájlban találhatók. Áttekintés után `AGENTS.md` néven tehetők aktívvá. A `PROGRESS.md` helyi, eldobható állapotjelzés; külön kérés nélkül nem kerül commitba.
