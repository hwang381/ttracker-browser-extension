# ttracker-browser-extension
Browser extension for pushing browser events to [ttracker](https://github.com/hwang381/ttracker)

## Prerequisites
* `Node.js`
* `yarn`

```bash
yarn install
```

## Build from source

### Firefox
Too hard `¯\_(ツ)_/¯`

Mozilla requires add-on's to be signed before they can be permanently installed on a stable version of Firefox.

Instead, download the latest signed add-on's (`.xpi` file) from [releases page](https://github.com/hwang381/ttracker-browser-extension/releases)

## Distribute from source

### Firefox
```bash
./package-firefox.sh
# Then go to https://addons.mozilla.org/en-us/developers/addons and upload ttracker-firefox-unsigned.xpi
```
