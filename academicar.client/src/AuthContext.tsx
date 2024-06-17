import { createContext, ReactElement, ReactNode, useEffect, useContext, useState } from 'react';
import axios from 'axios';

interface AuthContextProps {
    user: User | null;
    logout: () => void;
    selectIdP: () => void;
    adminLogin: (username: string, password: string) => Promise<void>; // Add adminLogin method
}

interface User {
    name: string;
    //roles: string[];
    userName: string
    firstName: string;
    [key: string]: any;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }): ReactElement => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // TODO fix 404
                //const response = await axios.get('/api/user', { withCredentials: true });
                //setUser(response.data);
            } catch (error) {
                setUser(null);
            }
        };
        checkAuth();
    }, []);

    /*
    const login = () => {
        window.location.href = '/Saml2/Login';
    };
    */
    const selectIdP = () => {
        // Optionally, you can add the current URL as a return URL parameter
        const returnUrl = encodeURIComponent(window.location.href);
        window.location.href = `/api/Account/login?returnUrl=${returnUrl}`;
    };

    const adminLogin = async (username: string, password: string) => {
        try {
            const response = await axios.post('/api/User/AdminLogin', { username, password });
            setUser(response.data); // Ensure this sets UserName and FirstName
        } catch (error) { 
            throw new Error('Admin login failed');
        }
    };

    const logout = async () => {
        await axios.get('/Saml2/Logout', { withCredentials: true });
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user,  logout, selectIdP, adminLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
