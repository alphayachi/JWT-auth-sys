import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password_confirm } from '../../actions/auth'

const ResetPasswordConfirm = ({ match, reset_password_confirm }) =>
{
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    });

    const { new_password, re_new_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e =>
    {
        e.preventDefault();

        const uid = match.params.uid;
        const token = match.params.token;

        //login(email, password)
        reset_password_confirm(uid, token, new_password, re_new_password);
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
                        className='form-control mt-3'
                        type='password'
                        placeholder='New Password'
                        name='new_password'
                        value={new_password}
                        onChange={e => onChange(e)}
                        minlength='6'
                        required
                    />
                    <input
                        className='form-control mt-3'
                        type='password'
                        placeholder='Confirm New Password'
                        name='re_new_password'
                        value={re_new_password}
                        onChange={e => onChange(e)}
                        minlength='6'
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


export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);