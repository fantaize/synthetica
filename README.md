# Synthetica

A comprehensive dashboard and database tracking the AI/LLM ecosystem, including research labs, inference providers, applications, and protocols.

## Features

- **Labs** - AI research organizations building large language models, with details on headquarters, flagship models, focus areas, and open-source status
- **Providers** - Cloud platforms, inference APIs, and services offering access to AI models
- **Apps** - Tools and applications across IDEs, CLI, browsers, and more
- **Protocols** - Standards and specifications in the AI ecosystem
- **Analytics** - Visual breakdowns by tier, geography, open-source status, and focus areas

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Recharts

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Data

All data is stored as JSON in `src/data/` and can be updated independently of the application code.

## Helpers wanted!

As a lot of this data is scraped through random search with AI, a lot of it is inaccurate, eventually I want this project to have proper descriptions for all cards
