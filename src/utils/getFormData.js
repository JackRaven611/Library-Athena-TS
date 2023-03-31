export const getFormData = e => {
    const form = e.target
    const { email, password, name, surname, description, photo } = form
  
    const formData = {
      email: email?.value,
      password: password?.value,
      name: name?.value,
      surname: surname?.value,
      description: description?.value,
      photo: photo?.value,
    }
  
    return formData
  }