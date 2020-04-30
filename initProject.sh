#!/bin/sh


# Get repo name
while getopts n: option
do
  case "${option}"
    in
    n) REPO_NAME=${OPTARG};;
  esac
done

if [ -n $REPO_NAME ]; then
  # Create repo
  mkdir $REPO_NAME;

  # Create files in repo
  cd $REPO_NAME
  touch index.html
  touch script.js
  touch style.css
fi