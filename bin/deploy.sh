#!/usr/bin/env bash

clear
echo " 👷‍♂️  Staring Movie API Deployment "
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
