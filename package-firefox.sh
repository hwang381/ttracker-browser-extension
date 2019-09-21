#!/usr/bin/env bash

set -e

rm -f ./ttracker-firefox.xpi
pushd ./extension
zip -r -FS ../ttracker-firefox.xpi *
popd
