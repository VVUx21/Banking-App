'use client'

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = ({user}:SiderbarProps) => {
    const Pathname = usePathname();
  return (
    <section className='sidebar'>
       <nav className='sidebar-profile flex flex-col gap-4'>
            <Link href="/" className='flex items-center mb-12 gap-2'>
                <Image src="/icons/logo.svg" alt='logo' width={34} height={34}/>
                <h1 className='sidebar-logo'>Paytrack</h1>
            </Link>
                {/* Very Important Concepts used here...... */}
            {
                sidebarLinks.map((item) => {
                    const isActive = Pathname === item.route || Pathname.startsWith(`${item.route}/`)

                    return(
                        <Link href={item.route} className={cn('sidebar-link',{'bg-bank-gradient':isActive})} key={item.label}>
                            <Image src={item.imgURL} alt='logo' width={30} height={30} className={cn({'brightness-[3] invert-0':isActive})} />
                            <h1 className={cn('sidebar-label',{'!text-white':isActive})}>{item.label}</h1>
                        </Link>
                    )
                })
            }
       </nav>
    </section>
  )
}

export default Sidebar
