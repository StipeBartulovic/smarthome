# EKP — novi web (redizajn „Boje vodiča“)

Statički site za Elektro Klima Projekt d.o.o., izrađen u [Astro](https://astro.build), hostan na Firebase Hostingu (projekt `primjersmarthome`).

## Pokretanje

```bash
npm install
npm run dev       # lokalno na http://localhost:4321
npm run build     # izrada u dist/
npm run preview   # pregled builda
npm run deploy    # build + firebase deploy --only hosting
```

## Struktura

- `src/pages/` — 13 stranica (naslovnica, Zgrade ×4, Obnovljivi izvori ×3, Industrija, Promet, Projekti, O nama, Kontakt)
- `src/components/` — zaglavlje s mega-izbornikom, podnožje, podizbornik Zgrade, ilustracije (`ill/`), `Photo.astro` (AVIF/WebP)
- `src/styles/global.css` — cijeli vizualni sustav (tokeni + komponente)
- `src/layouts/Base.astro` — layout i dvije male skripte: prekidač stanja (`data-state-group` / `data-set` / `data-show`) i slanje obrazaca
- `src/lib/firebase.ts` — Firebase konfiguracija (ne uvozi se nigdje dok ne zatreba)
- `src/assets/img/` — fotografije (trenutno AI placeholderi — zamijeniti stvarnim)

## Obrasci

Postavite `PUBLIC_FORM_ENDPOINT` u `.env` (vidi `.env.example`). Bez njega obrasci otvaraju e-mail klijent s popunjenom porukom na ekp@ekp.hr.

## Prije objave

- Zamijeniti sve `[PLACEHOLDER]` tekstove stvarnim podacima (broj projekata, reference, tim, certifikati, temeljni kapital u EUR).
- Zamijeniti AI fotografije stvarnim fotografijama EKP-a.
