import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Transactiontable from './transactiontable'

const Banktabitem = () => {
  return (
    <div>
        <>
        <Tabs defaultValue="account" className="w-full ">
        <TabsList>
            <TabsTrigger value="account">
            <div
                className="banktab-item border-blue-600">
                <p
                    className="text-16 line-clamp-1 flex-1 font-medium text-blue-600"
                >
                    Chase Bank
                </p>
            </div>
            </TabsTrigger>
            <TabsTrigger value="account">
            <div
                className="banktab-item">
                <p
                    className="text-16 line-clamp-1 flex-1 font-medium text-gray-600"
                >
                    Bank of America
                </p>
            </div>
            </TabsTrigger>
            <TabsTrigger value="account">
            <div
                className="banktab-item ">
                <p
                    className="text-16 line-clamp-1 flex-1 font-medium text-gray-600"
                >
                    Wells Fargo
                </p>
            </div>
            </TabsTrigger>
        </TabsList>
        <TabsContent value="account" className='flex flex-col gap-4'>
            <div className="maincontainer max-w-full bg-bankGradient/10 px-4 py-6 flex justify-between rounded-lg items-center mt-3">
                <div className="bankname flex flex-row items-center gap-4">
                    <div className="badge rounded-full bg-bankGradient p-2">
                        <h1 className='text-white text-14'>CB</h1>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h1 className='text-16 text-black-2 font-semibold'>Chase Bank</h1>
                        <p className='text-14 text-blue-500 font-medium'>$1,238.80</p>
                    </div>
                </div>
                <div className="status">
                    <p className='text-14 text-gray-600 font-normal'>Success</p>
                </div>
            </div>
            <Transactiontable/>
        </TabsContent>
        </Tabs>
        </>
    </div>
  )
}

export default Banktabitem
