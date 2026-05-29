import { useEffect, useState } from 'react'
import {
  formatCurrency,
  formatDistance,
  formatDate,
} from '../../utils/formatters'

import './Employees.css'

const Employees = () => {
  const [employees, setEmployees] = useState(() => {
    return JSON.parse(localStorage.getItem('employees')) || []
  })

  // Save employees to localStorage
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees))
  }, [employees])

  // Auto update distance every 2 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setEmployees(prev =>
        prev.map(emp => ({
          ...emp,
          distance: Number(emp.distance) + 80,
          updatedAt: new Date().toISOString(),
          isBlinking: true,
        }))
      )
      setTimeout(() => {
      setEmployees(prev =>
        prev.map(emp => ({
          ...emp,
          isBlinking: false,
        }))
      )
    }, 2000)
  }, 120000)

    return () => clearInterval(interval)
  }, [])

  // Add Employee
  const addEmployee = () => {
    const newEmployee = {
      id: Date.now(),
      name: '',
      salary: '',
      gender: '',
      distance: 500,
      updatedAt: new Date().toISOString(),
    }

    setEmployees([...employees, newEmployee])
  }

  // Update Employee
  const updateEmployee = (id, field, value) => {
    setEmployees(prev =>
      prev.map(emp => {
        if (emp.id === id) {
          return {
            ...emp,
            [field]: value,
            updatedAt: new Date().toISOString(),
          }
        }

        return emp
      })
    )
  }

  // Delete Employee
  const deleteEmployee = id => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this employee record?'
    )

    if (confirmDelete) {
      setEmployees(prev => prev.filter(emp => emp.id !== id))
    }
  }

  // Copy Employee
  const copyEmployee = employee => {
    const confirmCopy = window.confirm(
      'Are you sure you want to copy this employee record?'
    )

    if (confirmCopy) {
      const copiedEmployee = {
        ...employee,
        id: Date.now(),
        updatedAt: new Date().toISOString(),
      }

      setEmployees(prev => [...prev, copiedEmployee])
    }
  }

  return (
    <div className='employees-container'>
      <div className='top-section'>
        <h2>Employee Management</h2>

        <button className='add-btn' onClick={addEmployee}>
          Add Employee
        </button>
      </div>

      <div className='table-wrapper'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Salary</th>
              <th>Gender</th>
              <th>Distance</th>
              <th>Updated Time</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan='6' className='empty-text'>
                  No Employees Added
                </td>
              </tr>
            ) : (
              employees.map(employee => (
                <tr key={employee.id}>
                  {/* NAME */}
                  <td>
                    <input
                      type='text'
                      value={employee.name}
                      placeholder='Enter Name'
                      onChange={e =>
                        updateEmployee(
                          employee.id,
                          'name',
                          e.target.value
                        )
                      }
                    />
                  </td>

                  {/* SALARY */}
                  <td>
                    <input
                      type='number'
                      placeholder='Enter Salary'
                      value={employee.salary}
                      style={{
                        color:
                          employee.salary > 50000
                            ? 'red'
                            : 'black',
                      }}
                      onChange={e =>
                        updateEmployee(
                          employee.id,
                          'salary',
                          e.target.value
                        )
                      }
                    />

                    <div className='formatted-text'>
                      {formatCurrency(employee.salary)}
                    </div>
                  </td>

                  {/* GENDER */}
                  <td>
                    <select
                      value={employee.gender}
                      onChange={e =>
                        updateEmployee(
                          employee.id,
                          'gender',
                          e.target.value
                        )
                      }
                    >
                      <option value=''>Select</option>
                      <option value='Male'>Male</option>
                      <option value='Female'>Female</option>
                      <option value='Other'>Other</option>
                    </select>
                  </td>

                  {/* DISTANCE */}
                  <td
                  className={`
                  ${employee.distance > 2000 ? 'distance-alert' : ''}
                  ${employee.isBlinking ? 'distance-blink' : ''}
                  `}
>
                    {formatDistance(employee.distance)}
                  </td>

                  {/* UPDATED TIME */}
                  <td>
                    {formatDate(employee.updatedAt)}
                  </td>

                  {/* ACTIONS */}
                  <td className='action-buttons'>
                    <button
                      className='copy-btn'
                      onClick={() =>
                        copyEmployee(employee)
                      }
                    >
                      Copy
                    </button>

                    <button
                      className='delete-btn'
                      onClick={() =>
                        deleteEmployee(employee.id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Employees