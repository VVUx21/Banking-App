import React from 'react'
import Banktabitem from './banktabitem'

const Recenttransactions = () => {
  return (
    <section className='recent-transactions'>
        <header className='flex w-full justify-between'>
            <p className='text-24 font-semibold'>Recent Transactions</p>
            <button className='view-all-btn'>View All</button>
        </header>
        <Banktabitem/>
    </section>
  )
}

export default Recenttransactions
