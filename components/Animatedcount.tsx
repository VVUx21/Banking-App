import React from 'react'
import CountUp from 'react-countup';

const Animatedcount = ({amount}:{amount:number}) => {
  return (
    <div>
        <CountUp
        start={0}
        end={amount}
        prefix='$'
        duration={1}
        decimals={2}
        decimal="."
        />
    </div>
  )
}

export default Animatedcount
