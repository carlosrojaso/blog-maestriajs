#!/bin/sh
echo 'Comenzar Build'
jekyll build --config _config.yml
echo 'Comenzar Deploy'
firebase deploy --only hosting
