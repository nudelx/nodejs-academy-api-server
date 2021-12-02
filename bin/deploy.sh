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
echo "============================================================"
}


clear
logo
echo " 👷‍♂️  Staring Movie API Deployment "
git diff-index --quiet HEAD -- || echo " ⛔️  Uncommitted changes, please commit all your changes before deploy" && exit 
git checkout main
git pull


echo " 👷‍♂️ Running test "
if npm run test
then
  echo " 👷‍♂️ Tests are ok ✅ starting the deploy  "
  # git checkout deploy
  # git pull
  # git merge -X theirs main
  # git commit -am "version update $(date)"

  # git checkout main
else
  echo "NO !!"
fi
echo " 👷‍♂️ Tests are broken ⛔️  terminating the deployment "

# git add .
# git commit -am "new deploy $(date)"
# git push heroku deploy
