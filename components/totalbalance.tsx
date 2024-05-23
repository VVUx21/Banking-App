'use client'
import React from 'react'
import Animated from './Animated'
import Animatedcount from './Animatedcount'

const Totalbalance = (
    {accounts=[],totalBanks,totalCurrentBalance}:TotlaBalanceBoxProps
) => {
  return (
    <div className='total-balance'>
        <div className="total-balance-chart">
            <Animated accounts={accounts}/>   
        </div>
        <div className="bankaccounts flex flex-col gap-6">
            <p className='header-2'>{totalBanks} Bank Accounts</p>
        <div className='flex flex-col gap-2'>
            <p className="total-balance-label">Total Current Balance</p>
            <div className="total-balance-amount flex-center gap-2">
                <Animatedcount amount={totalCurrentBalance}/>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Totalbalance
