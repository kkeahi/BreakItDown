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
  const researchTabs = await chrome.storage.local.get({ researchTabs: [] });
  console.log(researchMode);

  let response;
  if (researchMode && researchTabs) {
    const researchTabs = await chrome.storage.local.get({ researchTabs: [] });
    response = await fetchData('/research', { subject: info.selectionText, tabContext: researchTabs })
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
  const { researchTabs } = await chrome.storage.local.get({ researchTabs: [] });
  const researchTabIndex = researchTabs.findIndex(obj => obj.tabId == tabId)

  if (researchTabIndex > -1) {
    researchTabs.splice(researchTabIndex, 1);
    await chrome.storage.local.set({ researchTabs });
  }

  await chrome.runtime.sendMessage({ id: "refresh-tab-options" })
    .catch(() => {});
});