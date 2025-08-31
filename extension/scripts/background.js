const backendUrl = "http://localhost:8080"

chrome.runtime.onInstalled.addListener(async () => {
  chrome.contextMenus.create({
    id: "main",
    title: "Break it down",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["scripts/content.js"]
  });


  if (info.menuItemId === "main") {
    try {
      const response = await fetch(`${backendUrl}/api/breakitdown`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: info.selectionText
        })
      });

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      const data = await response.json();
      // console.log("API Response: ", data);


    } catch (e) {
      console.error("Failed to simplify text: ", e);
    }
  }
});