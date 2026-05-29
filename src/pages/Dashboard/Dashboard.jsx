import { useState } from 'react'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/index'
import Home from '../Home/Home'
import Employees from '../Employees/Employees'

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState('home')

  return (
    <div>
      <Header />

      <div className='dashboard-layout'>
        <Sidebar
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />

        <main>
          {activeMenu === 'home' ? <Home /> : <Employees />}
        </main>
      </div>
    </div>
  )
}

export default Dashboard