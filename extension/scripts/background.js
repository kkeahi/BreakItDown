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

chrome.tabs.onCreated.addListener(async (tab) => {
  const { tabs } = await chrome.storage.local.get({ tabs: [] });
  tabs.push(tab.id);
  await chrome.storage.local.set({ tabs });

  console.log(tabs);
});

chrome.tabs.onRemoved.addListener(async (tabId) => {
  const { tabs } = await chrome.storage.local.get({ tabs: [] });

  if (!tabs.includes(tabId)) {
    console.warn(tabId, " not in openedTabs local storage.");
    return;
  }

  tabs.splice(tabs.indexOf(tabId), 1);
  await chrome.storage.local.set({ tabs });

  console.log(tabs);
});