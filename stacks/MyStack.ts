import { StackContext, Api, EventBus, RDS, Config } from "sst/constructs";
import fs from "fs-extra";
import path from "node:path";

import * as lambda from "aws-cdk-lib/aws-lambda";

function preparePrismaLayerFiles() {
  const layerPath = "./layers/prisma";
  fs.rmSync(layerPath, { force: true, recursive: true });
  fs.mkdirSync(layerPath, { recursive: true });
  const files = [
    "node_modules/.prisma",
    "node_modules/@prisma/client",
    "node_modules/prisma/build",
  ];
  for (const file of files) {
    // Do not include binary files that aren't for AWS to save space
    fs.copySync(file, path.join(layerPath, "nodejs", file), {
      filter: (src) => !src.endsWith("so.node") || src.includes("rhel"),
    });
  }
}

export function API({ stack }: StackContext) {
  preparePrismaLayerFiles();
  const PrismaLayer = new lambda.LayerVersion(stack, "PrismaLayer", {
    description: "Prisma layer",
    code: lambda.Code.fromAsset("./layers/prisma"),
  });

  // const DATABASE_URL = new Config.Secret(stack, process.env.DATABASE_URL!);

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        runtime: "nodejs20.x",
        environment: {
          // TODO: Can I move this to sst config?
          DATABASE_URL: process.env.DATABASE_URL!,
        },
        nodejs: {
          esbuild: {
            external: ["@prisma/client", ".prisma"],
          },
        },
        layers: [PrismaLayer],
      },
    },
    routes: {
      "ANY /trpc/{proxy+}": "packages/functions/src/trpc.handler",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
