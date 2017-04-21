#!/bin/sh
echo 'Comenzar Build'
jekyll build 
echo 'Comenzar Deploy'
firebase deploy --only hosting
