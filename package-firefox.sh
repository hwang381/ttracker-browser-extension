#!/usr/bin/env bash

set -e

rm -f ./ttracker-firefox-unsigned.xpi
pushd ./extension
zip -r -FS ../ttracker-firefox-unsigned.xpi *
popd
