#!/usr/bin/env node
const signAddon = require('sign-addon').default;
const extensionManifest = require('./extension/manifest');
const fs = require('fs');

if (!process.env.AMO_API_KEY) {
    throw new Error("AMO_API_KEY is undefined")
}
const apiKey = process.env.AMO_API_KEY;

if (!process.env.AMO_API_SECRET) {
    throw new Error("AMO_API_SECRET is undefined")
}
const apiSecret = process.env.AMO_API_SECRET;

const unsignedPath = './ttracker-firefox.xpi';
const signedPath = './ttracker-firefox-signed.xpi';

if (!fs.existsSync(unsignedPath)) {
    throw new Error(`${unsignedPath} does not exist`)
}

if (fs.existsSync(signedPath)) {
    console.log(`Removing ${signedPath}`);
    fs.unlinkSync(signedPath)
}

signAddon({
    xpiPath: unsignedPath,
    version: extensionManifest.version,
    apiKey: apiKey,
    apiSecret: apiSecret
}).then(result => {
    if (result.success) {
        console.log("The following signed files were downloaded:");
        console.log(result.downloadedFiles);
        // TODO: assuming there is only one downloaded file lol
        fs.renameSync(result.downloadedFiles[0], signedPath)
    } else {
        console.error("Your add-on could not be signed!");
        console.error("Check the console for details.");
    }
}).catch(error => {
    console.error("Signing error:", error);
});

