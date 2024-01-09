var connectionId;

// Connect to the Arduino
chrome.serial.connect("/dev/ttyACM0", {bitrate: 9600}, function(connectionInfo) {
  connectionId = connectionInfo.connectionId;
});

// Listen for messages from the extension
chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
  var url = request.url;
  chrome.serial.send(connectionId, str2ab(url + '\n'), function() {});

  // Listen for data from the Arduino and send it back to the extension
  chrome.serial.onReceive.addListener(function(info) {
    if (info.connectionId == connectionId) {
      var str = ab2str(info.data);
      sendResponse({data: str});
    }
  });
});

// Helper functions for converting between strings and ArrayBuffers
function str2ab(str) {
  var buf = new ArrayBuffer(str.length);
  var bufView = new Uint8Array(buf);
  for (var i=0; i<str.length; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}