import { useState } from 'react'
import './Home.css'

const Home = () => {
  const user = JSON.parse(localStorage.getItem('murataUser'))

  const [media, setMedia] = useState(
    localStorage.getItem('homeMedia') || ''
  )

  const handleMediaUpload = e => {
    const file = e.target.files[0]

    if (file) {
      const reader = new FileReader()

      reader.onloadend = () => {
        setMedia(reader.result)
        localStorage.setItem('homeMedia', reader.result)
      }

      reader.readAsDataURL(file)
    }
  }

  return (
    <div
      className='home-container'
      // style={{
      //   backgroundImage: `url(${media})`,
      // }}
    >
      <div className='overlay'>
        <h1>Welcome to {user?.name}</h1>

        <input type='file' onChange={handleMediaUpload} />
      </div>
    </div>
  )
}

export default Home