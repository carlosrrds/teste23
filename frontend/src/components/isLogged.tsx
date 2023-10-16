import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

const IsLogged = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storagedToken = localStorage.getItem('access_token') as string
            if (storagedToken) {
                router.push('/plp')
            }
        }
    }, [])


    return <>{children}</>
};

export default IsLogged;