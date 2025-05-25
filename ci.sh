#!/bin/bash

set -e # Terminates script at the first error

npm run build
npm run check
npm run compile:check
