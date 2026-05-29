import { useState } from 'react'
import './Home.css'

const defaultImage =
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1400&auto=format&fit=crop'

const Home = () => {
  const user =
  JSON.parse(localStorage.getItem('user')) || {}

  const [media, setMedia] = useState(
    localStorage.getItem('media') || defaultImage
  )

  const handleMediaUpload = event => {
    const file = event.target.files[0]

    if (!file) return

    const imageUrl = URL.createObjectURL(file)

    setMedia(imageUrl)

    localStorage.setItem('media', imageUrl)
  }

  return (
    <div
      className='home-container'
      style={{
        backgroundImage: `url(${media})`,
      }}
    >
      <div className='overlay'>
        <h1>
          Welcome to {user?.name || 'User'}
        </h1>

        <input
          type='file'
          accept='image/*'
          onChange={handleMediaUpload}
        />
      </div>
    </div>
  )
}

export default Home