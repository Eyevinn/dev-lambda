import fastify, { FastifyInstance } from "fastify";
import { ALBHandler, ALBResult, ALBEvent, ALBEventHeaders } from "aws-lambda";
import Debug from "debug";

const debug = Debug("lambda-dev");

interface AWSLambda {
  handler: (event: ALBEvent) => Promise<ALBResult>
}

export class LambdaELB {
  private server: FastifyInstance;

  constructor(lambda: AWSLambda) {
    this.server = fastify();
    this.server.get("*", async (request, reply) => {
      debug(request.url);
      let params = {};
      const [ path, queryString ] = request.url.split("?");
      if(queryString) {
        for (let pair of queryString.split("&")) {
          const [k, v] = pair.split("=");
          params[k] = v;
        }
      }
      let headers: ALBEventHeaders;
      const requestHeaders = request.headers;
      if (requestHeaders) {
        headers = {};
        Object.keys(requestHeaders).map(header => {
          headers[header] = <string>requestHeaders[header];
        });
      }

      const event: ALBEvent = {
        requestContext: {
          elb: { targetGroupArn: "FAKEARN" }
        },
        path: path,
        httpMethod: request.method,
        headers: headers,
        queryStringParameters: params,
        isBase64Encoded: false,
        body: request.body !== null ? JSON.stringify(request.body) : undefined,
      };
      const response = await lambda.handler(event);
      debug(response);
      reply
      .code(response.statusCode)
      .headers(response.headers ? response.headers : {})
      .send(response.body ? response.body : "");
    });
  }

  run() {
    this.server.listen(process.env.PORT || 8000, "0.0.0.0", (err, address) => {
      console.log(`Server listening at ${address}`);
    });
  }
}