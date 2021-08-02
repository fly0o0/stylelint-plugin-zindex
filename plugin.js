const stylelint = require('stylelint');
const ruleName = 'plugin/z-index-range-plugin';

function rule(options) {
  return function (cssRoot, result) {

    cssRoot.walkDecls('z-index', function (decl) {
      // 遍历路径
      const path = decl.source.input.file
      // 提取文件路径里的模块信息
      const match = path.match(/module\d/)
      // 获取文件夹
      const folder = match?.[0]
      // 获取z-index的值
      const value = Number(decl.value);
      // 获取设定的最大值、最小值
      const params = {
        min: options?.[folder]?.[0],
        max: options?.[folder]?.[1],
      }

      if (params.max && Math.abs(value) > params.max) {
        stylelint.utils.report({
          ruleName,
          result,
          node: decl,
          message: `Expected z-index to have maximum value of ${params.max}.`
        });
      }

      if (params.min && Math.abs(value) < params.min) {
        stylelint.utils.report({
          ruleName,
          result,
          node: decl,
          message: `Expected z-index to have minimum value of ${params.min}.`
        });
      }
    });
  };
}

module.exports = stylelint.createPlugin(
  ruleName,
  rule
);

module.exports.ruleName = ruleName;