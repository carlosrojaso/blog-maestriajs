#!/bin/sh
echo 'Comenzar Build'
jekyll build --config _config.xml
echo 'Comenzar Deploy'
firebase deploy --only hosting
