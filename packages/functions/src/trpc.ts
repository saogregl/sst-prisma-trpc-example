import { initTRPC } from "@trpc/server";
import { z } from "zod";
import {
  CreateAWSLambdaContextOptions,
  awsLambdaRequestHandler,
} from "@trpc/server/adapters/aws-lambda";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import prisma from "./prisma";

export const t = initTRPC.create();
const appRouter = t.router({
  getUser: t.procedure.input(z.number()).query((opts) => {
    opts.input; // string
    return prisma.user.findUnique({
      where: {
        id: opts.input,
      },
    });
  }),
});

const createContext = ({
  event,
  context,
}: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2>) => ({}); // no context
type Context = Awaited<ReturnType<typeof createContext>>;
export const handler = awsLambdaRequestHandler({
  router: appRouter,
  createContext,
});

// export type definition of API
export type AppRouter = typeof appRouter;
