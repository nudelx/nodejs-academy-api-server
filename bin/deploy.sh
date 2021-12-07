#!/usr/bin/env bash

function logo () {
echo "
  __  __            _           _    ____ ___     
 |  \/  | _____   _(_) ___     / \  |  _ \_ _|    
 | |\/| |/ _ \ \ / / |/ _ \   / _ \ | |_) | |     
 | |  | | (_) \ V /| |  __/  / ___ \|  __/| |     
 |_|  |_|\___/ \_/ |_|\___| /_/   \_\_|  |___|    
  ____                                   _   ___  
 / ___|  ___ _ ____   _____ _ __  __   _/ | / _ \ 
 \___ \ / _ \ '__\ \ / / _ \ '__| \ \ / / || | | |
  ___) |  __/ |   \ V /  __/ |     \ V /| || |_| |
 |____/ \___|_|    \_/ \___|_|      \_/ |_(_)___/                                              
"
echo "=================================================="
echo "" && echo ""
}

function start_deploy () {
  echo " 👷‍♂️  Merging the main branch"
    # git checkout main
# git pull
# #  # git checkout deploy
# #   # git pull
# #   # git merge -X theirs main
# #   # git commit -am "version update $(date)"
# #   # git checkout main
  push_to_heroku  
}

function uncommitted () {
  echo " ⛔️   Uncommitted changes, please commit all your changes before the deploy"
  exit 
}

function push_to_heroku () {
  echo "👷‍♂️  Pushing to Heroku"
  git add .
  git commit -am "new deploy $(date)"
  # git push heroku deploy-dev:main
  git push -f heroku deploy-dev:master 
}

clear
logo
echo " 👷‍♂️  Staring Movie API Deployment "
# git diff-index --quiet HEAD -- || uncommitted

echo " 👷‍♂️  Running test "
if npm run test
then
  echo " 👷‍♂️  Tests are ok ✅ starting the deploy  "
  start_deploy
else
  echo " ⛔️ Tests are broken terminating the deployment "
fi
