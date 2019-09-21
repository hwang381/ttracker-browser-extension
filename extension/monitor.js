let lastUrl;

setInterval(async () => {
    const windows = await browser.windows.getAll();
    if (windows.filter(w => w.focused).length === 0) {
        console.log("no window is focused, ignore");
        lastUrl = undefined;
        return
    }

    const activeTabs = await browser.tabs.query({
        currentWindow: true,
        active: true
    });
    if (activeTabs.length !== 1) {
        console.error("there is not one active tab??");
        return
    }
    const activeTab = activeTabs[0];

    const url = activeTab.url;
    console.log(url);
    if (url.startsWith("about")) {
        return
    }
    if (url === lastUrl) {
        return
    }
    try {
        await fetch('http://127.0.0.1:16789/api/event/browser_tab_focus', {
            method: 'post',
            body: url
        })
    } catch (error) {
        console.error(error)
    }
    lastUrl = url
}, 1000);
