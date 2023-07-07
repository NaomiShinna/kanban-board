import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogOut = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        // tidak jadi dipakai karena tidak ada bagian untuk pencatatan status user yang sedang aktif
        /**
        try {
            const response = await axios('/logout', {
                withCredentials: false
            });
        } catch (err) {
            console.error(err);
        }
         */
    }

    return logout;
}

export default useLogOut