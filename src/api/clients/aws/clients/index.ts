import { CognitoIdentityProviderClient as AwsCognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import { SESClient as AwsSESClient } from "@aws-sdk/client-ses";

export const cognitoClient = new AwsCognitoIdentityProviderClient({
  region: process.env.AWS_COGNITO_REGION,
  credentials: {
    accessKeyId: process.env.AWS_IAM_COGNITO_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_IAM_COGNITO_ACCESS_KEY_SECRET!,
  },
});

export const SESClient = new AwsSESClient({
  region: process.env.AWS_SES_REGION,
  credentials: {
    accessKeyId: process.env.AWS_IAM_SES_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_IAM_SES_ACCESS_KEY_SECRET!,
  },
});
