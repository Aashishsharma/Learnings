import React, {useState} from 'react'

export const useForm = (initialState, cb) => {
	const [val, setVal] = useState(initialState);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('submitting form')
		cb();
	}

	const handleChange = (e) => {
		setVal({...val, [e.target.name]: e.target.value})
	}

	return [val, handleChange, handleSubmit]
}