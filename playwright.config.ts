import { defineConfig, devices } from '@playwright/test';

// Smoke runs against the production server: `npm run build` first, then `npm run e2e`.
// Port is not 3000 so parallel worktrees can each run their own server.
const port = Number(process.env.E2E_PORT ?? 3045);

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: `http://localhost:${port}`,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['Desktop Chrome'], viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
  webServer: {
    command: `npm start -- -p ${port}`,
    url: `http://localhost:${port}`,
    // Never reuse: another worktree's server on this port would give false results.
    reuseExistingServer: false,
    timeout: 60 * 1000,
  },
});
