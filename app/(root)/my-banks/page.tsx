import Bankcards from '@/components/Bankcards';
import Headerbox from '@/components/headerbox'
import { getAccounts } from '@/lib/server/bank.actions';
import { getLoggedInUser } from '@/lib/server/users.actions';
import React from 'react'

const Bankacc = async () => {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ 
    userId: loggedIn.$id 
  })
  return (
    <section className=''>
        <header className='banks'>
          <Headerbox
          title='My Bank Account'
          subtext='Effortlessly Managing Your Bank Activities'
          />
        </header>

        <div className="space-y-4">
          <h2 className="header-2">
            Your cards
          </h2>
          <div className="flex flex-wrap gap-6">
            {accounts && accounts.data.map((a: Account) => (
              <Bankcards
                key={accounts.id}
                account={a}
                userName={loggedIn?.firstName}
              />
            ))}
          </div>
        </div>
    </section>
  )
}

export default Bankacc
