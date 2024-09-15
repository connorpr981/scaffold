import { useState, useEffect } from 'react';
import { NextRouter } from 'next/router'; // Import NextRouter

export const useFetchProjects = (status: string, router: NextRouter) => { // Specify NextRouter type
    const [projects, setProjects] = useState<Array<{ id: number; name: string }>>([]); 
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/get-projects');
                if (response.ok) {
                    const data = await response.json();
                    setProjects(data.projects);
                } else {
                    throw new Error('Failed to fetch projects');
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
                // Handle error (e.g., show notification)
            } finally {
                setIsLoading(false);
            }
        };

        if (status === 'authenticated') {
            fetchProjects();
        } else if (status === 'unauthenticated') {
            router.push('/auth/signin');
        }
    }, [status, router]);

    return { projects, isLoading };
};