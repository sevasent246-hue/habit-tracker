# Habit World

A local-first habit tracker built with React, TypeScript, Vite, Tailwind CSS, and Lucide React.

## Run locally

Run pnpm install, then pnpm dev. Open the local URL printed by Vite. Habits, completions, XP, and the daily challenge are saved in browser localStorage.

## Pages

- /dashboard — daily progress, streak, XP, challenge, and Habit World preview
- /habits — create, edit, complete, undo, filter, and delete habits
- /world — island stages and XP milestones
- /statistics — completion summary, weekly activity, heatmap, and monthly calendar
- /achievements — earned and upcoming milestones
- /settings — local profile preferences and data export/reset

The src/types, src/hooks, src/utils, src/components, and src/pages directories separate the app model, persistence, UI, and views.
