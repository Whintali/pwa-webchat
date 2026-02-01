import { test, expect } from "@playwright/test";

test("La page d'accueil se charge", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await expect(page).toHaveTitle(/PWA/);
});

test("On navigue vers photos", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.click("text=Photos");
    await expect(page).toHaveURL(/photo/);
});

test("On navigue vers conversation", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.click("text=Conversation");
    await expect(page).toHaveURL(/discussion/);
});

test("On navigue vers mon compte", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.click("text=Mon compte");
    await expect(page).toHaveURL(/account/);
});

test("On navigue vers geolocalisation", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.click("text=Geolocalisation");
    await expect(page).toHaveURL(/geolocalise/);
});