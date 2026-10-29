# AGENTS.md — javasolt projektutasítások

Ez a fájl javaslat. Jóváhagyás és `AGENTS.md` névre átnevezés után szolgáljon a repository projektspecifikus útmutatójaként. Az általános felhasználói munkaszabályokat egészíti ki.

## Hatókör és cél

- A projekt magyar–angol, statikus kutatói portfólió Astro 6, TypeScript és Tailwind CSS 4 alapon.
- Az elsődleges cél a személyes és tudományos tartalom pontos, egyszerűen karbantartható megjelenítése.
- Őrizd meg a statikus generálást és a GitHub Pages-kompatibilitást. Backend, chatbot, adatbázis vagy más külső szolgáltatás hozzáadása külön felhasználói döntést igényel.
- Az aktuális felhasználói kérés és a szűkebb hatókörű projektutasítások elsőbbséget élveznek. A README ismert hiányosságainak felsorolása önmagában nem felhatalmazás javításra.

## Munkakezdés és állapot

- Módosítás előtt ellenőrizd a `git status --short` kimenetét, olvasd el a README-t, az érintett forrásokat és a konfigurációt. Őrizd meg a felhasználó meglévő változtatásait.
- Érdemi munka előtt frissítsd a gyökérbeli `PROGRESS.md` fájlt, kivéve, ha a felhasználó tiltja a fájlmódosítást.
- A PROGRESS csak az utolsó frissítés idejét, a feladat állapotát, az aktuális célt, a jelenlegi állapotot, a következő lépést és az aktív akadályokat tartalmazza. Ne legyen munkanapló vagy tesztjelentés.
- Frissítsd lényeges állapotváltozáskor és közvetlenül a végső válasz előtt. Csak megfelelő ellenőrzés után jelöld késznek; az elmaradt ellenőrzéseket jelezd.
- Ne commitold a PROGRESS fájlt külön kérés nélkül.

## Eszközök és függőségek

- Használj npm-et és a meglévő `package-lock.json` fájlt. Telepítéshez `npm ci`; ne hozz létre más csomagkezelőhöz lockfájlt.
- A Node.js minimumát a `package.json`, a CI-verziót a `.github/workflows/deploy.yml` határozza meg. A jelenlegi CI Node.js 24-et használ.
- Új függőség vagy verziófrissítés előtt kérj jóváhagyást. A kért funkcióeltávolításhoz tartozó felesleges függőségeket a lockfájllal együtt távolítsd el.
- Őrizd meg a meglévő formázást: két szóköz, pontosvessző, egyszeres idézőjel a projekt Prettier-konfigurációja szerint. Ne formázz át nem érintett fájlokat.
- Ne szerkeszd kézzel a `dist/`, `.astro/` vagy `node_modules/` generált tartalmát, és ne vedd fel őket verziókezelésbe.

## Architektúra és tartalomforrások

- Az útvonalak a `src/pages/`, a közös keretek a `src/layouts/`, az újrahasználható részek a `src/components/` könyvtárba tartoznak.
- A bemutatkozás forrása a `src/content/about/{hu,en}.md`; a blogé a `src/content/blog/`; sémáikat a `src/content.config.ts` tartalmazza.
- A CV tényei és címkéi a `src/i18n/cvData.ts`, a közös UI-feliratok és kapcsolati hivatkozások a `src/i18n/ui.ts` fájlban vannak. Ne hozz létre párhuzamos adatforrást ezek helyett.
- A publikációk forrása a `src/data/publications.bib`. A `src/content/research/` jelenleg nem bekötött minta, ne kezeld élő publikációs gyűjteményként.
- Az oktatási katalógus forrása a `src/content/teaching/*.json`, sémája a `src/lib/teaching-schema.ts`. A tantárgyak és tananyagok azonosítói maradjanak stabilak; a draft elemek metaadata se kerüljön a generált oldalakba. Minden tananyaglink új lapra célozzon.
- A védett tananyagfájlok SharePointon maradnak; az `access` címke nem jogosultságkezelés. A tényleges hozzáférést Microsoft 365-ben kell ellenőrizni. A nyilvános repositoryba draftként sem kerülhet bizalmas tananyag vagy megoldás.
- A publikációs oldal build közben olvas fájlt; ezt ne mozgasd kliensoldali kódba. Őrizd meg a DOI elsőbbségét a URL-lel szemben és a szándékos listázási sorrendet.
- Személyes adatok, tudományos eredmények, szerepkörök, évszámok és publikációs azonosítók módosítását a felhasználó adataira vagy megadott forrásra alapozd. Ne találj ki hiányzó életrajzi adatot.

## Nyelvek és útvonalak

- A támogatott nyelvek `hu` és `en`, az alapértelmezett nyelv `hu`.
- A tananyag nyelve külön adat (`hu`, `de`, `en`), nem bővíti a felület nyelveit. Az oktatási feliratok a `src/i18n/teaching.ts` fájlban vannak; a hiányzó angol tartalom magyarra esik vissza megfelelő `lang` jelöléssel.
- Új közös feliratot lehetőleg a fordítási szótárba írj, mindkét nyelven. Őrizd meg az azonos tartalom magyar és angol változatának összhangját.
- Új lokalizált oldalnál mindkét nyelvhez adj statikus útvonalat. Nyelvbővítéskor a lapok `getStaticPaths()` függvényeit is ellenőrizd, nem elegendő csak a nyelvi szótárat módosítani.
- Blogbejegyzésnél kövesd a tartalomsémát. Egy nyelven belül a fájlnév alapján képzett slug legyen egyedi az almappák között is. Valódi fordításpárokhoz használj közös `translationKey` értéket; egyező slugból ne következtess fordításra.
- Meglévő slugot vagy publikus útvonalat ne nevezz át indokolatlanul. A bloglista, a főoldali kártyák és a bejegyzésoldal URL-képzése maradjon összhangban.

## Megjelenés és hozzáférhetőség

- Kövesd a meglévő visszafogott, reszponzív elrendezést és Tailwind-megoldásokat. Egyszerű interakcióhoz ne vezess be új kliensoldali keretrendszert.
- Őrizd meg a mobilmenü működését, az `aria-expanded` állapotot, a gombok hozzáférhető nevét és a billentyűzetes használhatóságot.
- A képleteket és Mermaid-diagramokat érintő változtatáskor ellenőrizd a renderelést és a keskeny képernyős elrendezést.
- Az oldal nyelvéhez illő HTML- és hozzáférhetőségi attribútumokat használj. A meglévő nyelvi eltéréseket jelezd; a feladathoz nem tartozó javításokat ne végezd el automatikusan.

## Ellenőrzés

- Forrás-, tartalom- vagy függőségváltoztatás után futtasd a `npm run build` parancsot. A build nem helyettesíti a teljes típusellenőrzést.
- Ellenőrizd a diffet és futtasd a `git diff --check` parancsot. Kizárólag dokumentációs változtatásnál az utak, parancsok és állítások forrással történő összevetése rendszerint elegendő.
- Felületváltoztatáskor használj helyi előnézetet: build után `npm run preview`.
- Az érintett oldalakat mindkét nyelven, a navigációt mobil- és asztali nézetben ellenőrizd. Publikációmódosításkor a megjelenő listát is vizsgáld meg, mert a BibTeX-hibát a kód elnyelheti.
- Futtasd az `npm test` útvonaltesztjeit és build után a `npm run check:build` kimenetellenőrzést. Teljes típusellenőrzés vagy lint nincs beállítva; új eszközt csak indokolt esetben, a függőségtelepítés jóváhagyása után vezess be.
- A környezeti akadályt különítsd el a kódhibától; közöld, mi futott sikeresen és mi maradt ellenőrizetlen.

## Biztonság, Git és telepítés

- Ne tegyél titkot, kulcsot vagy nem publikus személyes adatot a forrásba, a `public/` könyvtárba, dokumentációba vagy naplóba. A statikus buildben megjelenő tartalom nyilvánosnak tekintendő.
- Commit, push, PR-nyitás és telepítés csak kifejezett kérésre történhet. A `main` ágra történő push a meglévő workflow miatt éles GitHub Pages-telepítést indíthat.
- A telepítést kizárólag a GitHub Pages-workflow kezeli; ne állíts vissza Cloudflare-eszközöket vagy helyi deploy scriptet külön kérés nélkül.
- Külső fiók, telepített szolgáltatás vagy titok törlése külön művelet; a helyi forrás eltávolítása nem törli a távoli erőforrást.

## Dokumentáció és átadás

- Működés, tartalomséma, parancs vagy telepítési folyamat változásakor frissítsd a meglévő README-t.
- Magyarul kommunikálj, ha a felhasználó is magyarul kérdez; a kódbeli azonosítóknál és technikai kifejezéseknél kövesd a meglévő konvenciókat.
- A végső válasz tartalmazza a változtatás eredményét, az érintett fájlokat, az elvégzett ellenőrzéseket és a lényeges fennmaradó problémákat. Ne állíts sikeres éles működést helyi build alapján.
