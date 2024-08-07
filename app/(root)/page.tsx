import Headerbox from '@/components/headerbox'
import Recenttransactions from '@/components/recenttransactions'
import Rightsidebar from '@/components/Rightsidebar'
import Totalbalance from '@/components/totalbalance'
import { getLoggedInUser } from '@/lib/server/users.actions'
import React from 'react'

const Home = async () => {
  const loggedIn=await getLoggedInUser();

  return (
    <section className='home'>
       <div className="home-content">
          <header className='home-header'>
            <Headerbox title="Welcome"
             type="greeting" 
             subtext="Access and manage ur account and transactions efficiently" 
             user={loggedIn?.name}
            />
            <Totalbalance accounts={[]} totalBanks={1} totalCurrentBalance={2918.32} />

            <Recenttransactions/>
            
          </header>
       </div>

       <Rightsidebar
          user={loggedIn}
          banks={[{},{}]}
          transactions={[]}
          />
    </section>
  )
}

export default Home
