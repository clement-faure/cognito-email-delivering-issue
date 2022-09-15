import { Resolvers } from "./resolvers-types";

import { createCognitoUser } from "~/api/clients/aws/cognito";
import { sendSESEmail } from "~/api/clients/aws/ses";

const resolvers: Resolvers = {
  Query: {
    user(_parent, _args, _context, _info) {
      return {
        email: "test@gmail.com",
      };
    },
  },
  Mutation: {
    async importUsers(_parent, _args, _context, _info) {
      // Populate this array with all users emails
      const userEmailsToImport = [];

      // Create all users in cognito pools
      for (const userEmail of userEmailsToImport) {
        await createCognitoUser({
          email: userEmail,
        });

        const unblockedProducts = ["Product 1", "Product 2"];

        // Send emails for each unblocked product for each users
        for (const unblockedProduct of unblockedProducts) {
          await sendSESEmail({
            to: userEmail,
            subject: "New product unblocked",
            message: "Product unblocked : " + unblockedProduct,
          });
        }
      }

      return {
        importedUsersCount: 0,
      };
    },
  },
};

export default resolvers;
