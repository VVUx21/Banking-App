import React from 'react'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
   
  const invoices = [
    {
      Transaction: "INV001",
      paymentStatus: "Success",
      totalAmount: "-$250.00",
      Category: "Subscription",
      Date:"Wed 1:00pm"
    },
    {
      Transaction: "INV002",
      paymentStatus: "Processing",
      totalAmount: "+$150.00",
     Category: "Deposit",
     Date:"Wed 10:00pm"
    },
    {
      Transaction: "INV003",
      paymentStatus: "Declined",
      totalAmount: "$350.00",
     Category: "Income",
     Date:"Wed 6:00pm"
    },
    {
      Transaction: "INV004",
      paymentStatus: "Success",
      totalAmount: "-$450.00",
     Category: "Groceries",
     Date:"Sun 5:00pm"
    },
    {
      Transaction: "INV005",
      paymentStatus: "Success",
      totalAmount: "-$550.00",
     Category: "Food",
     Date:"Mon 1:40pm"
    },
    {
      Transaction: "INV006",
      paymentStatus: "Processing",
      totalAmount: "$200.00",
     Category: "Bank Transfer",
     Date:"Fri 2:00pm"
    },
    {
      Transaction: "INV007",
      paymentStatus: "Declined",
      totalAmount: "$300.00",
        Category: "Travel",
        Date:"Tue 4:00pm"
    },
  ]

const Transactiontable = () => {
  return (
    <>
        <Table>
      <TableCaption>A list of your recent Transactions...</TableCaption>
      <TableHeader className='bg-[#f9fafb]'>
        <TableRow>
          <TableHead className="px-2">Transactions</TableHead>
          <TableHead className="px-2">Status</TableHead>
          <TableHead className="px-2 max-md:hidden">Category</TableHead>
          <TableHead className="px-2">Date</TableHead>
          <TableHead className="px-2">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.Transaction} className={`${invoice.totalAmount[0] === '-' ? 'bg-[#FFFBFA]' : 'bg-[#F6FEF9]'} !over:bg-none !border-b-DEFAULT`}>
            <TableCell className="max-w-[250px] pl-2 pr-10">
            <div className="flex items-center gap-3">
                  <h1 className="text-14 truncate font-semibold text-[#344054]">
                    {invoice.Transaction}
                  </h1>
                </div>
            </TableCell>
            <TableCell className='pl-2 pr-10'>{invoice.paymentStatus}</TableCell>
            <TableCell className='max-md:hidden pl-2 pr-10 '>{invoice.Category}</TableCell>
            <TableCell className='min-w-32 pl-2 pr-10'>{invoice.Date}</TableCell>
            <TableCell className={`pl-2 pr-10 font-semibold ${
              invoice.totalAmount[0] === '-' ?
                  'text-[#f04438]'
                  : 'text-[#039855]'
              }`}>{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </>
  )
}

export default Transactiontable
