# ttracker-browser-extension
Browser extension for pushing browser events to [ttracker](https://github.com/hwang381/ttracker)

## Prerequisites
* `Node.js`
* `yarn`

## Develop
```bash
yarn install
```

## Build Firefox extension from source
You will need to export two environment variables `AMO_API_KEY` and `AMO_API_SECRET` as per suggested [here](https://github.com/mozilla/sign-addon#getting-started)
```bash
./package-firefox.sh
./sign-firefox.js
```
