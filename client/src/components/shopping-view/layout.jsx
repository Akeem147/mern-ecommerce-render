import React from 'react'
import { Outlet } from 'react-router-dom'
import ShoppingViewHeader from './header'

function ShoppingLayout() {
  return (
    <div className='flex flex-col bg-white overflow-hidden'>
        <ShoppingViewHeader />
        <main className="flex flex-col w-full mt-[60px]">
            <Outlet />
        </main>
    </div>
  )
}

export default ShoppingLayout