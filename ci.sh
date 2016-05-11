set -e
if [ -z "$CI_PULL_REQUEST" ]
then
  npm run lint
  npm run build
  npm run cover
  cat ./coverage/lcov.info | ./node_modules/.bin/codecov
  npm run sauce
else
  npm test
fi
