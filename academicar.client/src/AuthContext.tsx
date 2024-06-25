import {createContext, ReactElement, ReactNode, useEffect, useContext, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

interface AuthContextProps {
    user: User | null;
    login: () => void;
    logout: () => void;
    selectIdP: () => void;
    adminLogin: (username: string, password: string) => Promise<void>;
    adminLogout: () => Promise<void>;
}

interface User {
    name: string;
    //roles: string[];
    userName: string
    firstName: string;
    id: string;
    [key: string]: any;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }): ReactElement => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('/api/user', {withCredentials: true});
                setUser(response.data);
            } catch (error) {
                if (window.location.pathname !== "/auth/login") {
                    navigate("/auth/login");
                    await adminLogout();
                }
            }
        };
        checkAuth();
    }, []);

    const login = () => {
        window.location.href = '/Saml2/Login';
    };

    const selectIdP = () => {
        // Optionally, you can add the current URL as a return URL parameter
        const returnUrl = encodeURIComponent(window.location.href);
        window.location.href = `/api/Account/login?returnUrl=${returnUrl}`;
    };

    const adminLogin = async (username: string, password: string) => {
        try {
            const response = await axios.post('/api/User/AdminLogin', { username, password });
            console.log("login: ", response.data)
            localStorage.setItem('userID', response.data.userID);
            setUser(response.data);
        } catch (error) {
            throw new Error('Admin login failed');
        }
    };

    const adminLogout = async () => {
        try {
            const response = await axios.get('/api/User/Logout');
            console.log("logout: ", response.data)
            localStorage.removeItem('userID');
            setUser(null);
        } catch (error) {
            throw new Error('Admin logout failed');
        }
    };

    const logout = async () => {
        await axios.get('/Saml2/Logout', { withCredentials: true });
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, selectIdP, adminLogin, adminLogout }}>
            {children}
        </AuthContext.Provider>
    );
};


export const getUserId = (): string => {
    const userId = localStorage.getItem('userID');
    return userId !== null ? userId : '-999';
};

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
