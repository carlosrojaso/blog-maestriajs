#!/bin/sh

echo 'Comenzar Build'
jekyll build --config _config.yml
echo 'Agregando Manigest'
cp manifest.json _site/manifest.json
echo 'Comenzar Deploy'
firebase deploy --only hosting
