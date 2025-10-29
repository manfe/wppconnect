# Puppeteer-Only WhatsApp Web Session

This example demonstrates how to create a WhatsApp Web session using only Puppeteer, without any additional WhatsApp libraries like `wpp` or `wa-js`.

## Features

- 🚀 Launch WhatsApp Web with session persistence
- 📱 QR Code detection and display
- 👂 Message monitoring
- 📤 Send messages programmatically
- 📋 Get chat list
- 🔒 Session management

## Installation

```bash
cd examples/only-puppeter
npm install
```

## Usage

### Basic Usage

```bash
npm start
```

This will:

1. Launch a Chrome browser instance
2. Navigate to WhatsApp Web
3. Show QR code for authentication (if not already logged in)
4. Set up message monitoring
5. Display recent chats
6. Keep the session alive

### Custom Configuration

You can modify the `PuppeteerWhatsApp` class initialization in `index.js`:

```javascript
const whatsapp = new PuppeteerWhatsApp({
  headless: false, // Set to true for headless mode
  devtools: false, // Set to true to open DevTools
  userDataDir: './session', // Directory to store session data
});
```

### Sending Messages

Uncomment and modify this line in `index.js`:

```javascript
await whatsapp.sendMessage('Contact Name', 'Hello from Puppeteer!');
```

## API

### PuppeteerWhatsApp Class

#### Constructor Options

- `headless` (boolean): Run browser in headless mode (default: false)
- `devtools` (boolean): Open DevTools (default: false)
- `userDataDir` (string): Directory to store session data (default: './session')

#### Methods

- `start()`: Initialize and start the WhatsApp session
- `sendMessage(contact, message)`: Send a message to a contact
- `getChats()`: Get list of recent chats
- `close()`: Close the browser session

## Session Persistence

The session data is stored in the `./session` directory. This means you only need to scan the QR code once, and subsequent runs will use the saved session.

## Notes

- This is a basic implementation for educational purposes
- WhatsApp Web may detect automation and block the session
- Use responsibly and in accordance with WhatsApp's Terms of Service
- For production use, consider implementing proper error handling and rate limiting

## Troubleshooting

1. **QR Code not displaying**: The browser window will show the QR code even if terminal display fails
2. **Session expired**: Delete the `./session` folder to start fresh
3. **Browser detection**: Try running with different user agents or browser flags

## Dependencies

- `puppeteer`: Controls the Chrome browser
- `qrcode-terminal`: Displays QR codes in the terminal (optional)
