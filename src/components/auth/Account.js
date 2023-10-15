import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { changePassword } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

import { Form, Button, Card, Container, CardTitle } from 'react-bootstrap'


const Account = (props) => {
	// constructor(props) {
	// 	super(props)

	// 	this.state = {
	// 		oldPassword: '',
	// 		newPassword: '',
	// 	}
	// }
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const navigate = useNavigate()

	const onChangePassword = (event) => {
		event.preventDefault()

		const { msgAlert, user } = props
        console.log('the user', user)
        

        const passwords = {oldPassword, newPassword}

		changePassword(passwords, user)
			.then(() =>
				msgAlert({
					heading: 'Change Password Success',
					message: messages.changePasswordSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/'))
			.catch((error) => {
				setOldPassword('')
                setNewPassword('')
				msgAlert({
					heading: 'Change Password Failed with error: ' + error.message,
					message: messages.changePasswordFailure,
					variant: 'danger',
				})
			})
	}



    return (
        <div className='row'>
            <Container className='col-sm-10 col-md-8 mx-auto mt-5'>
                <Card>

                    <Form className='m-3' onSubmit={onChangePassword}>
                        <Form.Group className='d-flex justify-content-center'>
                            <CardTitle className='mb-2' >Change Password</CardTitle>
                        </Form.Group>
                        <Form.Group className='mb-2' controlId='oldPassword'>
                            <Form.Label>Old password</Form.Label>
                            <Form.Control
                                required
                                name='oldPassword'
                                value={oldPassword}
                                type='password'
                                placeholder='Old Password'
                                onChange={e => setOldPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className='mb-2' controlId='newPassword'>
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                required
                                name='newPassword'
                                value={newPassword}
                                type='password'
                                placeholder='New Password'
                                onChange={e => setNewPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button className='mt-2' variant='primary' type='submit'>
                            Submit
                        </Button>
                    </Form>
                </Card>
            </Container>
        </div>
    )
}

export default Account