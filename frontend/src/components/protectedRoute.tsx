import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const router = useRouter();

    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('access_token');

        if (token) {
            return <>{children}</>;
        }
    }
    router.push('/')

    return null

};

export default ProtectedRoute;