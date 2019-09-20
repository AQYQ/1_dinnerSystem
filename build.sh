#!/bin/bash -ilex
ng config -g cli.warnings.versionMismatch false
npm install
ng build --prod
