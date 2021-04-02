import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password } from '../../actions/auth'

const ResetPassword = ({ reset_password }) =>
{
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e =>
    {
        e.preventDefault();

        //login(email, password)
        reset_password(email);
        setRequestSent(true);

    };

    //is the user authenticated?
    // Redirect to homepage

    if (requestSent)
    {
        return <Redirect to='/' />
    }

    return (
        <div className='container mt-5'>
            <h1>Request Password Reset</h1>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <button className='btn btn-primary mt-3' type='submit'>Reset Password</button>
            </form>
        </div>
    );
};

const mapStateToProps = state => ({
    // is authenticated
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(null, { reset_password })(ResetPassword);