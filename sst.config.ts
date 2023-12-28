import { SSTConfig } from "sst";
import { API } from "./stacks/MyStack";

export default {
  config(_input) {
    return {
      name: "my-serverless-app",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(API);
  },
} satisfies SSTConfig;
