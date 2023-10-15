import { useNavigate } from 'react-router-dom'

import {Button, ButtonGroup, Card, CardHeader, Container} from 'react-bootstrap'

import { signOut } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

const SignOut = (props) => {
	const { msgAlert, clearUser, user } = props
    console.log(props)

    const navigate = useNavigate()

    const onSignOut = () => {
		signOut(user)
			.finally(() =>
				msgAlert({
					heading: 'Signed Out Successfully',
					message: messages.signOutSuccess,
					variant: 'success',
				})
			)
			.finally(() => navigate('/sign-in'))
			.finally(() => clearUser())
    }

    const onCancel = () => {
        navigate('/character-list')
    }

	return (
		<><Container className='d-flex justify-content-between'>
            <Container className='m-5'>
                <Card>
                    <CardHeader className='fs-3'>Are you sure you want to sign out?</CardHeader>
                </Card>   
                    
                    <ButtonGroup className='d-flex justify-content-between'>
                        <Button variant='danger' onClick={onSignOut}>
                            Sign Out
                        </Button>
                        <Button variant='warning' onClick={onCancel}>
                            Cancel
                        </Button>
                    </ButtonGroup>
                    
            </Container>
        </Container> </>
	)
}

export default SignOut
