export function getLang(key: string) {
  return chrome && chrome.i18n ? chrome.i18n.getMessage(key) : key;
}
