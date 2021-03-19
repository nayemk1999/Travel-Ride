import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import './Login.css'
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from './firebase.config';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {

    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
            .then(res => {
                const { email } = res.user
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                // ..
            });
    };

    const gProvider = new firebase.auth.GoogleAuthProvider();
    const googleSignIn = () => {
        firebase.auth()
            .signInWithPopup(gProvider)
            .then((result) => {
                var user = result.user;
                console.log(user);
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
    }
    const [login, setLogin] = useState(false);

    return (
        <div className='text-center'>
            { !login &&
                <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
                    <h2>Create an account</h2>
                    <label htmlFor="name">Name</label>
                    <input name="name" id="name" ref={register({ required: true })} placeholder="Enter Your name" /><br />
                    {errors.name && <span>This field is required</span>}

                    <label htmlFor="email">Username Or Email</label>
                    <input name="email" id="email" ref={register({ required: true })} placeholder="Enter Your Username or email" /><br />
                    {errors.email && <span>This field is required</span>}

                    <label htmlFor="password">Password</label>
                    <input name="password" id="password" ref={register({ required: true })} placeholder="Enter Your Username or email" /><br />
                    {errors.password && <span>This field is required</span>}

                    <label htmlFor="password2">Confirm Password</label>
                    <input name="password2" id="password2" ref={register({ required: true })} placeholder="Enter Your Username or email" /> <br />
                    {errors.password2 && <span>This field is required</span>}
                    <br />
                    <input type="submit" value="Create an account" />
                </form>
            }

            {
                login && <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
                    <h2>Login</h2>
                    <label htmlFor="email">Email</label>
                    <input name="email" id="email" ref={register({ required: true })} placeholder="Enter Your Username or email" /><br />
                    {errors.email && <span>This field is required</span>}

                    <label htmlFor="password">Password</label>
                    <input name="password" id="password" ref={register({ required: true })} placeholder="Enter Your Username or email" /><br />
                    {errors.password && <span>This field is required</span>}
                    <br />
                    <input type="checkbox" name="remember" id="" value="Remember Me" />
                    <input type="submit" value="LogIn" />
                </form>
            }

            {!login ? <p>Already have an account?</p> : <p>Don't have an account?</p>}
            {!login ? <button className="btn btn-warning" onClick={() => setLogin(!login)}>Login</button> : <button className="btn btn-warning" onClick={() => setLogin(!login)}>Create an Account</button>}
            <p>-------------Or--------------</p>
            <button onClick={googleSignIn} className="btn btn-warning">Continue With Google</button>
            <button className="btn btn-warning">Continue With Facebook</button>
        </div>
    );
};

export default Login;