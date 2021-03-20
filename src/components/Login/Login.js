import React, { useContext, useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from 'react-router-dom';
import './Login.css'
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from './firebase.config';
import { UserContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faGithubSquare } from '@fortawesome/free-brands-svg-icons'
import Header from '../Header/Header';


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const [signIn, setSignIn] = useState({})
    const [login, setLogin] = useState(false);
    const [newUser, setNewUser] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    // Create From React Form hook
    const { register, errors, handleSubmit, watch } = useForm({});
    const password = useRef({});
    password.current = watch("password", "");

    // Form Submit event handler
    const onSubmit = data => {
        //signInWithEmailAndPassword from google Firebase
        if (login) {
            firebase.auth().signInWithEmailAndPassword(data.email, data.password)
                .then(res => {
                    const user = res.user
                    const newUserInfo = {
                        name: user.displayName,
                        email: user.email
                    }
                    setLoggedInUser(newUserInfo)
                    setNewUser(newUserInfo)
                    history.replace(from);

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorMessage)
                    console.log(errorCode, errorMessage);
                });
        }

        // createUserWithEmailAndPassword from Google Firebase
        if (data.email && data.password && data.name) {
            firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
                .then(res => {
                    const user = res.user
                    const newUserInfo = {
                        name: data.name,
                        email: user.email
                    }
                    setLoggedInUser(newUserInfo)
                    updateProfile(newUserInfo.name)
                    history.replace(from);

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorMessage)
                    console.log(errorCode, errorMessage);
                });
        }

    };

    const gProvider = new firebase.auth.GoogleAuthProvider();
    const gitProvider = new firebase.auth.GithubAuthProvider()
    // signInWithPopup in Google
    const googleSignIn = (props) => {
        authSignIn(gProvider)
    }
    // signInWithPopup in Github
    const githubSignIn = (props) => {
        authSignIn(gitProvider)
    }

    // signInWithPopup Function
    const authSignIn = (props) => {
        firebase.auth()
            .signInWithPopup(props)
            .then(res => {
                const user = res.user;
                const newUserInfo = {
                    name: user.displayName,
                    email: user.email
                }
                setLoggedInUser(newUserInfo)
                setSignIn(newUserInfo);
                history.replace(from);

            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorMessage)
                console.log(errorCode, errorMessage);
            });
    }

    //user Updated Profile Firebase
    const updateProfile = name => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name,
        }).then(res => {
            console.log(user.displayName);
        }).catch(function (error) {
            setErrorMessage(errorMessage)
        });
    }
    return (
        <div className='container'>
            <Header></Header>
            <p className="text-center font-weight-bold">{errorMessage}</p>
            <div className="row">
                <div className="col-md pt-3 ">
                    {!login &&
                        <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
                            <div className="col-auto ">
                                <h2>Create an account:</h2>
                                <label htmlFor="name">Name:</label>
                                <input name="name" id="name" className="form-control" ref={register({ required: true })} placeholder="Enter Your name" /><br />
                                {errors.name && <span>This field is required</span>}

                                <label htmlFor="email">Username Or Email:</label>
                                <input className="form-control" name="email" id="email" ref={register({ required: true })} placeholder="Enter Your Username or email" /><br />
                                {errors.email && <span>This field is required</span>}

                                <label>Password:</label>
                                <input
                                    className="form-control"
                                    name="password"
                                    type="password"
                                    ref={register({
                                        required: "You must specify a password",
                                        minLength: {
                                            value: 6,
                                            message: "Password must have at least 8 characters"
                                        }
                                    })}
                                />
                                {errors.password && <p>{errors.password.message}</p>}

                                <label>Confirm password:</label>
                                <input
                                    className="form-control"
                                    name="password_repeat"
                                    type="password"
                                    ref={register({
                                        validate: value =>
                                            value === password.current || "The passwords do not match"
                                    })}
                                />
                                {errors.password_repeat && <p>{errors.password_repeat.message}</p>}

                                <br />
                                <input type="submit" className="loginBtn" value="Create an account" />
                            </div>
                        </form>
                    }
                    {
                        login && <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
                            <h2>Login</h2>
                            <label htmlFor="email">Email:</label>
                            <input className="form-control" name="email" id="email" ref={register({ required: true })} placeholder="Enter Your Username or email" /><br />
                            {errors.email && <span>This field is required</span>}

                            <label htmlFor="password">Password:</label>
                            <input className="form-control" name="password" id="password" ref={register({ required: true })} placeholder="Enter Your Password" /><br />
                            {errors.password && <span>This field is required</span>}
                            <br />
                            <input className="form-check-input" type="checkbox" name="remember" id="" />
                            <label className="form-check-label" for='checkbox'>Remember Me</label>
                            <input type="submit" className="loginBtn" value="LogIn" />
                        </form>

                    }
                    <div className="text-center login-container">
                        {!login ? <p>Already have an account?</p> : <p>Don't have an account?</p>}
                        {!login ? <button className=" loginBtn" onClick={() => setLogin(!login)}>Login</button> : <button className="loginBtn" onClick={() => setLogin(!login)}>Create an Account</button>}
                        <br /><p>-------------Or--------------</p><br />
                        <button onClick={googleSignIn} className="authLoginBtn"><FontAwesomeIcon icon={faGoogle} /> Continue With Google</button>
                        <button onClick={githubSignIn} className="authLoginBtn"><FontAwesomeIcon icon={faGithubSquare} /> Continue With GitHub</button>
                    </div>
                </div>

            </div>


        </div>
    );
};

export default Login;