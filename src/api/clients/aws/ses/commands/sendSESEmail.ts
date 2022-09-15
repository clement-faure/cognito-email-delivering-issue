import { SendEmailCommand, SendEmailCommandInput } from "@aws-sdk/client-ses";

import { SESClient } from "~/api/clients/aws/clients";

import { getSleepDuration, sleep } from "~/api/clients/aws/ses/utils";

const sendSESEmail = async ({
  to,
  subject,
  message,
}: {
  to: string;

  subject: string;
  message: string;
}) => {
  const sendEmailParams: SendEmailCommandInput = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: message,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: process.env.AWS_SES_FROM!,
  };

  const command = new SendEmailCommand(sendEmailParams);

  let currentTry = 0;
  let maxRetries = 10;

  while (currentTry < maxRetries) {
    try {
      currentTry++;
      await SESClient.send(command);
      break;
    } catch (error) {
      if (currentTry === maxRetries) {
        // All retries failed, throw error
        throw error;
      } else if (
        error.code === "Throttling" &&
        error.message === "Maximum sending rate exceeded."
      ) {
        const backOffDuration = getSleepDuration(currentTry, 10, 5000);
        await sleep(backOffDuration);
      } else {
        throw error;
      }
    }
  }

  return;
};

export default sendSESEmail;
