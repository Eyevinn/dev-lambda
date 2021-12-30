const { LambdaELB } = require("./dist/index.js");

const handler = async (event) => {
  console.log(event);
  return { statusCode: 204 };
}

(new LambdaELB({ handler })).run();