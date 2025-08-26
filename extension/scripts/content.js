const axios = require('axios')

function test() {
  console.log("clicked context menu");
}

chrome.runtime.onInstalled.addListener(async () => {
  chrome.contextMenus.create({
    id: "main",
    title: "Break it down",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "main") {
    console.log("clicked context menu");
    console.log("Selected text:", info.selectionText);

    axios.post('/breakdown')
      .then((response) => {
        console.log("frontend: ", response);
      })
      .catch((e) => {
        console.log("error: ", e);
      })
  }
});