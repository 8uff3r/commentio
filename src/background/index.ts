import Browser, { Tabs } from 'webextension-polyfill'
import { onMessage, sendMessage } from 'webext-bridge/background'

// Function to check if the current browser is support chrome.sidePanel
function isChromePanel() {
  return (
    typeof chrome !== 'undefined' && typeof chrome.sidePanel !== 'undefined'
  )
}

// Execute Firefox-specific code
if (isFirefox) {
  Browser.action.onClicked.addListener(function () {
    Browser.sidebarAction.toggle()
  })
}

// Execute Chrome-specific code
if (isChromePanel()) {
  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error))
}

chrome.runtime.onInstalled.addListener(async (opt) => {
  // Check if reason is install or update. Eg: opt.reason === 'install' // If extension is installed.
  // opt.reason === 'update' // If extension is updated.
  if (opt.reason === 'install') {
    await chrome.storage.local.clear()

    chrome.tabs.create({
      active: true,
      // Open the setup page and append `?type=install` to the URL so frontend
      // can know if we need to show the install page or update page.
      url: chrome.runtime.getURL('./src/setup/index.html?type=install'),
    })
  }

  if (opt.reason === 'update') {
    chrome.tabs.create({
      active: true,
      url: chrome.runtime.getURL('./src/setup/index.html?type=update'),
    })
  }
})

//FIXME: webext-bridge doesn't support sidePanel yet

// let previousTabId = 0
// browser.tabs.onUpdated.addListener(async (tabId) => {
//   if (!previousTabId) {
//     previousTabId = tabId
//     return
//   }
//
//   let tab: Tabs.Tab
//
//   try {
//     tab = await browser.tabs.get(previousTabId)
//     previousTabId = tabId
//   } catch {
//     return
//   }
//
//   sendMessage(
//     'get-current-url',
//     { title: tab?.title ?? '', url: tab?.url ?? '' },
//     { context: 'content-script', tabId }
//   )
// })
// onMessage('get-current-url', async () => {
//   try {
//     const tab = await browser.tabs.get(previousTabId)
//     return {
//       url: tab?.url,
//       title: tab?.title,
//     }
//   } catch {
//     return {
//       title: undefined,
//       url: undefined,
//     }
//   }
// })
// export {}
