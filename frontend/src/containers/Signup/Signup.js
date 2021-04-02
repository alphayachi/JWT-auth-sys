import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../../actions/auth'
import axios from 'axios';

const Signup = ({ signup, isAuthenticated }) =>
{
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        re_password: ''
    });

    const { first_name, last_name, email, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e =>
    {
        e.preventDefault();

        if (password === re_password)
        {
            signup(first_name, last_name, email, password, re_password);
            setAccountCreated(true);
        }

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
    if (accountCreated)
    {
        return <Redirect to='/login' />
    }

    return (
        <div className='container mt-5'>
            <h1>Sign Up</h1>
            <p>Create your Account</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='First Name*'
                        name='first_name'
                        value={first_name}
                        onChange={e => onChange(e)}
                        required
                    />
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Last Name*'
                        name='last_name'
                        value={last_name}
                        onChange={e => onChange(e)}
                        required
                    />
                    <input
                        className='form-control'
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                    <input
                        className='form-control mt-3'
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        minlength='6'
                        required
                    />
                    <input
                        className='form-control mt-3'
                        type='password'
                        placeholder='Confirm Password'
                        name='re_password'
                        value={re_password}
                        onChange={e => onChange(e)}
                        minlength='6'
                        required
                    />
                </div>
                <button className='btn btn-primary mt-3' type='submit'>Sign Up</button>
            </form>
            <button className='btn btn-danger mt-3' onClick={ContinueWithGoogle}>Continue With Google</button>
            <p className='mt-3'>
                Already have an Account? <Link to='/login'>Sign In</Link>
            </p>

        </div>
    );
};

const mapStateToProps = state => ({
    // is authenticated
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { signup })(Signup);