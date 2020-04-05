import React, { useState, useContext, useEffect } from 'react'
import AlertContext from './../../context/alert/alertContext'
import AuthContext from './../../context/auth/authContext'

const Register = (props) => {
    const alertContext = useContext(AlertContext);
    const authtContext = useContext(AuthContext);

    const { setAlert } = alertContext;

    const { register, error, clearErrors, isAuthenticated } = authtContext;

    useEffect(() => {



        if (isAuthenticated) {
            props.history.push("/");
        }
        if (error === 'User allredy exist') {
            setAlert(error, 'danger');
            clearErrors();

        }
        //eslint-disable-next-line
    }, [error, isAuthenticated, props.history])

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    })
    const { name, email, password, password2 } = user;

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (name === "" || email === "" || password === "") {
            setAlert("No field should be left empty", "danger");
        } else if (password !== password2) {
            setAlert("Both password doesnot match", "danger");
        } else {
            register({
                name,
                email,
                password
            })
        }
        setUser({
            name: "",
            email: "",
            password: "",
            password2: ""
        })

        return;

    }
    return (
        <div className="form-container">
            <h1>Account <span className="text-primary">Register</span> </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" value={name} name="name" placeholder="Name" onChange={onChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="Email">Email Address</label>
                    <input type="text" value={email} name="email" placeholder="Email" onChange={onChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="text" value={password} name="password" placeholder="Password" onChange={onChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="password2">Re Enter Password</label>
                    <input type="text" value={password2} name="password2" placeholder="Confirm Password" onChange={onChange} />
                </div>

                <input type="submit" value="Register" placeholder="Confirm Password" className="btn btn-primary btn-block" />


            </form>
        </div>
    )
}

export default Register
