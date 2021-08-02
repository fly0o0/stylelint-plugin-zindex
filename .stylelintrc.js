module.exports = {
  "extends": "stylelint-config-standard",
  "plugins": ["./plugin.js"],
  "rules": {
    "plugin/z-index-range-plugin": {
      "module1": [100, 199],
      "module2": [200, 299]
    }
  }
}
