'use client'

import React from 'react'
import Bankcards from './Bankcards'
import { Progress } from "@/components/ui/progress"

const Mybankscard = () => {
    const [progress, setProgress] = React.useState(13)
 
    React.useEffect(() => {
    const timer = setTimeout(() => setProgress(50), 500)
    return () => clearTimeout(timer)
    }, [])

    const loggedIn={
        firstName:'Vibhuu',lastName:'Behera',email:'vvunitian18@gmail.com'
      }
      const banks=[{},{}]
  return (
        <div className="cards1 flex flex-col gap-2 max-w-fit">
            <Bankcards account={banks[0]} userName={`${loggedIn.firstName} ${loggedIn.lastName}`} showBalance={false}/>
            <div className="expenditure w-full flex justify-between mt-2 text-sm">
                <span>Spending this month</span>
                <span>&#36;2,840.80</span>
            </div>
            <Progress value={progress} className="w-[60%] bg-bankGradient h-2"/>
        </div>
  )
}

export default Mybankscard
