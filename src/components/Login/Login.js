import React from 'react';
import './Auth.css';
//import logo from ; // 로고 이미지를 import


const Login = () => {
    return (
        <div className="auth-container">
            <h2>Fing-P CHATBOT</h2>
            <form>
                <div className="input-group">
                    <label htmlFor="id">ID</label>
                    <input type="text" id="id" name="id" required />
                </div>
                <div className="input-group">
                    <label htmlFor="pw">PW</label>
                    <input type="password" id="pw" name="pw" required />
                </div>
                <button type="submit">LOGIN</button>
            </form>
            <div className="signup-link">
                <a href="/signup">회원가입하기</a>
            </div>
            <div className="logo-container">
            <img src='/assets/pngegg (1).png' alt="skku logo" />
            </div>
        </div>
    );
};

export default Login;
