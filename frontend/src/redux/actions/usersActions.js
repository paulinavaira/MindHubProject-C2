import axios from 'axios'
import Swal from 'sweetalert2'

const usersActions = {


    createAccount: fd => {
        return async (dispatch, getState) => {
            const response = await axios.post('http://127.0.0.1:4000/api/user', fd, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })/* ->PEDIR RUTA AL BACKEND<- */
            if (response.data.success !== true) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: response.data.message,
                })
            } else {
                if (response.data.token) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Welcome!',
                        text: 'We are very happy to see you!',
                        timer: 2000
                    })
                    setTimeout(()=> {
                        dispatch({
                            type: 'SET_USER',
                            payload: {
                                name: response.data.name,
                                urlpic: response.data.urlpic,
                                token: response.data.token,
                                firstTime: response.data.firstTime,
                                lastName: response.data.lastName,
                                email: response.data.email,
                                favconsole: response.data.favConsole
                            }
                        })
                    }, 2000)
                    
                }
                
            }


        }
    },

    userLogIn: newUser => {
        return async (dispatch, getState) => {
            const response = await axios.post('http://127.0.0.1:4000/api/login', newUser)/* ->PEDIR RUTA AL BACKEND<- */
            console.log(response.data)
            if (!response.data.success) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: response.data.message,
                })
            } else {
                if (response.data.token) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Welcome!',
                        text: 'We are very happy to see you!',
                        timer: 2000
                    })
                    setTimeout(()=> {
                        dispatch({
                            type: 'SET_USER',
                            payload: {
                                name: response.data.name,
                                urlpic: response.data.urlpic,
                                token: response.data.token,
                                username: response.data.username,
                                firstTime: response.data.firstTime,
                                lastName: response.data.lastName,
                                email: response.data.email,
                                favconsole: response.data.favConsole
                            }
                        })
                    }, 2000)
                    
                }
            }

        }
    },

    userLogOut: () => {
        return (dispatch, getState) => {
            dispatch({
                type: "LOGOUT_USER"
            })
        }
    },

    forcedLogIn: tokenLS => {
        return async (dispatch, getState) => {
            const response = await axios.get('http://127.0.0.1:4000/api/tokenVerificator', {
                headers: {
                    Authorization: `Bearer ${tokenLS}`
                }
            })
            console.log(response.data)
            dispatch({
                type: "SET_USER",
                payload: {
                    name: response.data.name,
                    urlpic: response.data.urlpic,
                    token: tokenLS,
                    username: response.data.username,
                    firstTime: response.data.firstTime,
                    lastname: response.data.lastname,
                    email: response.data.email,
                    favconsole: response.data.favConsole

                }
            })

        }
    }


}


export default usersActions