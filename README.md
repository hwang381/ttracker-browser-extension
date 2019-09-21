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

Download the latest signed add-on's from [releases page](https://github.com/hwang381/ttracker-browser-extension/releases) instead

## Distribute from source

### Firefox
I need to export two environment variables `AMO_API_KEY` and `AMO_API_SECRET` as per suggested [here](https://github.com/mozilla/sign-addon#getting-started)
```bash
./package-firefox.sh
./sign-firefox.js
```
