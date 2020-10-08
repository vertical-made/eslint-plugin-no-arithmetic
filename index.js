const operatorsOfConcern = ["+", "-", "/", "*", "**"];

const isNodeStringy = (node) =>
  node.type === "TemplateLiteral" ||
  (node.type === "Literal" && typeof node.value === "string");

const defaultMessage = "use float-safe alternatives";

const noArithmeticRule = (context) => {
  const config = context.options[0] || {};
  return {
    BinaryExpression: (node) => {
      if (!operatorsOfConcern.includes(node.operator)) {
        return;
      }
      if (isNodeStringy(node.left) || isNodeStringy(node.right)) {
        return;
      }
      // we're not concerned with increment/decrement math
      if (
        config.ignoreIteratorLike !== false &&
        (node.operator === "+" || node.operator === "-") &&
        node.right.type === "Literal" &&
        node.right.value === 1
      ) {
        return;
      }

      let message = config.message || defaultMessage;
      context.report({
        node,
        message: `Do not use raw arithmetic. Instead, ${message}.`,
      });
    },
    AssignmentExpression: (node) => {
      if (!operatorsOfConcern.includes(node.operator.slice(0, -1))) {
        return;
      }
      if (
        config.ignoreIteratorLike !== false &&
        (node.operator === "+=" || node.operator === "-=") &&
        node.right.type === "Literal" &&
        node.right.value === 1
      ) {
        return;
      }
      let message = config.message || defaultMessage;
      context.report({
        node,
        message: `Do not use raw arithmetic. Instead, ${message}.`,
      });
    },
  };
};

module.exports = {
  rules: {
    "no-arithmetic": {
      create: noArithmeticRule,
    },
  },
};
