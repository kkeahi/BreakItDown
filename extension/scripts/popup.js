let isDocumentLoaded = false;

document.addEventListener("DOMContentLoaded", async () => {
  isDocumentLoaded = true;

  const researchModeButton = document.getElementById('research-mode-checkbox');

  const { researchMode = false } = await chrome.storage.local.get('researchMode');
  researchModeButton.checked = !!researchMode;

  await loadTabs();

  researchModeButton.addEventListener('change', async (event) => {
    const checked = event.target.checked;
    await chrome.storage.local.set({ researchMode: checked });
  });
});

async function loadTabs() {
  const resourceOptions = document.getElementById('resource-options');
  
  const { researchTabs } = await chrome.storage.local.get({ researchTabs: [] });
  const openedTabs = await chrome.tabs.query({});

  for (const tab of openedTabs) {
    if (tab.title == "New Tab" || tab.title == "Extensions") continue;

    const option = document.createElement('label');
    option.className = 'option';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    if (researchTabs.some(obj => obj.tabId == tab.id)) checkbox.checked = true;
    option.appendChild(checkbox);

    const checkmark = document.createElement('span');
    checkmark.className = 'sub-checkmark';
    option.appendChild(checkmark);

    const label = document.createElement('span');
    label.innerHTML = tab.title;
    option.appendChild(label);

    checkbox.addEventListener('change', async (event) => {
      const { researchMode = false } = await chrome.storage.local.get("researchMode");

      if (researchMode == false) {
        checkbox.checked = !(checkbox.checked);
        return;
      }

      await chrome.runtime.sendMessage({
        id: "store-tab",
        body: {
          tabId: tab.id,
          checked: event.target.checked
        }
      });
    })

    resourceOptions.appendChild(option);
  }
}

chrome.runtime.onMessage.addListener(
  async function handleMessages(message) {
    if (message.id == "refresh-tab-options") {
      if (isDocumentLoaded) await loadTabs();
    };
  }
);
