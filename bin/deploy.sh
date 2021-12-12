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
  echo " 👷‍♂️  Pushing to Heroku"
  git add .
  git commit -am "new deploy $(date)"
  # git push heroku deploy-dev:main
  git push -f heroku deploy-dev:main
}

clear
logo
echo " 👷‍♂️  Staring Movie API Deployment "

echo " 👷‍♂️  Running test "
if npm run test
then
  echo " 👷‍♂️  Tests are ok ✅ starting the deploy  "
  start_deploy
else
  echo " ⛔️ Tests are broken terminating the deployment "
fi
