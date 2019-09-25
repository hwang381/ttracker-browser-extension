let gen = 0;
let firstNoFocus = true;

setInterval(async () => {
    const windows = await browser.windows.getAll({
        populate: true
    });
    const focusedWindows = windows.filter(w => w.focused);
    if (focusedWindows.length === 0) {
        console.log("no window is focused, ignore");
        if (firstNoFocus) {
            console.log("first no focus, switching gen for next batch of pings");
            gen = gen === 0 ? 1 : 0;
            firstNoFocus = false
        }
        return
    }
    firstNoFocus = false;
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
    if (url.startsWith("about")) {
        console.log("an url starts with about, ignore");
        return
    }
    try {
        await fetch('http://localhost:16789/api/ping/browser', {
            method: 'post',
            body: JSON.stringify({
                // TODO: parse out only the host for better privacy
                url: url,
                gen: gen
            })
        }).then(() => {
            console.log(`pinged ${url}`)
        })
    } catch (error) {
        console.error(error)
    }
}, 1000);
