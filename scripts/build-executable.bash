#!/usr/bin/env bash

set -Ceu

bin_name="chatgpt-repl"

node --experimental-sea-config scripts/sea-config.json
cp "$(command -v node)" "${bin_name}"

npx postject "${bin_name}" NODE_SEA_BLOB sea-prep.blob --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2
