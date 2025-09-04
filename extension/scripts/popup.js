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

    if (checked) {
      const openedTabContainers = document.body.querySelectorAll('.option-disabled');
      const openedTabCheckmarks = document.body.querySelectorAll('.sub-checkmark-disabled');
      const openedTabCheckboxes = document.body.querySelectorAll('.sub-checkbox-disabled');

      openedTabContainers.forEach((e) => e.className = 'option');
      openedTabCheckmarks.forEach((e) => e.className = 'sub-checkmark');
      openedTabCheckboxes.forEach((e) => {
        e.className = 'sub-checkbox';
        e.disabled = false;
      });
    } else {
      const openedTabContainers = document.body.querySelectorAll('.option');
      const openedTabCheckmarks = document.body.querySelectorAll('.sub-checkmark');
      const openedTabCheckboxes = document.body.querySelectorAll('.sub-checkbox');

      openedTabContainers.forEach((e) => e.className = 'option-disabled');
      openedTabCheckmarks.forEach((e) => e.className = 'sub-checkmark-disabled');
      openedTabCheckboxes.forEach((e) => {
        e.className = 'sub-checkbox-disabled';
        e.disabled = true;
      });
    }
  });
});

async function loadTabs() {
  const openedTabContainer = document.getElementById('opened-tab-container');
  
  const { researchMode = false } = await chrome.storage.local.get("researchMode");
  const { researchTabs } = await chrome.storage.local.get({ researchTabs: [] });
  const openedTabs = await chrome.tabs.query({});

  for (const tab of openedTabs) {
    if (tab.title == "New Tab" || tab.title == "Extensions") continue;

    const option = document.createElement('label');
    researchMode ? option.className = 'option' : option.className = 'option-disabled';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    (researchTabs.some(obj => obj.tabId == tab.id)) ? checkbox.checked = true : checkbox.checked = false;
    researchMode ? checkbox.className = 'sub-checkbox' : checkbox.className = 'sub-checkbox-disabled';
    researchMode ? checkbox.disabled = false : checkbox.disabled = true;
    option.appendChild(checkbox);

    const checkmark = document.createElement('span');
    researchMode ? checkmark.className = 'sub-checkmark' : checkmark.className = 'sub-checkmark-disabled'
    option.appendChild(checkmark);

    const label = document.createElement('span');
    label.innerHTML = tab.title;
    option.appendChild(label);

    checkbox.addEventListener('change', async (event) => {
      await chrome.runtime.sendMessage({
        id: "store-tab",
        body: {
          tabId: tab.id,
          checked: event.target.checked
        }
      });
    })

    openedTabContainer.appendChild(option);
  }
}

chrome.runtime.onMessage.addListener(
  async function handleMessages(message) {
    if (message.id == "refresh-tab-options") {
      if (isDocumentLoaded) await loadTabs();
    };
  }
);
