import React from 'react'
import { useState, useEffect } from 'react'
import Header from './Header'
import { connect } from "react-redux";
import usersActions from "../redux/actions/usersActions";
import auxActions from '../redux/actions/auxActions';
import { GoogleLogin } from 'react-google-login';


const Register = (props) => {

    useEffect(() => {
        if (props.token) {
            alert(`Welcome to scape community ${props.name}!`)

        }

    }, [props.token])

    const [newUser, setNewUser] = useState({
        name: '',
        lastname: '',
        username: '',
        password: '',
        email: '',
        favConsole: 'not defined',
        urlpic: '',
        logWithGoogle: false,
        firstTime: true
    })


    const readInput = e => {
        const valor = e.target.name === "urlpic" ? e.target.files[0] : e.target.value
        setNewUser({
            ...newUser,
            [e.target.name]: valor
        })

    }
    const responseGoogle = (response) => {
        props.createAccount({
            name: response.profileObj.givenName,
            lastname: response.profileObj.familyName,
            username: response.profileObj.email,
            password: response.profileObj.googleId,
            email: response.profileObj.email,
            urlpic: response.profileObj.imageUrl,
            favConsole: 'not defined',
            logWithGoogle: true,
            firstTime: true
        })
        console.log(response)
    }

    const sendInfo = async e => {

        console.log(newUser)
        const fd = new FormData()
        fd.append("name", newUser.name)
        fd.append("lastname", newUser.lastname)
        fd.append("username", newUser.username)
        fd.append("password", newUser.password)
        fd.append("email", newUser.email)
        fd.append("urlpic", newUser.urlpic)
        fd.append(" favConsole", newUser. favConsole)
        fd.append("logWithGoogle", newUser.logWithGoogle)
        fd.append("firstTime", newUser.firstTime)
        console.log(fd)


        await props.createAccount(fd)

    }






    return (
        <>
            <div className='d-flex'>
                <div style={{ backgroundImage: 'url(https://www.filmsjackets.com/image/cache/catalog/ilse-schattenwolf-battlefield-5-cotton-jacket/ilse-schattenwolf-battlefield-5-cotton-jacket-800x980.jpg)', width: '40%', height: '100vh', backgroundPosition: 'top right', backgroundSize: 'cover' }}>

                </div>
                <div className='form section container center d-flex flex-column align-items-center register' style={{ width: '60%', height: '100vh' }}>
                    <h1 className="text-center">Create new account</h1>
                    <input type='text' name='name' placeholder='Type your name'
                        onChange={readInput} />
                    <input type='text' name='lastname' placeholder='Type your lastname'
                        onChange={readInput} />
                    <input type='text' name='username' placeholder='Choose your username (Min 5 characters)'
                        onChange={readInput} />
                    <input type='password' name='password' placeholder='Choose your password (Min 5 characters)'
                        onChange={readInput} />
                    <input type='text' name='email' placeholder='Type an email correct'
                        onChange={readInput} />
                    <label htmlFor="urlpic">Select your profile pic</label>
                    <input type='file' name='urlpic' id="urlpic"
                        onChange={readInput} />
                    <button onClick={sendInfo}>Create new account</button>
                    <GoogleLogin
                        clientId="575358746516-8ot9u4rh9irr4uf17ogf1bcqjt2aqneu.apps.googleusercontent.com"
                        buttonText="Create Account with Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
            </div>
            {/* <Footer/> */}
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
    createAccount: usersActions.createAccount,
    getCountries: auxActions.getCountries
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);