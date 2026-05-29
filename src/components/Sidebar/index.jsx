import './Sidebar.css'
const Sidebar = ({ activeMenu, setActiveMenu }) => {
  return (
    <aside className='sidebar'>
      <button
        className={activeMenu === 'home' ? 'active' : ''}
        onClick={() => setActiveMenu('home')}
      >
        Home
      </button>

      <button
        className={activeMenu === 'employees' ? 'active' : ''}
        onClick={() => setActiveMenu('employees')}
      >
        Employees
      </button>
    </aside>
  )
}

export default Sidebar