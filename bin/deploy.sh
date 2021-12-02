#!/usr/bin/env bash

clear
echo " 👷‍♂️ Staring Movie API Deploy"
git checkout main
git pull
git checkout deploy
git pull
git merge -X theirs main
git commit -am "version update $(date)"
npm run test
echo " bla bla $? " 

# git add .
# git commit -am "new deploy $(date)"
# git push heroku deploy

git checkout main