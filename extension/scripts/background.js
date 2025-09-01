const backendUrl = "http://localhost:8080"

chrome.runtime.onInstalled.addListener(async () => {
  chrome.contextMenus.create({
    id: "main",
    title: "Break it down",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "main") {

    await chrome.tabs.sendMessage(tab.id, {
      id: "show-modal"
    });

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
      
      await chrome.tabs.sendMessage(tab.id, {
        id: "explanation",
        body: data.response
      });

    } catch (err) {
      console.error("Failed to simplify text: ", err);
    }
  }
});

