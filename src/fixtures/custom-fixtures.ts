
import { test as base, expect as baseExpect } from '@playwright/test';

// Extend basic test by adding fixtures.
// This is a placeholder for any future custom fixtures.
export const test = base.extend({});

// Re-export expect
export const expect = baseExpect;
