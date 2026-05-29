export const validateLogin = formData => {
  const errors = {}

  // NAME VALIDATION
  if (!formData.name.trim()) {
    errors.name = 'Name is required'
  } else if (formData.name.trim().length < 3) {
    errors.name = 'Minimum 3 characters required'
  } else if (!/^[A-Za-z ]+$/.test(formData.name)) {
    errors.name = 'Only alphabets allowed'
  }

  // MOBILE VALIDATION
  if (!formData.mobile) {
    errors.mobile = 'Mobile number is required'
  } else if (!/^\d{10}$/.test(formData.mobile)) {
    errors.mobile = 'Enter valid 10 digit mobile number'
  }

  return errors
}

export const validateEmployee = employee => {
  const errors = {}

  // NAME
  if (!employee.name.trim()) {
    errors.name = 'Employee name is required'
  } else if (employee.name.trim().length < 3) {
    errors.name = 'Minimum 3 characters required'
  } else if (!/^[A-Za-z ]+$/.test(employee.name)) {
    errors.name = 'Only alphabets allowed'
  }

  // SALARY
  if (!employee.salary) {
    errors.salary = 'Salary is required'
  } else if (Number(employee.salary) <= 0) {
    errors.salary = 'Salary must be greater than 0'
  }

  // GENDER
  if (!employee.gender) {
    errors.gender = 'Please select gender'
  }

  // DISTANCE
  if (employee.distance < 0) {
    errors.distance = 'Invalid distance'
  }

  return errors
}