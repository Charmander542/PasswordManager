chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  document.getElementById('data').textContent = request.data;
  document.getElementById('status').textContent = request.isConnected ? 'Connected to the app' : 'Not connected to the app';
});