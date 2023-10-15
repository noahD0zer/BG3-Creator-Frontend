import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

import { Form, Button, Card, CardHeader } from 'react-bootstrap'

const SignIn = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

	const onSignIn = (event) => {
		event.preventDefault()
        console.log('the props', props)
		const { msgAlert, setUser } = props

        const credentials = {email, password}

		signIn(credentials)
                .then((res) => {
                    setUser(res.data.user)
                    const userJSON = JSON.stringify(res.data.user)
                    localStorage.setItem('user', userJSON)
                })

			.then(() =>
				msgAlert({
					heading: 'Sign In Success',
					message: messages.signInSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/character-list'))
			.catch((error) => {
                setEmail('')
                setPassword('')
				msgAlert({
					heading: 'Sign In Failed with error: ' + error.message,
					message: messages.signInFailure,
					variant: 'danger',
				})
			})
	}

    return (
        <div className='row'>
            <div className='col-sm-10 col-md-8 mx-auto mt-5'>
                <Card bg='dark' text='white'>
                    <CardHeader className='fs-3'>Sign In</CardHeader>
                    <Form className='m-3' onSubmit={onSignIn}>
                        <Form.Group controlId='email'>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                required
                                type='email'
                                name='email'
                                value={email}
                                placeholder='Enter email'
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className='mt-2' controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                name='password'
                                value={password}
                                type='password'
                                placeholder='Password'
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button className='mt-2' variant='primary' type='submit'>
                            Submit
                        </Button>
                    </Form>
                </Card>
            </div>
        </div>
    )
}

export default SignIn
