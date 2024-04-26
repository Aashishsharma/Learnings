import React, { useState } from 'react'
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray
} from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'


// oltYTDformcomp uses formik hook which has lot of biolerplatcode
// e.g. on each form elem we need to add below code
// onChange={formik.handleChange}       
// onBlur={formik.handleBlur}
// value={formik.values.name}  
// imagine if there are 30 fileds
//to remove most of the biolerplatcode from the Formik provides it's own components
// some of those components are
// 1. Formik - replaces useFormik hook
// 2. Form
// 3. Field
// 4. ErrorMessage
// 5. FieldArray
// see below component code to understand above 4 components

const initialValues = {
  name: 'Vishwas',
  email: '',
  channel: '',
  comments: '',
  address: '',
  // if we need nested fields we can use as below
  // but why do we need it - if the api accesptts data in format like 
  // body: {name: 'vishwas', email: 'abc', social: {facebook:'fb', twitter: 'tw'}}
  // we use this nesting, so we avoid data transormation during form submission
  // see how to use these nested objs in the Field component below in jsx
  social: {
    facebook: '',
    twitter: ''
  },
  // if we want to pass multiple phone numbers to API as an array
  // see Field comp jsx
  phoneNumbers: ['', ''],
  phNumbers: ['']
}

// in production app with huge forms (they can fill form partially)
// this data will come from backend api when user clicks on load saved data
// 
const savedValues = {
  name: 'Vishwas',
  email: 'v@example.com',
  channel: 'codevolution',
  comments: 'Welcome to Formik',
  address: '221B Baker Street',
  social: {
    facebook: '',
    twitter: ''
  },
  phoneNumbers: ['', ''],
  phNumbers: ['']
}

const onSubmit = (values, submitProps) => {
  console.log('Form data', values)
  console.log('submitProps', submitProps)
  submitProps.setSubmitting(false)
  // reset form data when form is submited
  // when button type is reset, then on click of that button form data is reset
  submitProps.resetForm()
}

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Required'),
  channel: Yup.string().required('Required'),
  comments: Yup.string().required('Required')
})

// field level validation
const validateComments = value => {
  let error
  if (!value) {
    error = 'Required'
  }
  return error
}

function YoutubeForm () {
  const [formValues, setFormValues] = useState(null)
  return (
    // 1. Formik component
    // instaed of using useFormik hook, we use the Formik component
    // so same as useFormik hook, but here we wrap entire form in this formik comp
    // also in useFormik we pass config obj for initalVals, onsubmit, validation
    // in Formik comp. we pass thes values as props to this component - see below
    // this comp behaves as context provider comp
    <Formik
      // first load saved values, if not present load inital values
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      // below prop is required to load saved form values
      enableReinitialize
      // by default the validate function runs on change/blur event on any of the fields
      // if we don't want this we can disable those props
      // so it will only run on submit
      validateOnChange={false}
      validateOnBlur={false}
      // validateOnMount
    >
      {formik => {
        console.log('Formik props', formik)
        return (
          // 2. Form component
          // here we replace the html form with the formik Form component
          // here we don't need to link the handleSubmit handler
          <Form>
            <div className='form-control'>
              <label htmlFor='name'>Name</label>
              /// 3. Field component
              // this helps reducing the boilerplate code we had for each form elment like 
              // onChange={formik.handleChange}       
              // onBlur={formik.handleBlur}
              // value={formik.values.name}
              // now we don't have to worry about the initalValue / error obj to 
              // have same obj.properties as the name attriubte, Field comp takes care of this thing
              // note - bydefault (Form comp) renders input elem
              // all the props passed to Field comp are passed to html input elem
              // so we can add all valid input attributes, like placeholder - see YTDChannel field below
              // it also accepts "as" prop to render different input elem
              // e.g. as='textarea' to render textArea instaed of input elem - see comment field below
              <Field type='text' id='name' name='name' />
              // 4. ErrorMessage component
              // we need to pass in the name prop to this component which must be same as
              // the form filed name attribute
              // this is ErrorMessage comp knows for which filed this error message is for
              // the component prop which is passed to the ErroMessage component is where
              // we can do the styling for error message - See TextError component
              // TextError component received props.children which is equal to the 
              // error message we provided in the validateSchema function
              <ErrorMessage name='name' component={TextError} />
            </div>

            <div className='form-control'>
              <label htmlFor='email'>Email</label>
              <Field type='email' id='email' name='email' />
              <ErrorMessage name='email'>
              /// same as component={TextError}, but using render props
              /// why we use render props - if we wan't to return custom element instaed of the default
              // html input elems, like we want to render material UI's input / datepicker instaed of html's 
                {error => <div className='error'>{error}</div>}
              }
              </ErrorMessage>
            </div>

            <div className='form-control'>
              <label htmlFor='channel'>Channel</label>
              <Field
                type='text'
                id='channel'
                name='channel'
                placeholder='YouTube channel name'
              />
              <ErrorMessage name='channel' />
            </div>

            <div className='form-control'>
              <label htmlFor='comments'>Comments</label>
              <Field
                as='textarea'
                id='comments'
                name='comments'
                // field level validation
                validate={validateComments}
              />
              <ErrorMessage name='comments' component={TextError} />
            </div>

            <div className='form-control'>
              <label htmlFor='facebook'>Facebook profile</label>
              /// this is how we use nested object
              <Field type='text' id='facebook' name='social.facebook' />
            </div>

            <div className='form-control'>
              <label htmlFor='twitter'>Twitter profile</label>
              <Field type='text' id='twitter' name='social.twitter' />
            </div>

            <div className='form-control'>
              <label htmlFor='primaryPh'>Primary phone number</label>
              // primary phone muber stored in first index of phoneNumbers obj
              <Field type='text' id='primaryPh' name='phoneNumbers[0]' />
            </div>

            <div className='form-control'>
              <label htmlFor='secondaryPh'>Secondary phone number</label>
              <Field type='text' id='secondaryPh' name='phoneNumbers[1]' />
            </div>

            <div className='form-control'>
              <label>List of phone numbers</label>
              /// 5. FieldArray comp is used to dynamicall render the fields
              /// here we provide 1 input elem initially and then more dynamicaaly
              // this is achieved using render props pattern - (function as children)
              <FieldArray name='phNumbers'>
              /// if you understand render props pattern - below func is called from FieldArray comp
              /// using props.children() and this comp passes fieldArrayProps args which contains
              /// methods like push(), remove() and vals like form.values.phNumbers (phNumbers is configured 
              /// in formState already above)
                {fieldArrayProps => {
                  const { push, remove, form } = fieldArrayProps
                  const { values } = form
                  const { phNumbers } = values
                  // console.log('fieldArrayProps', fieldArrayProps)
                  // console.log('Form errors', form.errors)
                  return (
                    <div>
                    /// in the intialValues we have phNumbers = [''], so first time we 
                    /// render 1 ph number, and then we have buyyons, if user clicks on + button
                    /// we call push method which would add another field component because
                    // noe phNumbers will have extra array elem
                      {phNumbers.map((phNumber, index) => (
                        <div key={index}>
                        /// notice how we are passing name attribute dynamically
                        // which works same as that we saw in the array types in form state above
                          <Field name={`phNumbers[${index}]`} />
                          {index > 0 && (
                            <button type='button' onClick={() => remove(index)}>
                              -
                            </button>
                          )}
                        </div>
                      ))}
                      <button type='button' onClick={() => push('')}>
                        +
                      </button>
                    </div>
                  )
                }}
              </FieldArray>
            </div>
            
            <button type='button' onClick={() => setFormValues(savedValues)}>
              Load saved data
            </button>
            <button type='reset'>Reset</button>
            <button
              type='submit'
              // disbale submit
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Submit
            </button>
          </Form>
        )
      }}
    </Formik>
  )
}

export default YoutubeForm
