let prevUrl = "";
const header = "https://en.openrussian.org/ru/";

function handleUpdated(tabId, changeInfo, tabInfo) {
  const url = tabInfo.url;
  if (url.length >= header.length && url.substring(0, header.length) === header) {
    console.log("cur url: ", url);
    if (prevUrl != url) {
      console.log("running script");
      prevUrl = url;
      chrome.scripting
    .executeScript({  // quick fix for unloaded elements
      target : {tabId : tabId},
      files : [ "scripts/reload.js" ],
    });
    }
  }
}

chrome.tabs.onUpdated.addListener(handleUpdated);