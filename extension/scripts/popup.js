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

  const tabs = await chrome.tabs.query({});

  for (const tab of tabs) {
    if (tab.title == "New Tab") continue;

    const option = document.createElement('label');
    option.className = 'option';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    option.appendChild(checkbox);

    const checkmark = document.createElement('span');
    checkmark.className = 'sub-checkmark';
    option.appendChild(checkmark);

    const label = document.createElement('span');
    label.innerHTML = tab.title;
    option.appendChild(label);

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
