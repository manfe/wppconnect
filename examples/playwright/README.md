# WPPConnect with Playwright Example

This example demonstrates how to use WPPConnect with Playwright instead of Puppeteer.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Run the example:

```bash
npm start
```

## Configuration

The key difference from the basic example is setting `usePlaywright: true` in the configuration:

```javascript
wppconnect.create({
  headless: false,
  useChrome: false,
  usePlaywright: true, // Enable Playwright instead of Puppeteer
});
```

## Benefits of Using Playwright

- Better cross-browser support (Chrome, Firefox, Safari)
- More reliable automation APIs
- Better handling of modern web features
- Improved performance and stability
