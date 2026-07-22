
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { CustomerPage } from '../pages/CustomerPage';
import { OrdersPage } from '../pages/OrdersPage';
import { ProfilePage } from '../pages/ProfilePage';
import { ApiService } from '../services/apiService';
import { parse } from 'papaparse';
import fs from 'fs';
import path from 'path';

// Define the types for our fixtures
type MyFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  customerPage: CustomerPage;
  ordersPage: OrdersPage;
  profilePage: ProfilePage;
  apiService: ApiService;
  testData: (fileName: string) => any;
};

// Extend the base test with our custom fixtures
export const test = base.extend<MyFixtures>({
  // Fixture for LoginPage
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  // Fixture for DashboardPage
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  // Fixture for CustomerPage
  customerPage: async ({ page }, use) => {
    await use(new CustomerPage(page));
  },

  // Fixture for OrdersPage
  ordersPage: async ({ page }, use) => {
    await use(new OrdersPage(page));
  },

  // Fixture for ProfilePage
  profilePage: async ({ page }, use) => {
    await use(new ProfilePage(page));
  },

  // Fixture for ApiService
  apiService: async ({ request }, use) => {
    await use(new ApiService(request));
  },

  // Fixture for loading test data
  testData: async ({}, use) => {
    const loadTestData = (fileName: string): any => {
      const ext = path.extname(fileName).toLowerCase();
      const filePath = path.resolve(__dirname, '../data', fileName);

      if (!fs.existsSync(filePath)) {
        throw new Error(`Test data file not found: ${filePath}`);
      }

      const content = fs.readFileSync(filePath, 'utf-8');

      if (ext === '.json') {
        return JSON.parse(content);
      } else if (ext === '.csv') {
        return parse(content, { header: true }).data;
      }
      // Add support for other file types like Excel here
      else {
        throw new Error(`Unsupported test data format: ${ext}`);
      }
    };
    await use(loadTestData);
  },
});

export { expect } from '@playwright/test';
