let lastUrl

function newUrl(url) {
    if (url.startsWith("about")) {
        return
    }
    if (url === lastUrl) {
        return
    }
    fetch('http://127.0.0.1:16789/api/event/browser_tab_focus', {
        method: 'post',
        body: url
    }).catch(function (error) {
        console.error(error)
    })
    lastUrl = url
}

browser.tabs.onActivated.addListener(async function (activateInfo) {
    try {
        const tabInfo = await browser.tabs.get(activateInfo.tabId);
        newUrl(tabInfo.url)
    } catch (error) {
        console.error(error)
    }
})

// needed when a new tab is created
browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tabInfo) {
    if (tabInfo.status && tabInfo.status === 'loading') {
        newUrl(tabInfo.url)
    }
})

browser.windows.onFocusChanged.addListener(async function (windowId) {
    if (windowId !== -1) {
        try {
            const windowInfo = await browser.windows.get(windowId, {
                "populate": true
            })
            const activeTabs = windowInfo.tabs.filter(function (tab) {
                return tab.active
            })
            if (activeTabs.length != 1) {
                throw new Error("not 1 active tab")
            }
            const activeTab = activeTabs[0]
            newUrl(activeTab.url)
        } catch (error) {
            console.error(error)
        }
    }
})