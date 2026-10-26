# Mobile Builders website

The homepage for Mobile Builders, an online community for people building mobile products.
Built with React 19, TypeScript, Vite and plain CSS (design tokens + CSS Modules). It has no UI or animation libraries.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build
```

## Where things live

| What | File |
| --- | --- |
| Links (invite, LinkedIn, YouTube, events calendar), contact email, form endpoint, site URL | `src/config/siteConfig.ts` |
| Hand-written upcoming and past events | `src/data/events.ts` |
| Events synced from Luma (past sessions take recording links) | `src/data/luma/*.json` |
| Resource library | `src/data/resources.ts` |
| Nav links and topic list | `src/data/navigation.ts` |
| Colour, type, spacing, radius, motion tokens | `src/styles/tokens.css` |
| Page sections | `src/components/sections/`, `src/components/hero/` |
| Logo (original + transparent-margin-trimmed copy, icons) | `public/` |

## Events come from Luma

Two scheduled GitHub workflows read the Mobile Builders Luma calendar's iCal feed (`links.lumaCalendarIcal`)
and commit what they find to `src/data/luma/`. They live in `.github/workflows/` and run `scripts/syncLuma.ts`.

| Workflow | When | What it does |
| --- | --- | --- |
| `luma-upcoming-events.yml` | Wednesdays 18:00 IST | Replaces `upcoming.json` with every event that hasn't started yet |
| `luma-past-sessions.yml` | Sundays 18:00 IST | Adds technical sessions that have happened to `past.json` |

Both workflows can also be started by hand from the repository's Actions tab, and both commit only when something
changed. Locally, run the same syncs with:

```bash
npm run sync:upcoming
npm run sync:past
```

**Adding a recording.** A new past session arrives with `"recordingUrl": null`, so its card says "Recording not yet
published". Once the video is on YouTube, put its link in that entry's `recordingUrl` in `src/data/luma/past.json`.
Later syncs only add new sessions and never rewrite existing ones, so the link stays.

**What gets synced**

- Past sessions only include **Technical Sessions**, because those are the ones that get recorded. Community events,
  workshops and hackathons are left out. The event type is guessed from the Luma title: "Hackathon" and "Workshop" are
  detected, "Builders Connect" and similar meetups count as community events, and anything else is a technical session.
- A Luma session is skipped if a session with the same title is already written by hand in `PAST_EVENTS` in
  `src/data/events.ts`. Those hand-written entries are never touched. Titles match when one starts with the other,
  because Luma titles are sometimes shorter.
- Luma's feed has no descriptions, cover images or speakers. Cards show the title, date, length and Luma's "Hosted by"
  names, with topic tags guessed from the title.
- On the page, the next 3 upcoming events get a full card with "Register on Luma". The rest are counted in a
  "N more upcoming on Luma" link. Events drop off by themselves once they start, even before the next Wednesday sync.
- `LUMA_ICAL_URL` overrides the feed. `SYNC_NOW=2026-12-06T12:30:00Z` runs a sync as if it were that time, to
  preview or backfill.
- The workflows commit to the branch they run on. Scheduled runs only happen on the repository's default branch. If
  your host deploys on push, each sync commit also publishes the update.

## Nothing on the page is made up

Any link or fact that hasn't been confirmed is `null` or empty. Each section handles that honestly:

- **No `communityInvite`:** every "Join" button scrolls to the join section, which says "Invite link coming soon".
- **No upcoming events:** the events section shows a "next session is being planned" state. In `npm run dev` only, a
  striped card marked *Sample data · dev only* appears under it so the card design can be checked. It never ships.
- **Past sessions without a `recordingUrl`** say "Recording not yet published". Add the URL and the whole card becomes a link.
- **No `partnershipFormEndpoint` or `contactEmail`:** the production build swaps the collaboration form for a short note
  that points to the community. Dev still shows the form, so it can be tested.
- **No `siteUrl`:** no canonical link is written, and the social-card image stays relative. Set it and `vite.config.ts`
  adds both at build time.
- Footer social links only appear once their URL is set.
