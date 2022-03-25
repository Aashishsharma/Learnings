import React from 'react'
import {useForm} from '../custom_hooks/useForm'

let formElemsValues = {
	name: '', email: ''
}

export const Home = () => {
	const [values, handleChange, handleSubmit] = useForm(formElemsValues)	

	const handleSubmit1 = () => {
	  console.log('submittinh')
	}
	
	return (
		<form onSubmit={handleSubmit} >
			<label> Name: - </label>
			<input name="name" type = "text" onChange={handleChange} value={values.name} />
			<input name="email" type = "email" onChange={handleChange} value={values.email} />
			<button type="submit">Submit</button>
		</form>
	)
}