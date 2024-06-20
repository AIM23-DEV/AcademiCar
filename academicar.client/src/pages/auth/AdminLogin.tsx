import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import {Input} from "../../components/FormFields.tsx";
import {Button} from "../../components/Buttons.tsx";
import {useTranslation} from "react-i18next";

const AdminLogin: React.FC = () => {
    const { adminLogin } = useAuth();
    const [t] = useTranslation(["common", "pages/auth"]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(''); // Clear previous error
        try {
            await adminLogin(username, password);
            navigate('/admin/dashboard'); // Redirect to admin dashboard on successful login
        } catch (error) {
            setError('Admin login failed. Please check your credentials.');
        }
    };
    
    //TODO Funktionalität
    
    return (
        <div className="w-full h-dvh flex flex-col items-center justify-center">
            <div className="headline-1 pb-6">{t('pages/auth:AdminLogin.title')}</div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form className="w-full" onSubmit={handleSubmit}>
                <div className="w-full flex flex-col gap-6">
                    <Input
                        label={t('pages/auth:AdminLogin.user')}
                        type="text"
                        fullWidth={true}
                        placeholder="Admin"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required={true}
                    />

                    <Input
                        label={t('pages/auth:AdminLogin.password')}
                        type="password"
                        fullWidth={true}
                        placeholder="*****"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required={true}
                    />

                    <Button
                        variant="primary"
                        fullWidth
                        text={t('pages/auth:AdminLogin.login')}
                        textAlign="center"
                        onClick={handleSubmit}
                        className="col-span-full"
                    />
                </div>
            </form>
        </div>
    );
};

export default AdminLogin;
