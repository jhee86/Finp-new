import React from 'react';
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import './Auth.css';

const Signup = () => {
    const clientId = '209716783504-15djcr9u94lugi8h3cjqi606pvp5ovc3.apps.googleusercontent.com';
    
    return (
        <div className="auth-container">
            
                <h2>Sign Up</h2>
                <div className="auth-form">
                <GoogleOAuthProvider clientId={clientId}>
                    <GoogleLogin
                        onSuccess={(res) => {
                            console.log(res);
                        }}
                        onFailure={(err) => {
                            console.log(err);
                        }}
                    />
                </GoogleOAuthProvider>
                </div>
                <button type="submit">LOGIN</button>
            
            <div className="logo-container">
                <img src='/assets/pngegg (1).png' alt="skku logo" />
            </div>
        </div>
    );
};

export default Signup;
