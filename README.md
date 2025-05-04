# School/ELC Finder MVP

This is the MVP for the School/ELC Finder Application. It allows parents to compare schools and early learning centres based on personalized criteria weightings.

## Features (MVP)
- Homepage with introduction and "Start Assessment" CTA
- Assessment UI with sliders for weighting criteria (Cost, Education, Staff, Facilities, Reputation, NQS)
- Real school/ELC data loaded from `schools.json` (synced from CSV)
- Core comparison engine (weighted sum algorithm)
- Results page with ranked cards and simple chart visualization
- School/ELC details modal or page
- Placeholder UI for adding new schools via URL

## Stack
- React + TypeScript
- Tailwind CSS
- shadcn/ui (Slider, Card, Chart, Input, Button, Label)
- Recharts (for charts)

## Getting Started
1. Clone the repository
2. Install dependencies (`npm install` or `pnpm install`)
3. Run the development server (`npm run dev`)

## Directory Structure
- `app/` - Main application code
  - `schools.json` - Sample school/ELC data

## Recent Updates
- Assessment and results UI are fully functional and interactive
- Real data from `centre_scores.csv` is now loaded via `schools.json`
- Core comparison logic and charting are complete
- Added shadcn/ui components: Input, Button, Label
- Refined Assessment Criteria sidebar UI:
  - Adjusted component spacing and text sizes
  - Removed numeric values from sliders
  - Added header labels ('Don't Care' / 'High Priority') above sliders
- Added 'Add School' card UI placeholder to sidebar

## Recommended Next Steps
- Implement logic for 'Add School' card (fetch data from URL)
- Polish visual design and add UI/UX enhancements (help text, tooltips, better mobile support)
- Add a school/ELC details modal or page for richer info
- Implement error/loading states for data fetching
- Add tests for core logic and components
- Abstract data loading to allow future API/database integration
- Plan for user feedback collection and analytics
- Prepare documentation for end users and developers


## References
- [shadcn/ui Slider](https://ui.shadcn.com/docs/components/slider)
- [shadcn/ui Card](https://ui.shadcn.com/docs/components/card)
- [shadcn/ui Chart](https://ui.shadcn.com/docs/components/chart)
- [Tailwind CSS Layout](https://tailwindcss.com/docs/display)

---
For a full breakdown of tasks and future features, see `TASKS.md` and `PLANNING.md`.
