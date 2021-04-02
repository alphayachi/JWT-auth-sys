import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth'
import axios from 'axios';
import * as styles from './login.module.css';

const Login = ({ login, isAuthenticated }) =>
{
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e =>
    {
        e.preventDefault();

        //login(email, password)
        login(email, password);

    };

    const ContinueWithGoogle = async () =>
    {
        try
        {
            const res = await axios.get(`${ process.env.REACT_APP_API_URL }/auth/o/google-oauth2/?redirect_uri=http://localhost:8000`);
            window.location.replace(res.data.authorization_url);

        } catch (err)
        {

        }
    };

    //is the user authenticated?
    // Redirect to homepage

    if (isAuthenticated)
    {
        return <Redirect to='/' />
    }

    return (
        <div className={`${ styles.loginPage } `} >
            <h1>Sign In</h1>
            <p>Sign into your Account</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className={`${ styles.loginBox }`}>
                    <input
                        className={`${ styles.inputBox }`}
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                    <input
                        className={`${ styles.inputBox }`}
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        minlength='6'
                        required
                    />
                </div>
                <div>
                    <button className={`${ styles.btnSubmit }`} type='submit'>Login</button>
                </div>
            </form>
            <div>
                <button className={`${ styles.btnGoogle }`} onClick={ContinueWithGoogle}>Continue With Google</button>
            </div>
            <p className='mt-3'>
                Don't have an account? <Link to='/signup'>Sign Up</Link>
            </p>
            <p className='mt-3'>
                Forgot your Password? <Link to='/reset_password'>Reset Password</Link>
            </p>
        </div >
    );
};

const mapStateToProps = state => ({
    // is authenticated
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { login })(Login);