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
    console.log("Selected text:", info.selectionText);

    try {
      const response = await fetch(`${backendUrl}/api/breakitdown`, {
        method: 'POST',

        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: info.selectionText
        })
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response: ", data);
    } catch (e) {
      console.error("Failed to simplify text: ", e);
    }
  }
});