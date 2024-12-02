import {PlaidApi,Configuration,PlaidEnvironments} from 'plaid';

export const plaidClient = new PlaidApi(new Configuration({
    basePath: PlaidEnvironments.SANDBOX,
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID!,
            'PLAID-SECRET': process.env.PLAID_SECRET!,
        }
    }
}));
