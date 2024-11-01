#!/bin/bash

set -e # Terminates script at the first error

npm run build
npm run compile:check
npm run format:check
npm run lint
