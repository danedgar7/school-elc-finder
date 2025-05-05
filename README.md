# School Scout

This is the MVP for the School Scout Application. It allows parents to compare schools and early learning centres based on personalized criteria weightings.

## Features (MVP)
- Homepage with introduction and "Start Assessment" CTA
- Assessment UI with sliders for weighting criteria (Cost, Education, Staff, Facilities, Reputation, NQS)
- Real school/ELC data loaded from `app/schools.json` (generated from `centre_scores.csv` via `generate_json.py` script)
- Core comparison engine (weighted sum algorithm)
- Results page with ranked cards, simple chart visualization, and map display
- Placeholder UI for adding new schools via URL

## Stack
- React + TypeScript
- Vite (Build Tool)
- Tailwind CSS
- shadcn/ui (Slider, Card, Chart, Input, Button, Label)
- Recharts (for charts)
- Leaflet + react-leaflet (for map display)
- lucide-react (for icons)
- Jest + React Testing Library (for testing)

## Getting Started
1. Clone the repository
2. Install dependencies (`npm install`)
3. Ensure `centre_scores.csv` is present in the root directory.
4. Run the data generation script: `python generate_json.py` (This creates/updates `app/schools.json`)
5. Run the development server: `npm run dev` (inside the `app` directory)
6. Run tests: `npm run test` (inside the `app` directory)

## Directory Structure
- `app/` - Main application code (React frontend)
  - `schools.json` - School/ELC data used by the app
  - `src/` - Source code for the React app
  - `public/` - Static assets
- `centre_scores.csv` - Source CSV data for schools/ELCs
- `generate_json.py` - Script to convert CSV to `app/schools.json`
- `analysis.py` - Original Python analysis script (potentially for reference)
- `README.md`, `TASKS.md`, `PLANNING.md` - Project documentation

## Recent Updates
- Assessment and results UI are fully functional and interactive
- Added data generation script (`generate_json.py`) to populate `app/schools.json` from `centre_scores.csv`.
- Updated `centre_scores.csv` and `app/schools.json` with enriched data.
- Core comparison logic and charting are complete
- Added map display using Leaflet.
- Added shadcn/ui components: Input, Button, Label
- Refined Assessment Criteria sidebar UI:
  - Adjusted component spacing and text sizes
  - Removed numeric values from sliders
  - Added header labels ('Don't Care' / 'High Priority') above sliders
- Added 'Add School' card UI placeholder to sidebar
- Changed header title to "School Scout"
- Updated map tiles to Stadia Maps Alidade Smooth Dark for better contrast
- Replaced header text icons with `lucide-react` components
- Confirmed Jest test suite passes after data updates.

## Recommended Next Steps
- Implement logic for 'Add School' card (fetch data from URL)
- Polish visual design and add UI/UX enhancements (help text, tooltips, better mobile support)
- Add a school/ELC details modal or page for richer info (using data from `schools.json`)
- Implement error/loading states for data fetching (if applicable, currently data is static)
- Expand test coverage for core logic and components.
- Consider abstracting data loading logic for future API/database integration.
- Plan for user feedback collection and analytics.
- Prepare documentation for end users and developers

## References
- [shadcn/ui Slider](https://ui.shadcn.com/docs/components/slider)
- [shadcn/ui Card](https://ui.shadcn.com/docs/components/card)
- [shadcn/ui Chart](https://ui.shadcn.com/docs/components/chart)
- [Tailwind CSS Layout](https://tailwindcss.com/docs/display)

---
For a full breakdown of tasks and future features, see `TASKS.md` and `PLANNING.md`.
