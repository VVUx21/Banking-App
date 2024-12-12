import Headerbox from '@/components/headerbox'
import PaymentsTranfer from '@/components/PaymentsTranfer'
import { getAccounts } from '@/lib/server/bank.actions';
import { getLoggedInUser } from '@/lib/server/users.actions';
import React from 'react'

const Paymenttrans = async () => {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ 
    userId: loggedIn.$id 
  })
  if(!accounts) return;
  
  const accountsData = accounts?.data;
  return (
    <section className='payment-transfer'>
        <Headerbox
            title='Payment Transfer'
            subtext='Please provide any specific details or notes related to the payment tranfer'
        />
        <div className="flex flex-col gap-1 mt-8">
            <h1 className='text-24 text-black-1 font-semibold'>Tranfer details</h1>
            <p className='text-16 text-black-1 font-normal'>Enter the details of recipient</p>
        </div>
        <section className='w-full pt-5'>
            <PaymentsTranfer
              accounts={accountsData}
            />
        </section>
    </section>
  )
}

export default Paymenttrans
