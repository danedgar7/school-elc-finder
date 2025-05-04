# School/ELC Finder MVP

This is the MVP for the School/ELC Finder Application. It allows parents to compare schools and early learning centres based on personalized criteria weightings.

## Features (MVP)
- Homepage with introduction and "Start Assessment" CTA
- Assessment UI with sliders for weighting criteria (Cost, Education, Staff, Facilities, Reputation, NQS)
- Pre-loaded sample school/ELC data (`schools.json`)
- Core comparison engine (weighted sum algorithm)
- Results page with ranked cards and simple chart visualization
- School/ELC details modal or page

## Stack
- React + TypeScript
- Tailwind CSS
- shadcn/ui (Slider, Card, Chart)
- Recharts (for charts)

## Getting Started
1. Clone the repository
2. Install dependencies (`npm install` or `pnpm install`)
3. Run the development server (`npm run dev`)

## Directory Structure
- `app/` - Main application code
  - `schools.json` - Sample school/ELC data

## Next Steps
- Implement assessment and results UI
- Add more sample data
- Polish visual design

## References
- [shadcn/ui Slider](https://ui.shadcn.com/docs/components/slider)
- [shadcn/ui Card](https://ui.shadcn.com/docs/components/card)
- [shadcn/ui Chart](https://ui.shadcn.com/docs/components/chart)
- [Tailwind CSS Layout](https://tailwindcss.com/docs/display)

---
For a full breakdown of tasks and future features, see `TASKS.md` and `PLANNING.md`.
