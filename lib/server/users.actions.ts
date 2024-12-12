'use server';
import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "./appwrite";
import { cookies } from "next/headers";
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "../utils";
import { CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, Products } from "plaid";
import { plaidClient } from "../plaid";
import { revalidatePath } from "next/cache";
import { addFundingSource, createDwollaCustomer } from "./dwolla.actions";
const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env;
interface DwollaError {
  message: string;
  path?: string;
  code?: string;
}

interface EmbeddedErrors {
  errors: DwollaError[];
}

interface DwollaResponseError {
  response: {
    body?: {
      _embedded?: EmbeddedErrors;
    };
  };
}

export const getUserInfo = async ({ userId }: getUserInfoProps) => { //it queries actual user from database rather than user from
  //session
  try {
    const { database } = await createAdminClient();

    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal('userId', [userId])]
    )

    return parseStringify(user.documents[0]);
  } catch (error) {
    console.log(error)
  }
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();//we will also get the user from
    //session and then fetch the user details from database.
    const result = await account.get();

    const user = await getUserInfo({ userId: result.$id})

    return parseStringify(user);
  } catch (error) {
    console.log(error);
    return null;
  }
}

  export const logoutAccount = async () => {
    try {
      const { account } = await createSessionClient();
  
      cookies().delete('appwrite-session');//very important..
  
      await account.deleteSession('current');
    } catch (error) {
      return null;
    }
  }

export async function signin({email,password}:signInProps) {
  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);
      
        cookies().set("appwrite-session", session.secret, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        });

        const user = await getUserInfo({ userId: session.userId }) 

        return parseStringify(user);
  } catch (error) {
    console.error('Error', error);
}
}

export async function signup({password,...userData}:SignUpParams) {//atomic functions that executes all three steps at once...
    const {email,firstName,lastName}=userData;
    let useraccount;
    try {
        const { account,database } = await createAdminClient();

        useraccount=await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);
      
        if (!useraccount) {
          throw new Error('Failed to create user account');
        }
        // add user to the bank collection
      const dwollaCustomerUrl = await createDwollaCustomer({
        ...userData, //typescript complains about the optional firstname parameter because it is required
        type: "personal"
      })
      //console.log(dwollaCustomerUrl)
      if (!dwollaCustomerUrl){
        throw new Error('Failed to create dwolla customer');
      }
      // add funding source to dwolla customer
      const dwollaCustomerId= extractCustomerIdFromUrl(dwollaCustomerUrl);

      const newuser= await database.createDocument(
        DATABASE_ID!,
        USER_COLLECTION_ID!,
        ID.unique(),
        {
        ...userData,
        userId: useraccount.$id,
        dwollaCustomerId,
        dwollaCustomerUrl
        }
      ) 

      const session = await account.createEmailPasswordSession(email, password);
      
        cookies().set("appwrite-session", session.secret, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        });
        
        return parseStringify(newuser);//in next js we cant pass large objects just like that through Server actions
    } catch (error) {
      const typedError = error as DwollaResponseError;
      //console.log(typedError);
      // if (
      //   typedError.response &&
      //   typedError.response.body &&
      //   typedError.response.body._embedded
      // ) {
      //   console.error(
      //     'Validation Errors:',
      //     typedError.response.body._embedded.errors
      //   );
  
      //   const errors = typedError.response.body._embedded.errors
      //     .map((err) => err.message)
      //     .join(', ');
      //   throw new Error(`Failed to create customer: ${errors}`);
      // } else {
      //   console.error('Unexpected Error:', error);
      //   throw new Error('Something went wrong. Please try again later.');
      // }
    }
  }

  export const createLinkToken = async (user: User) => {
    try {
      const tokenParams = {
        user: {
          client_user_id: user.$id
        },
        client_name: `${user.firstName} ${user.lastName}`,
        products: ['auth','transactions','identity'] as Products[],
        language: 'en',
        country_codes: ['US','ES'] as CountryCode[],
      }
  
      const response = await plaidClient.linkTokenCreate(tokenParams);
  
      return parseStringify({ linkToken: response.data.link_token })
    } catch (error) {
      console.log(error);
    }
  }

  export const exchangePublicToken = async ({
    publicToken,
    user,
  }: exchangePublicTokenProps) => {
    try {
      // Exchange public token for access token and item ID
      const response = await plaidClient.itemPublicTokenExchange({
        public_token: publicToken,
      });
  
      const accessToken = response.data.access_token;
      const itemId = response.data.item_id;
      
      // Get account information from Plaid using the access token
      const accountsResponse = await plaidClient.accountsGet({
        access_token: accessToken,
      });
  
      const accountData = accountsResponse.data.accounts[0];
  
      // Create a processor token for Dwolla using the access token and account ID
      const request: ProcessorTokenCreateRequest = {
        access_token: accessToken,
        account_id: accountData.account_id,
        processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
      };
  
      const processorTokenResponse = await plaidClient.processorTokenCreate(request);
      const processorToken = processorTokenResponse.data.processor_token;
  
       // Create a funding source URL for the account using the Dwolla customer ID, processor token, and bank name
      const fundingSourceUrl = await addFundingSource({
        dwollaCustomerId: user.dwollaCustomerId,
        processorToken,
        bankName: accountData.name,
      });
      
      // If the funding source URL is not created, throw an error
      if (!fundingSourceUrl) throw Error;
  
      // Create a bank account using the user ID, item ID, account ID, access token, funding source URL, and shareableId ID
      await createBankAccount({
        userId: user.$id,
        bankId: itemId,
        accountId: accountData.account_id,
        accessToken,
        fundingSourceUrl,
        shareableId: encryptId(accountData.account_id),
      });
  
      // Revalidate the path to reflect the changes
      revalidatePath("/");
  
      // Return a success message
      return parseStringify({
        publicTokenExchange: "complete",
      });
    } catch (error) {
      console.error("An error occurred while creating exchanging token:", error);
    }
  }

  export const createBankAccount = async ({
    accessToken,
    userId,
    accountId,
    bankId,
    fundingSourceUrl,
    shareableId,
  }: createBankAccountProps) => {
    try {
      const { database } = await createAdminClient();
  
      const bankAccount = await database.createDocument(
        DATABASE_ID!,
        BANK_COLLECTION_ID!,
        ID.unique(),
        {
          accessToken,
          userId,
          accountId,
          bankId,
          fundingSourceUrl,
          shareableId,
        }
      );
  
      return parseStringify(bankAccount);
    } catch (error) {
      console.error("Error", error);
      return null;
    }
  };
  
  export const getBanks = async ({ userId }: getBanksProps) => {
    try {
      const { database } = await createAdminClient();
  
      const banks = await database.listDocuments(
        DATABASE_ID!,
        BANK_COLLECTION_ID!,
        [Query.equal('userId', [userId])]
      )
  
      return parseStringify(banks.documents);
    } catch (error) {
      console.log(error)
    }
  }

  export const getBank = async ({ documentId }: getBankProps) => {
    try {
      const { database } = await createAdminClient();
  
      const bank = await database.listDocuments(
        DATABASE_ID!,
        BANK_COLLECTION_ID!,
        [Query.equal('$id', [documentId])]
      )
  
      return parseStringify(bank.documents[0]);
    } catch (error) {
      console.log(error)
    }
  }
  
  export const getBankByAccountId = async ({ accountId }: getBankByAccountIdProps) => {
    try {
      const { database } = await createAdminClient();
  
      const bank = await database.listDocuments(
        DATABASE_ID!,
        BANK_COLLECTION_ID!,
        [Query.equal('accountId', [accountId])]
      )
  
      if(bank.total !== 1) return null;
  
      return parseStringify(bank.documents[0]);
    } catch (error) {
      console.log(error)
    }
  }