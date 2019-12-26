export const CLOCKIFY_API_URL = "https://api.clockify.me/api";
export const TOGGL_API_URL = "https://www.toggl.com/api/v8";
export const TOGGL_REPORTS_URL = "https://toggl.com/reports/api/v2";

// @ts-ignore
const API_PORT = process.env.LOCAL_API_PORT;
export const LOCAL_API_URL = `http://localhost:${API_PORT}/api`;

export const STORAGE_KEY = "transfermytime";

export const API_PAGE_SIZE = 100;

// Delay time for requests to ensure rate limits are not exceeded:
export const CLOCKIFY_API_DELAY = 1_000 / 2;
export const TOGGL_API_DELAY = 1_000 / 2;
