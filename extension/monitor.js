setInterval(async () => {
    const windows = await browser.windows.getAll({
        populate: true
    });
    const focusedWindows = windows.filter(w => w.focused);
    if (focusedWindows.length === 0) {
        console.log("no window is focused, ignore");
        return
    }
    if (focusedWindows.length > 1) {
        console.log("more than one window is focused (why?), ignore");
        return
    }
    const focusedWindow = focusedWindows[0];
    const activeTabs = focusedWindow.tabs.filter(t => t.active);
    if (activeTabs.length === 0) {
        console.log("no tab is active, ignore");
        return
    }
    if (activeTabs.length > 1) {
        console.log("more than one tab is active (why?), ignore");
        return
    }
    const activeTab = activeTabs[0];
    const url = activeTab.url;
    try {
        await fetch('http://localhost:16789/api/ping/browser', {
            method: 'post',
            body: url
        }).then(() => {
            console.log(`pinged ${url}`)
        })
    } catch (error) {
        console.error(error)
    }
}, 1000);
