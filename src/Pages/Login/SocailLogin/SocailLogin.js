import React from 'react';
import google from '../../../images/social/google.png'
import facebook from '../../../images/social/facebook.png'
import github from '../../../images/social/github.png'
import { useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

const SocailLogin = () => {
    const [signInWithGoogle, googleUser, googleLoading, GoogleError] = useSignInWithGoogle(auth);
    const [signInWithGithub, githuUuser, githubLoading, githubError] = useSignInWithGithub(auth);
    const navigate = useNavigate();
    let erroMassage;

    if (googleLoading || githubLoading) {
        return <Loading></Loading>
    }

    if (GoogleError || githubError) {
        erroMassage = <p className='text-danger'>Error: {GoogleError?.message} {githubError?.message}</p>
    }

    if (googleUser || githuUuser) {
        navigate('/home')
    }


    return (
        <div>
            <div>
                <div className='d-flex align-items-center justify-content-center'>
                    <div style={{ height: '1px' }} className="bg-primary w-25"></div>
                    <p className='mt-3 px-2'>Or</p>
                    <div style={{ height: '1px' }} className="bg-primary w-25"></div>
                </div>
                {erroMassage}
                <button onClick={() => signInWithGoogle()} className='from-google my-2' type="submit">
                    <div className='img-google'>
                        <span><small><img src={google} alt="" /></small> Sign Up with Google</span>
                    </div>
                </button>
                <button className='from-google my-2' type="submit">
                    <div className='img-google'>
                        <span><small><img style={{ width: "30px" }} src={facebook} alt="" /></small> Sign Up with FaceBook</span>
                    </div>
                </button>
                <button onClick={() => signInWithGithub()} className='from-google my-2' type="submit">
                    <div className='img-google'>
                        <span><small><img src={github} alt="" /></small> Sign Up with Github</span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default SocailLogin;