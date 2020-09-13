import React, { useState, useEffect } from 'react'
import Header from './Header'
import { connect } from "react-redux";
import usersActions from '../redux/actions/usersActions';

const LogIn = (props) => {

    const [newUser, setNewUser] = useState({

    });

    const readInput = e => {
        const camp = e.target.name
        const value = e.target.value
        setNewUser({
            ...newUser,
            [camp]: value
        })
    };

    const sendInfo = e => {
        e.preventDefault()

        if (newUser.username === '' || newUser.password === '') {
            alert('All camps are required, please take a look again')
        }
        else {
            const userToLogIn = { username: newUser.username, password: newUser.password }
            props.userLogIn(userToLogIn)
        }
    };

    useEffect(() => {
        if (props.token) {
            alert(`Welcome back ${props.name}`)
            props.history.push('/Home')/* CREAR HOME */
        }
    }, [props.token]);

    return (
        <>
            <Header />
            <div className='form'>
                <h1>Please, choose your account</h1>
                <input type='text' name='username' placeholder='Type your username'
                    onChange={readInput} />
                <input type='password' name='password' placeholder='Type your password'
                    onChange={readInput} />

                <button onClick={sendInfo}>Log In</button>
            </div>

        </>
    )
}

const mapStateToProps = state => {
    return {
        name: state.usersReducer.name,
        token: state.usersReducer.token
    }
}

const mapDispatchToProps = {
    userLogIn: usersActions.userLogIn
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);