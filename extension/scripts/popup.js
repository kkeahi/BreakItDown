const researchModeButton = document.getElementById('research-mode-checkbox-id');

try {
  researchModeButton.addEventListener('change', function() {
    const checked = this.checked ? true : false;

    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {
          id: "research-mode",
          body: checked
        });
    });
  });
} catch (err) {
  throw new Error("Popup error: ", err);
}