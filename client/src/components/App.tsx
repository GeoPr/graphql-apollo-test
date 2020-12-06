import React from 'react'
import { Header } from './Header/Header'
import { Tabs } from './Tabs/Tabs'
import './App.scss'

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <main className="page">
        <Header />
        <Tabs />
      </main>
    </div>
  )
}

export default App
