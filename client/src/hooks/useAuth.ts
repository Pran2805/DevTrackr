import { useQuery } from '@tanstack/react-query';
import { checkAuthStatus } from '@/api/AuthApi';

export const useAuth = () => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["auth-status"],
        queryFn: checkAuthStatus,
        retry: false,
        staleTime: 5 * 60 * 1000,
    });

    const isLoggedIn = data?.success === true && data?.user;
    const user = data?.user || null;

    return {
        isLoggedIn,
        user,
        isLoading,
        error,
        refetch,
    };
};