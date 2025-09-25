"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unregisterServiceWorkerPlaywright = unregisterServiceWorkerPlaywright;
exports.initWhatsappPlaywright = initWhatsappPlaywright;
exports.injectApiPlaywright = injectApiPlaywright;
exports.initPlaywrightBrowser = initPlaywrightBrowser;
exports.getOrCreatePagePlaywright = getOrCreatePagePlaywright;
var playwright_1 = require("playwright");
var path = __importStar(require("path"));
var fs = __importStar(require("fs"));
var puppeteer_config_1 = require("../config/puppeteer.config");
var WAuserAgente_1 = require("../config/WAuserAgente");
function unregisterServiceWorkerPlaywright(page) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.addInitScript(function () {
                        // Remove existent service worker
                        navigator.serviceWorker
                            .getRegistrations()
                            .then(function (registrations) {
                            for (var _i = 0, registrations_1 = registrations; _i < registrations_1.length; _i++) {
                                var registration = registrations_1[_i];
                                registration.unregister();
                            }
                        })
                            .catch(function (err) { return null; });
                        // Disable service worker registration
                        // @ts-ignore
                        navigator.serviceWorker.register = new Promise(function () { });
                        setInterval(function () {
                            window.onerror = console.error;
                            window.onunhandledrejection = console.error;
                        }, 500);
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function initWhatsappPlaywright(page_1, token_1) {
    return __awaiter(this, arguments, void 0, function (page, token, clear, version, proxy, log) {
        if (clear === void 0) { clear = true; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    log === null || log === void 0 ? void 0 : log('verbose', 'Initializing WhatsApp WEB with Playwright');
                    if (!version) return [3 /*break*/, 2];
                    log === null || log === void 0 ? void 0 : log('verbose', "Setting WhatsApp WEB version to ".concat(version));
                    return [4 /*yield*/, page.route('https://web.whatsapp.com/check-update', function (route) {
                            route.abort();
                        })];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    log === null || log === void 0 ? void 0 : log('verbose', "Loading WhatsApp WEB");
                    return [4 /*yield*/, page.goto(puppeteer_config_1.puppeteerConfig.whatsappUrl, {
                            waitUntil: 'load',
                            timeout: 0,
                        })];
                case 3:
                    _a.sent();
                    log === null || log === void 0 ? void 0 : log('verbose', 'WhatsApp WEB loaded');
                    return [2 /*return*/, page];
            }
        });
    });
}
function injectApiPlaywright(page, onLoadingScreenCallBack) {
    return __awaiter(this, void 0, void 0, function () {
        var injected, waJsPath, waJsContent, wapiPath, wapiContent, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page
                        .evaluate(function () {
                        // @ts-ignore
                        return (typeof window.WAPI !== 'undefined' &&
                            typeof window.Store !== 'undefined');
                    })
                        .catch(function () { return false; })];
                case 1:
                    injected = _a.sent();
                    if (injected) {
                        return [2 /*return*/];
                    }
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 7, , 8]);
                    waJsPath = require.resolve('@wppconnect/wa-js');
                    waJsContent = fs.readFileSync(waJsPath, 'utf8');
                    return [4 /*yield*/, page.addScriptTag({ content: waJsContent })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, page.evaluate(function () {
                            WPP.chat.defaultSendMessageOptions.createChat = true;
                            WPP.conn.setKeepAlive(true);
                        })];
                case 4:
                    _a.sent();
                    wapiPath = require.resolve(path.join(__dirname, '../../dist/lib/wapi', 'wapi.js'));
                    wapiContent = fs.readFileSync(wapiPath, 'utf8');
                    return [4 /*yield*/, page.addScriptTag({ content: wapiContent })];
                case 5:
                    _a.sent();
                    // Wait for WAPI to be initialized
                    return [4 /*yield*/, page.waitForFunction(function () {
                            return (typeof window.WAPI !== 'undefined' &&
                                typeof window.Store !== 'undefined' &&
                                window.WPP.isReady);
                        })];
                case 6:
                    // Wait for WAPI to be initialized
                    _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    error_1 = _a.sent();
                    console.error('Error injecting scripts with Playwright:', error_1);
                    throw error_1;
                case 8: return [2 /*return*/];
            }
        });
    });
}
/**
 * Initialize Playwright browser instance
 */
function initPlaywrightBrowser(session, options, logger) {
    return __awaiter(this, void 0, void 0, function () {
        var userDataDir, contextOptions, _a, _, otherOptions, context_1, launchOptions, _b, _, otherOptions, browser;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    logger.info('Initializing Playwright browser', {
                        session: session,
                        type: 'playwright-browser',
                    });
                    userDataDir = (_c = options.puppeteerOptions) === null || _c === void 0 ? void 0 : _c.userDataDir;
                    if (!userDataDir) return [3 /*break*/, 2];
                    contextOptions = {
                        headless: options.headless === true,
                        args: options.browserArgs || [],
                        userAgent: WAuserAgente_1.useragentOverride, // Set user agent at context level
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
                    _a = options.puppeteerOptions || {}, _ = _a.userDataDir, otherOptions = __rest(_a, ["userDataDir"]);
                    Object.assign(contextOptions, otherOptions);
                    logger.info("Using persistent context with userDataDir: ".concat(userDataDir), {
                        session: session,
                        type: 'playwright-browser',
                    });
                    return [4 /*yield*/, playwright_1.chromium.launchPersistentContext(userDataDir, contextOptions)];
                case 1:
                    context_1 = _d.sent();
                    return [2 /*return*/, context_1]; // Type compatibility with Puppeteer Browser
                case 2:
                    launchOptions = {
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
                        _b = options.puppeteerOptions, _ = _b.userDataDir, otherOptions = __rest(_b, ["userDataDir"]);
                        Object.assign(launchOptions, otherOptions);
                    }
                    return [4 /*yield*/, playwright_1.chromium.launch(launchOptions)];
                case 3:
                    browser = _d.sent();
                    return [2 /*return*/, browser]; // Type compatibility with Puppeteer Browser
            }
        });
    });
}
function getOrCreatePagePlaywright(browserOrContext) {
    return __awaiter(this, void 0, void 0, function () {
        var page, existingPages, context_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!('pages' in browserOrContext &&
                        typeof browserOrContext.pages === 'function')) return [3 /*break*/, 4];
                    existingPages = browserOrContext.pages();
                    if (!(existingPages.length > 0)) return [3 /*break*/, 1];
                    page = existingPages[0];
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, browserOrContext.newPage()];
                case 2:
                    page = _a.sent();
                    _a.label = 3;
                case 3: return [3 /*break*/, 7];
                case 4: return [4 /*yield*/, browserOrContext.newContext({
                        userAgent: WAuserAgente_1.useragentOverride,
                        bypassCSP: true, // Bypass CSP to allow script injection
                    })];
                case 5:
                    context_2 = _a.sent();
                    return [4 /*yield*/, context_2.newPage()];
                case 6:
                    page = _a.sent();
                    _a.label = 7;
                case 7: return [2 /*return*/, page]; // Type compatibility with Puppeteer Page
            }
        });
    });
}
