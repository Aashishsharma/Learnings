import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const initialValues = {
  name: 'Vishwas',
  email: '',
  channel: ''
}


// this function gets form values as args
const onSubmit = values => {
  console.log('Form data', values)
}

// this function also gets form values as args
// note the erorr obj. which we return form this func must have properties same as
// name attributes of the form elements
// const validate = values => {
//   const errors = {}

//   if (!values.name) {
//     errors.name = 'Required'
//   }

//   if (!values.email) {
//     errors.email = 'Required'
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = 'Invalid email format'
//   }

//   if (!values.channel) {
//     errors.channel = 'Required'
//   }

//   return errors
// }

// yup is a library for validation schema
// we use this instaed of custom validate func above and returnig error
// notice for email validation, we had to specify email regex
// here we just use the .email() to validate if it is email
const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Required'),
  channel: Yup.string().required('Required')
})

function OldYoutubeForm () {

  // we use useFormik hook
  // formik obj has several properites like 
  // 1. formik.values
  // 2. formik.errors
  // 3. formik.touched - for this to work we need to onBlur attribute on form fields
  const formik = useFormik({
    // note = all the properties in this config obj. are using ES6 shorthand syntax
    // ideally it is initialValues: cbFunc
    // IMP! - the properties in initialValues obj must be same as name attributes in html fields
    // see initalVal obj, and other input elems in form jsx, both are same
    initialValues,
    // formik.handleSubmit below will call this (onSubmit) cb method
    // this method automatically get the form data filled in
    onSubmit,
    // validate - -without using Yup we need to do this,
    validationSchema
  })

  console.log('formik.touched', formik.touched)

  return (
    // handle form submission
    <form onSubmit={formik.handleSubmit}>
      <div className='form-control'>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id='name'
          name='name'
          /// formki hook returns formik obj, which has handleChange method, which automatically manages 
          /// the state of these fileds
          /// for this reason initalVal obj properties must be same as the name attribute 
          onChange={formik.handleChange}
          
          onBlur={formik.handleBlur}
          /// get latest val from the formik obj
          value={formik.values.name}
        />
        /// display erros if the validate func above returns error for name
        /// only if the field was touched
        /// we are using onBlur func to identified if the filed was touched/visited
        {formik.touched.name && formik.errors.name ? (
          <div className='error'>{formik.errors.name}</div>
        ) : null}
      </div>

      <div className='form-control'>
        <label htmlFor='email'>E-mail</label>
        <input
          type='email'
          id='email'
          name='email'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        /// display erros if the validate func above returns error for email
        /// only if the field was touched
        /// we are using onBlur func to identified if the filed was touched/visited
        {formik.touched.email && formik.errors.email ? (
          <div className='error'>{formik.errors.email}</div>
        ) : null}
      </div>

      <div className='form-control'>
        <label htmlFor='channel'>Channel</label>
        <input
          type='text'
          id='channel'
          name='channel'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.channel}
        />
        {formik.touched.channel && formik.errors.channel ? (
          <div className='error'>{formik.errors.channel}</div>
        ) : null}
      </div>

      <button type='submit'>Submit</button>
    </form>
  )
}

export default OldYoutubeForm
