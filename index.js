const operatorsOfConcern = ["+", "-", "/", "*", "**"];

const isNodeStringy = (node) =>
  node.type === "TemplateLiteral" ||
  (node.type === "Literal" && typeof node.value === "string");

const noArithmeticRule = (context) => {
  return {
    BinaryExpression: (node) => {
      if (!operatorsOfConcern.includes(node.operator)) {
        return;
      }
      if (isNodeStringy(node.left) || isNodeStringy(node.right)) {
        return;
      }
      // we're not concerned with increment/decrement math
      if (node.right.type === "Literal" && node.right.value === 1) {
        return;
      }

      context.report({
        node,
        message:
          "Do not use raw arithmetic. Instead, use the floatSafe helpers in `~/helpers/utilities`.",
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
