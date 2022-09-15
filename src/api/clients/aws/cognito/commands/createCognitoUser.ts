import {
  AdminCreateUserCommand,
  AdminCreateUserCommandInput,
} from "@aws-sdk/client-cognito-identity-provider";

import { cognitoClient } from "~/api/clients/aws/clients";

const createCognitoUser = async ({ email }: { email: string }) => {
  const params: AdminCreateUserCommandInput = {
    UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
    Username: email,
    DesiredDeliveryMediums: ["EMAIL"],
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
      {
        Name: "email_verified",
        Value: "true",
      },
    ],
  };

  const command = new AdminCreateUserCommand(params);
  return cognitoClient.send(command);
};

export default createCognitoUser;
