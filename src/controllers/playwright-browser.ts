/*
 * This file is part of WPPConnect.
 *
 * WPPConnect is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * WPPConnect is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with WPPConnect.  If not, see <https://www.gnu.org/licenses/>.
 */

import {
  chromium,
  Browser,
  BrowserContext,
  Page,
  LaunchOptions,
} from 'playwright';
import * as path from 'path';
import * as fs from 'fs';
import { CreateConfig } from '../config/create-config';
import { puppeteerConfig } from '../config/puppeteer.config';
import { useragentOverride } from '../config/WAuserAgente';
import { Logger } from 'winston';
import { SessionToken } from '../token-store';
import { LoadingScreenCallback } from '../api/model';
import { LogLevel } from '../utils/logger';

export async function unregisterServiceWorkerPlaywright(page: Page) {
  await page.addInitScript(() => {
    // Remove existent service worker
    navigator.serviceWorker
      .getRegistrations()
      .then((registrations) => {
        for (let registration of registrations) {
          registration.unregister();
        }
      })
      .catch((err) => null);

    // Disable service worker registration
    // @ts-ignore
    navigator.serviceWorker.register = new Promise(() => {});

    setInterval(() => {
      window.onerror = console.error;
      window.onunhandledrejection = console.error;
    }, 500);
  });
}

export async function initWhatsappPlaywright(
  page: Page,
  token?: SessionToken,
  clear = true,
  version?: string,
  proxy?: {
    url: string;
    username: string;
    password: string;
  },
  log?: (level: LogLevel, message: string, meta?: object) => any
) {
  log?.('verbose', 'Initializing WhatsApp WEB with Playwright');

  // Handle version check route first (more specific)
  if (version) {
    log?.('verbose', `Setting WhatsApp WEB version to ${version}`);
    await page.route('https://web.whatsapp.com/check-update', (route) => {
      route.abort();
    });
  }

  log?.('verbose', `Loading WhatsApp WEB`);
  await page.goto(puppeteerConfig.whatsappUrl, {
    waitUntil: 'load',
    timeout: 0,
  });

  log?.('verbose', 'WhatsApp WEB loaded');
  return page;
}

export async function injectApiPlaywright(
  page: Page,
  onLoadingScreenCallBack?: LoadingScreenCallback
) {
  const injected = await page
    .evaluate(() => {
      // @ts-ignore
      return (
        typeof window.WAPI !== 'undefined' &&
        typeof window.Store !== 'undefined'
      );
    })
    .catch(() => false);

  if (injected) {
    return;
  }

  try {
    // Add wa-js script using content instead of path for better Playwright compatibility
    const waJsPath = require.resolve('@wppconnect/wa-js');
    const waJsContent = fs.readFileSync(waJsPath, 'utf8');
    await page.addScriptTag({ content: waJsContent });

    await page.evaluate(() => {
      WPP.chat.defaultSendMessageOptions.createChat = true;
      WPP.conn.setKeepAlive(true);
    });

    // Add wapi.js script using content instead of path
    const wapiPath = require.resolve(
      path.join(__dirname, '../../dist/lib/wapi', 'wapi.js')
    );
    const wapiContent = fs.readFileSync(wapiPath, 'utf8');
    await page.addScriptTag({ content: wapiContent });

    // Wait for WAPI to be initialized
    await page.waitForFunction(() => {
      return (
        typeof window.WAPI !== 'undefined' &&
        typeof window.Store !== 'undefined' &&
        window.WPP.isReady
      );
    });
  } catch (error) {
    console.error('Error injecting scripts with Playwright:', error);
    throw error;
  }
}

/**
 * Initialize Playwright browser instance
 */
export async function initPlaywrightBrowser(
  session: string,
  options: CreateConfig & { usePlaywright?: boolean },
  logger: Logger
): Promise<Browser | BrowserContext> {
  logger.info('Initializing Playwright browser', {
    session,
    type: 'playwright-browser',
  });

  // Check if userDataDir is specified (from puppeteerOptions)
  const userDataDir = options.puppeteerOptions?.userDataDir;

  if (userDataDir) {
    // Use launchPersistentContext when userDataDir is specified
    const contextOptions: any = {
      headless: options.headless === true,
      args: options.browserArgs || [],
      userAgent: useragentOverride, // Set user agent at context level
      bypassCSP: true, // Bypass CSP to allow script injection
    };

    // Add proxy if configured
    if (options.proxy && options.proxy.url) {
      contextOptions.proxy = {
        server: options.proxy.url,
        username: options.proxy.username,
        password: options.proxy.password,
      };
    }

    // Remove userDataDir from the options to avoid conflict
    const { userDataDir: _, ...otherOptions } = options.puppeteerOptions || {};
    Object.assign(contextOptions, otherOptions);

    logger.info(`Using persistent context with userDataDir: ${userDataDir}`, {
      session,
      type: 'playwright-browser',
    });

    const context = await chromium.launchPersistentContext(
      userDataDir,
      contextOptions
    );
    return context as any; // Type compatibility with Puppeteer Browser
  } else {
    // Use regular launch when no userDataDir is specified
    const launchOptions: LaunchOptions = {
      headless: options.headless === true,
      devtools: options.devtools,
      args: options.browserArgs || [],
    };

    // Add proxy if configured
    if (options.proxy && options.proxy.url) {
      launchOptions.proxy = {
        server: options.proxy.url,
        username: options.proxy.username,
        password: options.proxy.password,
      };
    }

    // Merge with custom options (excluding userDataDir)
    if (options.puppeteerOptions) {
      const { userDataDir: _, ...otherOptions } = options.puppeteerOptions;
      Object.assign(launchOptions, otherOptions);
    }

    const browser = await chromium.launch(launchOptions);
    return browser as any; // Type compatibility with Puppeteer Browser
  }
}

export async function getOrCreatePagePlaywright(
  browserOrContext: Browser | BrowserContext
): Promise<Page> {
  let page: Page;

  // Check if it's a BrowserContext (from launchPersistentContext)
  if (
    'pages' in browserOrContext &&
    typeof browserOrContext.pages === 'function'
  ) {
    // It's a BrowserContext
    const existingPages = browserOrContext.pages();
    if (existingPages.length > 0) {
      page = existingPages[0];
    } else {
      page = await browserOrContext.newPage();
    }
  } else {
    // It's a Browser, create a new context and page with user agent and CSP bypass
    const context = await (browserOrContext as any).newContext({
      userAgent: useragentOverride,
      bypassCSP: true, // Bypass CSP to allow script injection
    });
    page = await context.newPage();
  }

  return page as any; // Type compatibility with Puppeteer Page
}
