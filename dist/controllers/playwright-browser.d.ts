import { Browser, BrowserContext, Page } from 'playwright';
import { CreateConfig } from '../config/create-config';
import { Logger } from 'winston';
import { SessionToken } from '../token-store';
import { LoadingScreenCallback } from '../api/model';
import { LogLevel } from '../utils/logger';
export declare function unregisterServiceWorkerPlaywright(page: Page): Promise<void>;
export declare function initWhatsappPlaywright(page: Page, token?: SessionToken, clear?: boolean, version?: string, proxy?: {
    url: string;
    username: string;
    password: string;
}, log?: (level: LogLevel, message: string, meta?: object) => any): Promise<Page>;
export declare function injectApiPlaywright(page: Page, onLoadingScreenCallBack?: LoadingScreenCallback): Promise<void>;
/**
 * Initialize Playwright browser instance
 */
export declare function initPlaywrightBrowser(session: string, options: CreateConfig & {
    usePlaywright?: boolean;
}, logger: Logger): Promise<Browser | BrowserContext>;
export declare function getOrCreatePagePlaywright(browserOrContext: Browser | BrowserContext): Promise<Page>;
