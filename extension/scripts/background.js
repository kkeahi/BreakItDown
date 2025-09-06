const backendUrl = "http://localhost:8080"

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "main",
    title: "Break it down",
    contexts: ["selection"],
  });
});

async function fetchData(endpoint, payload) {
  const body = JSON.stringify(payload);
  console.log(`${backendUrl}/api${endpoint}`);

  try {
    const response = await fetch(`${backendUrl}/api${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    });

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data = await response.json();
    return data.response;

  } catch (err) {
    console.error("Fetch error: ", err); // make sure backend is running
    console.error(`Fetch: ${backendUrl}/api${endpoint}`);
    return "An error occurred.";
  }
}

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId != "main") {
    return;
  }

  await chrome.tabs.sendMessage(tab.id, {
    id: "show-modal"
  });

  const { researchMode = false } = await chrome.storage.local.get('researchMode');
  const { tabs = [] } = await chrome.storage.local.get({ tabs: [] });

  let response;
  if (researchMode) {
    console.log({ subject: info.selectionText, tabs });
    response = await fetchData('/research', { subject: info.selectionText, tabs}) // implement /research next
  } else {
    response = await fetchData('/breakitdown', { subject: info.selectionText });
  }
    
  await chrome.tabs.sendMessage(tab.id, {
    id: "explanation",
    body: response
  });
});

chrome.runtime.onMessage.addListener(
  async function handleMessages(message) {
    if (message.id == "store-tab") {
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