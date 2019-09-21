#!/usr/bin/env bash

set -e

rm -f ./ttracker-firefox.xip
pushd ./extension
zip -r -FS ../ttracker-firefox.xip *
popd
