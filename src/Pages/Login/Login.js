import React, { useRef } from 'react';
import { Spinner } from 'react-bootstrap';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading/Loading';
import './Login.css'
import SocailLogin from './SocailLogin/SocailLogin';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const EmailRef = useRef('');
    const PasswordRef = useRef('');
    const navigate = useNavigate();
    const location = useLocation();


    let from = location.state?.from?.pathname || "/";

    let errorElement;

    // reset password
    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    if (loading || sending) {
        return <Loading></Loading>
    }

    if (user) {
        navigate(from, { replace: true });
    }

    if (error) {
        errorElement = <p className='text-danger'>Error: {error?.message}</p>
    }

    //hendel user login
    const logInUser = (event) => {
        event.preventDefault();
        const email = EmailRef.current.value;
        const password = PasswordRef.current.value;

        signInWithEmailAndPassword(email, password)
    }

    const hendelForgetPssword = async () => {
        const email = EmailRef.current.value;
        if (email) {
            await sendPasswordResetEmail(email);
            toast('Sent email');
        }
        else{
            toast('enter your email')
        }
    }

    return (
        <div className='from-container'>
            <form onSubmit={logInUser}>
                <div>
                    <h3 className='from-title text-primary '>Login</h3>
                    <div className="input-group">
                        <input type="email" ref={EmailRef} name="" id="" required placeholder='Enter your Email' />
                    </div>
                    <div className="input-group">
                        <input type="password" ref={PasswordRef} name="" id="" required placeholder='Enter Password' />
                    </div>

                    <p>
                        {
                            loading && <Spinner animation="border" variant="warning" />
                        }
                    </p>
                    <input className='from-submit bg-primary' type="submit" value="Login" />
                </div>
                <div className='d-flex justify-content-around'>
                    <div>
                        <Link className='form-link' to='/register'>Create new account !  </Link>
                    </div>
                    <div>
                        <button className='form-link btn btn-link' onClick={hendelForgetPssword}>Forget Password !</button>
                    </div>
                </div>

                {errorElement}

                <SocailLogin></SocailLogin>
                <ToastContainer />

            </form>
        </div>
    );
};

export default Login;