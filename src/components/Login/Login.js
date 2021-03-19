import React, { useContext, useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from 'react-router-dom';
import './Login.css'
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from './firebase.config';
import { UserContext } from '../../App';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [signIn, setSignIn] = useState({})

    const { register, errors, handleSubmit, watch } = useForm({});
    const password = useRef({});
    password.current = watch("password", "");

    const [login, setLogin] = useState(false);
    const [newUser, setNewUser] = useState({});

    const onSubmit = data => {
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
                    // console.log(newUserInfo);

                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                });
        }
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
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                });
        }

    };

    const gProvider = new firebase.auth.GoogleAuthProvider();
    const gitProvider = new firebase.auth.GithubAuthProvider()
    const googleSignIn = (props) => {
        authSignIn(gProvider)
    }
    const githubSignIn = (props) => {
        authSignIn(gitProvider)
    }
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
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }
    const updateProfile = name => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name,
        }).then(res => {
            console.log(user.displayName);
        }).catch(function (error) {
            // An error happened.
        });
    }
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

                    <label>Password</label>
                    <input
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

                    <label>Repeat password</label>
                    <input
                        name="password_repeat"
                        type="password"
                        ref={register({
                            validate: value =>
                                value === password.current || "The passwords do not match"
                        })}
                    />
                    {errors.password_repeat && <p>{errors.password_repeat.message}</p>}

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
            <button onClick={githubSignIn} className="btn btn-warning">Continue With GitHub</button>
        </div>
    );
};

export default Login;