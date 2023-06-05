# Todo API with Klotho

## Prerequisites

https://klo.dev/docs/tutorials/deploying/

- Docker
- Node.js 16.x + (& NPM)
- AWS CLI

  - An AWS account, set up with either:

    - The `AWS_ACCESS_KEY_ID` & `AWS_SECRET_ACCESS_KEY` environment variables for `a user`
    - OR, `$HOME/.aws/credentials` (eg. via AWS CLI: `aws configure`) setup

- Pulumi CLI

  ```sh
  pulumi login --local
  export PULUMI_CONFIG_PASSPHRASE=""
  ```

## Compile and Deploy with Klotho

From the `root directory`, run the terminal commands:

```sh
# Compile the app
npm install
npx tsc
klotho . --app todo-api -p aws

cd compiled

# If you didn't set the aws region as indicated in the compiler output, do that now
pulumi config set aws:region YOUR_REGION -s todo-api

npm install

# Deploy
pulumi up -s todo-api

# Outputs: {
#   apiUrl: 'https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/'
# }

```

Remember the `apiUrl`.

## Calling your service

`test.ts`

```ts
...
const baseUrl = 'https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/';
...
```

From the `root directory`, run the terminal commands:

```sh
npm run test
```

Your first API call will probably take a long time.

```sh
 PASS  ./test.ts (7.554 s)
  Task API tests
    ✓ Create a task (6358 ms)
    ✓ Get all tasks (97 ms)
```

From the second request onward, things should be fine.

```sh
 PASS  ./test.ts
  Task API tests
    ✓ Create a task (81 ms)
    ✓ Get all tasks (51 ms)
```

## Clean Up

From the `compiled directory`

```sh
# Tear down when done
pulumi destroy -s todo-api
```
