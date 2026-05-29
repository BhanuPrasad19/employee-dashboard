const Header = () => {
  const user = JSON.parse(localStorage.getItem('murataUser'))

  return (
    <header className='header'>
      <div className='logo'>Murata</div>

      <div className='user-section'>
        <span>{user?.name}</span>
        <div className='profile-icon'>👤</div>
      </div>
    </header>
  )
}

export default Header