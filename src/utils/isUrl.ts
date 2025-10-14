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

/**
 * Check if a string is a valid HTTP or HTTPS URL
 * @param url The string to check
 * @returns true if the string is a valid HTTP/HTTPS URL, false otherwise
 */
export function isUrl(url: string): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }

  const trimmedUrl = url.trim();

  // Fast early return for obviously non-HTTP/HTTPS URLs
  // This avoids expensive URL parsing for base64 data, data URLs, etc.
  if (!/^https?:\/\//i.test(trimmedUrl)) {
    return false;
  }

  try {
    const urlObject = new URL(trimmedUrl);
    return urlObject.protocol === 'http:' || urlObject.protocol === 'https:';
  } catch {
    return false;
  }
}
