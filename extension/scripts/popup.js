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

  const { tabs } = await chrome.storage.local.get({ tabs: [] });
  const tabObjects = tabs.map(async (tabId) => await chrome.tabs.get(tabId));

  for (const tab of tabObjects) {
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

chrome.storage.onChanged.addListener(async () => {
  console.log("CHANGE");
  if (isDocumentLoaded) await loadTabs();
});