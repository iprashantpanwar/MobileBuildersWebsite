// Events synced from the Luma calendar by scripts/syncLuma.ts (scheduled GitHub workflows).
// upcoming.json is replaced on every sync. past.json only grows: fill in a session's
// `recordingUrl` there once its video is on YouTube, and later syncs leave it alone.

import type { CommunityEvent } from "./events";
import past from "./luma/past.json";
import upcoming from "./luma/upcoming.json";

export const LUMA_UPCOMING_EVENTS = upcoming as CommunityEvent[];
export const LUMA_PAST_EVENTS = past as CommunityEvent[];
