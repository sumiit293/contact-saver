import React, { useState, useContext, useEffect } from 'react'
import AlertContext from './../../context/alert/alertContext'
import AuthContext from './../../context/auth/authContext'

const Login = (props) => {
    const alertContext = useContext(AlertContext);
    const authtContext = useContext(AuthContext);

    const { setAlert } = alertContext;

    const { login, error, clearErrors, isAuthenticated } = authtContext;


    useEffect(() => {


        if (isAuthenticated) {
            props.history.push("/");
        }
        console.log(error);
        if (error === 'Invalid Credentials') {
            setAlert(error, 'danger');
            clearErrors();

        }
        if (error === 'Please include a valid email') {
            setAlert(error, 'danger');
            clearErrors();

        }
        //eslint-disable-next-line
    }, [error, isAuthenticated, props.history])

    const [user, setUser] = useState({

        email: "",
        password: "",

    })
    const { email, password } = user;

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {

        e.preventDefault();
        if (email === '' || password === '') {

            setAlert('Please fill in all fields', 'danger');
        } else {

            login({
                email,
                password
            });

        }
    }
    return (
        <div className="form-container">
            <h1>Account <span className="text-primary">Login</span> </h1>
            <form onSubmit={onSubmit}>


                <div className="form-group">
                    <label htmlFor="Email">Email Address</label>
                    <input type="email" value={email} name="email" placeholder="Email" onChange={onChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="text" value={password} name="password" placeholder="Password" onChange={onChange} />
                </div>


                <input type="submit" value="Login" className="btn btn-primary btn-block" />


            </form>
            <center>

            </center>
        </div>
    )
}

export default Login
