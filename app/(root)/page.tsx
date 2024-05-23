import Headerbox from '@/components/headerbox'
import Rightsidebar from '@/components/Rightsidebar'
import Totalbalance from '@/components/totalbalance'
import React from 'react'

const Home = () => {
  const loggedIn={
    firstName:'Vibhuu',lastName:'Behera',email:'vvunitian18@gmail.com'
  }
  return (
    <section className='home'>
       <div className="home-content">
          <header className='home-header'>
            <Headerbox title="Welcome" type="greeting" subtext="Access and manage ur account and transactions efficiently" user="Vibhuu"
            />
            <Totalbalance accounts={[]} totalBanks={1} totalCurrentBalance={2918.32} />
          </header>
       </div>
       <Rightsidebar
          banks={[{},{}]}
          transactions={[]}
          user={loggedIn}
          />
    </section>
  )
}

export default Home
