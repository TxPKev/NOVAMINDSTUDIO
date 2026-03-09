# NOVA MIND STUDIOS - Homepage

## Übersicht: Welche Datei macht was?

```
app/
├── src/
│   ├── i18n/
│   │   └── translations.ts          ← ALLE TEXTE (DE/EN/FR)
│   │                                  Ändere hier Überschriften, Beschreibungen, etc.
│   │
│   ├── sections/                    ← Jede Section = Ein Bereich der Homepage
│   │   ├── Navigation.tsx           ← Obere Menüleiste mit Logo + Sprachwechsler
│   │   ├── Hero.tsx                 ← STARTSEITE (Titel, Untertitel, Stats)
│   │   ├── EarlyAccess.tsx          ← "Frühzeitigen Zugang anfragen" Box
│   │   ├── Projects.tsx             ← Projekte (AriNet, Guardian, AriTrainee)
│   │   ├── GuardianShowcase.tsx     ← Guardian Designs + Features
│   │   ├── Skills.tsx               ← Unsere Expertise + CNC→KI
│   │   ├── ChatInterface.tsx        ← Ari Chat Demo
│   │   ├── Studio.tsx               ← Das Studio (Kevin Kachramanow)
│   │   └── Footer.tsx               ← Footer mit Kontakt + Links
│   │
│   ├── hooks/
│   │   └── useLanguage.tsx          ← Sprachwechsler Logik
│   │
│   ├── App.tsx                      ← Hauptdatei - fügt alle Sections zusammen
│   ├── index.css                    ← Globale Styles (Farben, Animationen)
│   └── main.tsx                     ← Einstiegspunkt
│
├── vite.config.ts                   ← WICHTIG: Base-Path für GitHub Pages
├── package.json                     ← Abhängigkeiten
└── index.html                       ← HTML Template
```

---

## Schnell-Änderungen

### 1. Texte ändern (Überschriften, Beschreibungen)
**Datei:** `src/i18n/translations.ts`

```typescript
// DEUTSCH (de)
de: {
  hero: {
    subtitle: 'HIER DEIN NEUER TEXT',
  },
  studio: {
    description1: 'HIER DEIN NEUER TEXT',
  },
}

// ENGLISCH (en)
en: {
  hero: {
    subtitle: 'HERE YOUR NEW TEXT',
  },
}

// FRANZÖSISCH (fr)
fr: {
  hero: {
    subtitle: 'ICI VOTRE NOUVEAU TEXTE',
  },
}
```

### 2. Projekte ändern
**Datei:** `src/i18n/translations.ts` → `projects.items`

```typescript
items: [
  {
    id: 'arinet',
    title: 'AriNet',
    category: 'Artificial Intelligence',
    description: 'NEUE BESCHREIBUNG',
    slogan: 'NEUER SLOGAN',
  },
  // ... weitere Projekte
]
```

### 3. Kontaktdaten ändern
**Datei:** `src/i18n/translations.ts` → `contact`

```typescript
contact: {
  email: 'NEUE@EMAIL.COM',
  phone: '+41 79 XXX XX XX',    // ODER leer lassen
  address: 'Gösgen 5013',
  city: 'Kanton Solothurn, Schweiz',
}
```

### 4. Farben ändern
**Datei:** `src/index.css`

```css
:root {
  --nova-purple: 265 89% 58%;    ← Lila
  --nova-cyan: 180 100% 50%;     ← Cyan/Blau
  --nova-pink: 320 100% 60%;     ← Pink
  --nova-gold: 45 100% 55%;      ← Gold
}
```

### 5. Navigation ändern
**Datei:** `src/sections/Navigation.tsx` → `navItems`

```typescript
const navItems = [
  { label: 'Start', href: '#home' },
  { label: 'Projekte', href: '#projects' },
  // ...
];
```

---

## GitHub Pages Deployment

### Voraussetzung: vite.config.ts
```typescript
export default defineConfig({
  base: '/NOVAMINDSTUDIO/',   ← MUSS so sein für GitHub Pages!
  plugins: [react()],
})
```

### Deploy Befehle
```bash
cd app
npm run build                    # Erstellt dist/ Ordner

# Dann auf GitHub pushen:
git add .
git commit -m "Update"
git push origin main
```

GitHub Actions baut automatisch und deployed auf:
`https://txpkev.github.io/NOVAMINDSTUDIO/`

---

## Wichtige Dateien für häufige Änderungen

| Was ändern? | Datei | Zeile (ca.) |
|-------------|-------|-------------|
| Überschriften, Texte | `src/i18n/translations.ts` | Alle |
| Projekte | `src/i18n/translations.ts` | ~40-62 |
| Kontakt (Email, Adresse) | `src/i18n/translations.ts` | ~164-169 |
| Skills | `src/i18n/translations.ts` | ~94-128 |
| Navigation Links | `src/sections/Navigation.tsx` | ~26-32 |
| Farben | `src/index.css` | ~7-10 |
| Base-Path (GitHub) | `vite.config.ts` | ~7 |

---

## Technik-Stack

- **React** - UI Framework
- **TypeScript** - Typsicherheit
- **Tailwind CSS** - Styling
- **Vite** - Build Tool
- **shadcn/ui** - UI Komponenten

---

## Support

Bei Fragen: Schau in die Datei → Suche nach dem Text → Ändere ihn → Build → Push
