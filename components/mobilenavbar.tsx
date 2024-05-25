'use client'
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
  } from "@/components/ui/sheet"
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Mobilenavbar = ({user}:SiderbarProps) => {
    const pathname = usePathname();
    const loggedIn={
        firstName:'Vibhuu',lastName:'Behera',email:'vvunitian18@gmail.com'
      }
  return (
    <div>
       <Sheet>
            <SheetTrigger>
                <Image src="/icons/hamburger.svg" alt="logo" width={30} height={30}/>
            </SheetTrigger>
            <SheetContent side={'left'} className=' bg-white '>
            <Link href="/" className='flex items-center gap-2'>
                <Image src="/icons/logo.svg" alt='logo' width={34} height={34}/>
                <h1 className='text-24 text-black-1 font-bold'>Paytrack</h1>
            </Link>
            <div className="mobilenav-sheets">
                <SheetClose asChild>
                    <nav className='flex flex-col pt-16 gap-6 h-full text-white'>
                        {/* Very Important Concepts used here......!!! */}
            {
                sidebarLinks.map((item) => {
                    const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)
                    return(
                        <SheetClose asChild key={item.route}>
                            <Link href={item.route} className={cn('mobilenav-sheet_close w-full',{'bg-bank-gradient':isActive})} key={item.label}>
                                <Image src={item.imgURL} alt='logo' width={20} height={20} className={cn({'brightness-[3] invert-0':isActive})} />
                                <h1 className={cn('text-16 font-semibold text-black-2',{'text-white':isActive})}>{item.label}</h1>
                            </Link>
                        </SheetClose>
                    )
                })
            }
                    </nav>
                </SheetClose>
                </div>
                <footer className='footer border-t-2 h-fit'>
                    <div className="footer_image-mobile">
                        <span className=' text-slate-700 footer_name-mobile'>{loggedIn.firstName[0]}</span>
                    </div>
                    <div className="flex flex-col justify-center mt-2 ml-6 ">
                        <p className=' text-slate-700 text-16'>{loggedIn.firstName} {loggedIn.lastName}</p>
                        <p className='text-slate-700 footer_email-mobile text-14 '>{loggedIn.email}</p>
                    </div>
                </footer>
            </SheetContent>
        </Sheet>
    </div>
  )
}

export default Mobilenavbar
