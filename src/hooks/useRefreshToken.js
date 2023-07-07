import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        // const response = await axios.get('/*endPointRefresh*', {
        //     withCredentials: false
        // });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(auth?.accessToken);
            return { ...prev, accessToken: auth?.accessToken }
        });
        return auth?.accessToken;
    }
    return refresh;
};

export default useRefreshToken;