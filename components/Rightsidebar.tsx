import Link from 'next/link'
import React from 'react'
import Bankcards from './Bankcards'
import { Category } from './Category'

const Rightsidebar = ({user,transactions,banks}:RightSidebarProps) => {
  return (
    <aside className='right-sidebar'>
        <section className=' flex flex-col pb-8'>
            <div className="profile-banner"></div>
            <div className="profile">
                <div className="profile-img">
                    <span className='text-5xl'>{user?.firstName[0]}</span>
                </div>
                <div className="profile-details">
                    <h1 className='profile-name'>{user?.firstName} {user?.lastName}</h1>
                    <p className='profile-email'>{user?.email}</p>
                </div>
            </div>
        </section>
        <section className="my-banks">
            <Link href="/" className='flex flex-row justify-between w-full'>
                <h1 className='my-banks-title'>My Banks</h1>
                <h5> &#43; Add Bank</h5>
            </Link>
            {banks.length>0 && (
                <div className='flex flex-col items-center justify-center flex-1 gap-5 '>
                    <div className="relative z-10">
                        <Bankcards 
                        key={banks[0].$id}
                        account={banks[0]}
                        userName={`${user?.firstName} ${user?.lastName}`}
                        showBalance={false}
                        />
                    </div>
                    {banks[1] && (
                        <div className="relative left-8 -top-44 z-0 w-[90%]">
                            <Bankcards 
                                key={banks[0].$id}
                                account={banks[0]}
                                userName={`${user?.firstName} ${user?.lastName}`}
                                showBalance={false}
                                />
                        </div>
                    )
                    }
                </div>
            )}
            <div className="flex flex-col flex-1 -mt-36 gap-6">
                <h2 className='header-2'>My budgets</h2>
                <Category name="Subscriptions" 
                    icon="/icons/monitor.svg"
                    count={0}
                    bgcolor="bg-bankGradient/10"
                    progressbar="bg-bankGradient"
                />
                <Category name="Food and booze" 
                    icon="/icons/shopping-bag.svg"
                    count={70}
                    bgcolor="bg-red-900/10"
                    progressbar="bg-red-300"
                />
                <Category name="Savings" 
                    icon="/icons/coins.svg"
                    count={70}
                    bgcolor="bg-green-900/10"
                    progressbar="bg-green-300"
                />
            </div>
        </section>
    </aside>
)
}

export default Rightsidebar
