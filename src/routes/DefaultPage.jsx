import React from 'react'
import Header from '../common/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../common/Footer'
import Sidebar from '../common/Sidebar'

export default function DefaultPage() {
  return (
    <>
      <div>
        <Header className="relative"/>
        <Sidebar className="fixed left-0"/>
      </div>
          <Outlet />
          <Footer />
    </>
  )
}