import Headerbox from '@/components/headerbox'
import Recenttransactions from '@/components/recenttransactions'
import Rightsidebar from '@/components/Rightsidebar'
import Totalbalance from '@/components/totalbalance'
import { getAccount, getAccounts } from '@/lib/server/bank.actions'
import { getLoggedInUser } from '@/lib/server/users.actions'
import React from 'react'

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const loggedIn = await getLoggedInUser();
  //console.log(loggedIn);
  const accounts = await getAccounts({ 
    userId: loggedIn.$id 
  })
  //console.log(accounts);
  if(!accounts) return;
  
  const accountsData = accounts.data;
  //console.log(accountsData);
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;
  const account = await getAccount({ appwriteItemId })

  //console.log(accountsData);
  //console.log(account);

  return (
    <section className='home'>
      <div className="home-content">
          <header className='home-header'>
            <Headerbox title="Welcome"
            type="greeting" 
            subtext="Access and manage ur account and transactions efficiently" 
            user={loggedIn?.firstName}
            />
            <Totalbalance accounts={accountsData} totalBanks={accounts?.totalBanks} 
            totalCurrentBalance={accounts?.totalCurrentBalance} />

            <Recenttransactions/>
            
          </header>
      </div>

      <Rightsidebar
          user={loggedIn}
          transactions={account?.transactions}
          banks={accountsData?.slice(0, 2)}
          />
    </section>
  )
}

export default Home
