module.exports = {
  "diff": true,
  "extension": ["ts"],
  "package": "./package.json",
  "slow": "75",
  "timeout": "0",
  "spec": ["test/**/*.spec.ts"],
  "ui": "bdd",
  "watch-files": ["test/**/*.js"],
  "require": ["dotenv/config","ts-node/register", "tsconfig-paths/register"]
}