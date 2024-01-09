let isConnected = false;

chrome.runtime.onConnectExternal.addListener((port) => {
  isConnected = true;
  port.onDisconnect.addListener(() => {
    isConnected = false;
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.active) {
    let url = tab.url;
    console.log(url);
    chrome.runtime.sendMessage('obimfclpjhcfcajipogicmlhabhbagki', {url: url, isConnected: isConnected}, (response) => {
      console.log(response.data);
    });
  }
});
