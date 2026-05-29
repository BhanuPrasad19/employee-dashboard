import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import './Login.css'

const Login = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
  })

  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Minimum 3 characters required'
    } else if (!/^[A-Za-z ]+$/.test(formData.name)) {
      newErrors.name = 'Only alphabets allowed'
    }

     if (!formData.mobile) {
      newErrors.mobile = 'Mobile number required'
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Enter valid 10 digit number'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (validateForm()) {
      const userData = {
        ...formData,
        loginTime: new Date().toISOString(),
      }

      localStorage.setItem('murataUser', JSON.stringify(userData))

      navigate('/dashboard')
    }
  }
   return (
    <div className='login-container'>
      <form className='login-form' onSubmit={handleSubmit}>
        <h2>Murata Login</h2>

        <input
          type='text'
          placeholder='Enter Name'
          value={formData.name}
          onChange={e =>
            setFormData({ ...formData, name: e.target.value })
          }
        />

        {errors.name && <p>{errors.name}</p>}

        <input
          type='text'
          placeholder='Mobile Number'
          maxLength='10'
          value={formData.mobile}
          onChange={e =>
            setFormData({
              ...formData,
              mobile: e.target.value.replace(/\D/g, ''),
            })
          }
        />

        {errors.mobile && <p>{errors.mobile}</p>}

        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login