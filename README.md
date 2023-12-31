# sst-prisma-trpc-example

This repository contains a serverless application built with TypeScript and managed with npm and pnpm. The application uses the [SST](https://sst.dev/) to manage the application infrastructure and [Prisma](https://www.prisma.io/) for database access. The application also uses [trpc](https://trpc.io/) for type-safe API calls.

## Structure

The project is organized into several directories:

- `packages/core`: This directory contains core business logic for the application. This wasn't used since this repo is just a demo of how to use trpc and prisma.
- `packages/functions`: This directory contains serverless functions for the application, including event handling and Prisma database access.
- `layers/prisma`: This directory contains the Prisma client for database access.
- `prisma`: This directory contains the Prisma schema for the application's database.
- `stacks`: This directory contains the AWS CDK stack definition for the application.

## Usage

To use this application, you'll need to have Node.js, npm, and pnpm installed on your machine.

1. Clone the repository to your local machine.
2. Navigate to the project directory.

3. Create a .env file in the project directory with the following contents:

```
DATABASE_URL="YOUR_DATABASE_URL_HERE"
```

5. Change the schema in `prisma/schema.prisma` to match your database schema.
6. Run `pnpm prisma generate` to generate the Prisma client.
7. Run `pnpm install` to install the project dependencies.
8. Run `pnpm sst dev` to start the application.

Please note that you may need to configure your AWS credentials and region before you can deploy the application.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under the terms of the MIT license.
