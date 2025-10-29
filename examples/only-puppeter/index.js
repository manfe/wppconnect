const puppeteer = require('puppeteer');
const qrcode = require('qrcode-terminal');

class PuppeteerWhatsApp {
  constructor(options = {}) {
    this.options = {
      headless: false,
      devtools: false,
      userDataDir: './session',
      ...options,
    };
    this.browser = null;
    this.page = null;
  }

  async start() {
    console.log('🚀 Starting Puppeteer WhatsApp session...');

    try {
      // Launch browser with session persistence
      this.browser = await puppeteer.launch({
        headless: this.options.headless,
        devtools: this.options.devtools,
        userDataDir: this.options.userDataDir,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--single-process',
          '--disable-gpu',
          '--start-maximized',
          '--window-size=1920,1080',
        ],
      });

      // Get all existing pages and use the first one (default tab)
      const pages = await this.browser.pages();
      this.page = pages[0];

      // // Set viewport to use full screen
      // const screenSize = { width: 1920, height: 1080 };
      // await this.page.setViewport(screenSize);

      // Set user agent to avoid detection
      await this.page.setUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36'
      );

      // Navigate to WhatsApp Web
      console.log('📱 Navigating to WhatsApp Web...');
      await this.page.goto('https://web.whatsapp.com', {
        waitUntil: 'networkidle0',
        timeout: 60000,
      });
    } catch (error) {
      console.error('❌ Error starting WhatsApp session:', error);
    }
  }

  async close() {
    if (this.browser) {
      console.log('🔚 Closing browser...');
      await this.browser.close();
      this.browser = null;
      this.page = null;
    }
  }
}

// Example usage
async function main() {
  const whatsapp = new PuppeteerWhatsApp({
    headless: false, // Set to true for headless mode
    devtools: true, // Set to true to open DevTools
  });

  try {
    await whatsapp.start();
  } catch (error) {
    console.error('❌ Failed to start WhatsApp session:', error);
    await whatsapp.close();
    process.exit(1);
  }
}

main();
