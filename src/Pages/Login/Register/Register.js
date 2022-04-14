import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import SocailLogin from '../SocailLogin/SocailLogin';
import { Spinner } from 'react-bootstrap';
import { async } from '@firebase/util';
import Loading from '../../Shared/Loading/Loading';


const Register = () => {
    const [error, setError] = useState();
    const DisplayName = useRef('');
    const EmailRef = useRef('');
    const PasswordRef = useRef('');
    const ConfirmPasswordRef = useRef('');
    const navigate = useNavigate()
    const [agree, setAgree] = useState(false);

    //update nam or profile
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);


    const [
        createUserWithEmailAndPassword,
        user,
        loading,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });



    if (user) {
        console.log(user);
    }
    const createUser = async (event) => {
        event.preventDefault()
        const name = DisplayName.current.value;
        const email = EmailRef.current.value;
        const password = PasswordRef.current.value;
        const confirmPassword = ConfirmPasswordRef.current.value;

        if (password !== confirmPassword) {
            setError("Password does not metch")
            return
        }
        createUserWithEmailAndPassword(email, password)
        await updateProfile({ displayName: name });
        console.log('update profile');
       
        navigate('/home');
    }

    
    return (
        <div>
            <div onSubmit={createUser} className='from-container'>

                <form>
                    <div>
                        <h3 className='from-title text-primary'>Sign Up</h3>
                        <div className="input-group">
                            <input type="text" name="" ref={DisplayName} id="" required placeholder='Enter Name' />
                        </div>
                        <div className="input-group">
                            <input type="email" ref={EmailRef} name="" id="" required placeholder='Enter Email' />
                        </div>
                        <div className="input-group">
                            <input type="password" ref={PasswordRef} name="" id="" required placeholder='Enter Password' />
                        </div>
                        <div className="input-group">
                            <input type="password" ref={ConfirmPasswordRef} name="" id="" required placeholder='Confirm Password' />
                        </div>
                        <p style={{ color: 'red' }}>
                            {error}
                        </p>
                        <p>
                            {
                                loading || updating && <Spinner animation="border" variant="primary" />
                            }
                        </p>
                        <input onClick={() => setAgree(!agree)} type="checkbox" name="chackbox" id="" />
                        <label htmlFor="" className={`ps-2 ${agree ? 'text-primary' : 'text-danger'}`}>accept tarms and codition ?</label>
                        <input disabled={!agree} className='from-submit bg-primary' type="submit" value="Sign Up" />
                    </div>
                    <p>
                        Already have an account ? <Link className='form-link' to='/login'>Log In</Link>
                        <div>
                            <SocailLogin></SocailLogin>
                        </div>
                    </p>



                </form>

            </div>
        </div>
    );
};

export default Register;