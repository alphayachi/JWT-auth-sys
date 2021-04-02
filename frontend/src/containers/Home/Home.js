import React from "react";
import { Link } from 'react-router-dom';

const Home = () => (
    <div className='container'>
        <div className="jumbotron">
            <h1 className="display-4">MAILZX</h1>
            <p className="lead">The most secure mailing app</p>
            <hr className="my-4" />
            <p>One of a kind encryption</p>
            <Link className="btn btn-primary btn-lg" to='/login' role="button">Login</Link>
        </div>
    </div>
);
export default Home;
