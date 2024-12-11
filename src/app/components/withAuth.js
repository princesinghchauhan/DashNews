
'use client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const router = useRouter();

        useEffect(() => {
            const user = localStorage.getItem('token'); // Or check your auth state or token
            if (!user) {
                // If user is not authenticated, redirect to login
                router.push('/login');
            } else {
                setIsAuthenticated(true);
            }
        }, []);

        // While checking authentication, you can show a loading spinner or nothing at all
        if (!isAuthenticated) {
            return <div>Loading...</div>;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
