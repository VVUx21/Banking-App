import BankDropdown from '@/components/BankDropdown'
import Headerbox from '@/components/headerbox'
import Transactiontable from '@/components/transactiontable'
import Image from 'next/image'
import React from 'react'

const Transactions = () => {
  return (
    <section className='transactions'>
        <header className='transactions-header'>
            <Headerbox
                title='Transactions history'
                subtext='Gain insights and Track Your Transactions Over Time'
            />
            <BankDropdown 
                accounts={[]} value="200"/>
        </header>
        <div className='transactions-account'>
            <div className='flex flex-col gap-2'>
                <h1 className=' text-slate-50 text-24'>Chase</h1>
                <p className='text-slate-50 text-14'>Chase Growth Savings Account</p>
                <p className="text-14 font-semibold tracking-[1.1px] text-white">
              ●●●● ●●●● ●●●● <span className="text-16">1234</span>
            </p>
            </div>
            <div className='transactions-account-balance'>
                <p className='text-sm '>Current Balance</p>
                <p className='text-24'>$41,238.80</p>
            </div>
        </div>
        <section className='max-w-full flex flex-col gap-5'>
          <header className='flex w-full justify-between'>
              <p className='text-24 font-semibold'>Transactions History</p>
              <button className='view-all-btn flex gap-1'>
                <Image src="/icons/filter-lines.svg" width={20} height={20} alt='lines'/>
                Apply filter
              </button>
          </header>
          <Transactiontable/>
        </section>
    </section>
  )
}

export default Transactions
