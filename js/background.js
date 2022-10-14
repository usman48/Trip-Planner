chrome.runtime.onInstalled.addListener(async () => {
  chrome.scripting.unregisterContentScripts();
  for (const cs of chrome.runtime.getManifest().content_scripts) {
    for (const tab of await chrome.tabs.query({url: cs.matches})) {
      chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: cs.js,
      },
      result => {
        const lastErr = chrome.runtime.lastError;
        if (lastErr) {
          console.error('tab: ' + tab.id + ' lastError: ' + JSON.stringify(lastErr));
        }
      });
    }
  } 
});
chrome.identity.getAuthToken({ 'interactive': true }, getToken);
function getToken(token) {
  console.log('this is the token: ', token);
  chrome.storage.local.set({accessToken: token}, function() {
    console.log('Value is set to ' + token);
  });
}
