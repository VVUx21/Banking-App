import Headerbox from '@/components/headerbox'
import Mybankscard from '@/components/mybankscard'
import React from 'react'

const Bankacc = () => {

  return (
    <section className=''>
        <header className='banks'>
          <Headerbox
          title='My Bank Account'
          subtext='Effortlessly Managing Your Bank Activities'
          />
        </header>

        <div className="cards px-4 flex flex-col gap-1">
          <h2 className='header-2'>Your cards</h2>
          <div className="flex flex-wrap gap-8 py-6">
          <Mybankscard/>
          <Mybankscard/>
          <Mybankscard/>
          <Mybankscard/>
          <Mybankscard/>
          <Mybankscard/>
          </div>
        </div>
    </section>
  )
}

export default Bankacc
