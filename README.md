# Application Command Center

A browser-first dashboard for managing university applications, exams, essays, deadlines, and daily workload in one place.

## Why this exists

A normal to-do list tells you what exists. This dashboard is designed to answer:

1. What should I work on first?
2. Which deadline is becoming dangerous?
3. Are applications and exams competing for the same time?
4. What can realistically fit into today's available hours?

## Included in v1

- **Today dashboard** with open-task and deadline stats
- **Priority Queue** ranked by urgency, priority, and task size
- **Next 7 Days** deadline view
- **Master Timeline** combining tasks, applications, and exams
- **Editable Tasks** with category, priority, due date, duration, notes, completion, editing, and deletion
- **Application Board** with region, deadline, status, and progress
- **Exam Board** with date, priority, and preparation progress
- **Local Smart Planner** that fits tasks into your available study time
- **Optional AI Planner hook** at `/api/plan`
- **Real local date/time** in the dashboard header
- **Browser-local storage** so edits persist between visits
- **JSON export/import** for backups and moving data between devices
- **Responsive layout** for iPad, desktop, and phone
- **English-only UI** to avoid browser encoding issues

## Run it

There is no build step and no framework.

Open `index.html` directly in a browser, or serve the repository as a static site.

## GitHub Pages

After the files are merged into `main`:

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Choose `main` and `/ (root)`.
4. Save.

> Note: GitHub Pages availability for a private repository depends on the GitHub plan. If Pages is unavailable while the repository is private, you can either change deployment method or adjust repository visibility later.

## AI planner architecture

The dashboard already works without AI. The built-in planner is local and deterministic.

The **Ask connected AI planner** button sends planning data to `/api/plan`. A future server-side endpoint can connect that route to an AI model.

Do **not** put a private API key inside `index.html`. Client-side code can be inspected by anyone who can access the page.

Recommended AI boundary:

**AI may:**
- rank tasks
- detect schedule collisions
- suggest daily work blocks
- suggest what to postpone
- rebalance workload when dates change

**AI should not:**
- write or rewrite essays automatically
- submit applications
- send messages
- change deadlines silently
- modify stored tasks without user approval

## Local data

The app stores data in the current browser using the key:

`application-command-center-v1`

Use **Settings → Export JSON** to create a backup.

## Current project structure

- `index.html` — complete dashboard UI and logic
- `README.md` — project documentation
- `.nojekyll` — static hosting compatibility
