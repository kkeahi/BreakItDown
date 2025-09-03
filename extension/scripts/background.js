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

chrome.runtime.onMessage.addListener(
  async function handleMessages(message) {
    if (message.id == "store-tab") {
      console.log(message.id);
      await chrome.tabs.sendMessage(message.body.tabId, {
        id: message.id,
        body: {
          tabId: message.body.tabId,
          checked: message.body.checked
        }
      })
    }
  }
)

chrome.tabs.onCreated.addListener(async (tab) => {
  await chrome.runtime.sendMessage({ id: "refresh-tab-options" })
    .catch(() => {});
});

chrome.tabs.onRemoved.addListener(async (tabId) => {
  const { tabs } = await chrome.storage.local.get({ tabs: [] });
  const researchTabIndex = tabs.findIndex(obj => obj.tabId == tabId)

  if (researchTabIndex > -1) {
    tabs.splice(researchTabIndex, 1);
    await chrome.storage.local.set({ tabs });
  }

  await chrome.runtime.sendMessage({ id: "refresh-tab-options" })
    .catch(() => {});
});