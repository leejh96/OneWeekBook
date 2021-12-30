const { development, test, production, node_env } = require("./config");
let key;
if (node_env === "test") {
  key = test;
} else if (node_env === "production") {
  key = production;
} else {
  key = development;
}
module.exports = key;
