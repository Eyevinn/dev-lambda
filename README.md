[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Slack](http://slack.streamingtech.se/badge.svg)](http://slack.streamingtech.se)

Helper classes when developing AWS Lambda functions

## Local ELB triggered Lambda

Uses Fastify to setup a local endpoint to emulate ELB triggered events.

```javascript
const { LambdaELB } = require("@eyevinn/dev-lambda");

const handler = async (event) => {
  console.log(event);
  return { statusCode: 204 };
}

(new LambdaELB({ handler })).run();
```

# About Eyevinn Technology

Eyevinn Technology is an independent consultant firm specialized in video and streaming. Independent in a way that we are not commercially tied to any platform or technology vendor.

At Eyevinn, every software developer consultant has a dedicated budget reserved for open source development and contribution to the open source community. This give us room for innovation, team building and personal competence development. And also gives us as a company a way to contribute back to the open source community.

Want to know more about Eyevinn and how it is to work here. Contact us at work@eyevinn.se!