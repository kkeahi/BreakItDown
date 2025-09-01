document.addEventListener("DOMContentLoaded", async () => {
  const researchModeButton = document.getElementById('research-mode-checkbox-id');

  const { researchMode = false } = await chrome.storage.local.get('researchMode');
  researchModeButton.checked = !!researchMode;

  researchModeButton.addEventListener('change', async (event) => {
    const checked = event.target.checked;
    await chrome.storage.local.set({ researchMode: checked });

    chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {
          id: "research-mode",
          body: checked
        });
    });
  });
});