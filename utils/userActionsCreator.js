import Axios from "axios"
import { SERVERURL } from "../constants/Environment"
import { userActions } from "../slice/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loaderActions } from "../slice/loaderSlice";

async function setHeader(token) {

    const headers = {
        "x-platform": 'mobile',
        "bearer": await AsyncStorage.getItem({ token: token })
    }
    return headers;
}

export function loginUserActionCreator(data) {
    return async (dispatch) => {
        try {
            dispatch(loaderActions.setLoading(true))
            let myData = await Axios.post(`${SERVERURL}/loginUser`, data);
            dispatch(userActions.addUserData(myData.data.userData))
            dispatch(userActions.logError(''))

        }
        catch (e) {
            if (e.response) {
                dispatch(userActions.logError(e.response.data.message))

            }
            else {
                dispatch(userActions.logError(e.message))
            }


        }
        finally {
            dispatch(loaderActions.setLoading(false))
        }
    }
}


export function updateUserCreator(userName, data) {
    return async (dispatch) => {
        try {
            dispatch(loaderActions.setLoading(true))
            let myData = await Axios.put(`${SERVERURL}/updateUser/${userName}`, data);
            dispatch(userActions.addUserData(myData.data))
            dispatch(userActions.logError(''))
        }
        catch (e) {
            if (e.response) {
                dispatch(userActions.logError(e.response.data.message))
                // if (e.response?.data?.message?.includes('Forbidden') || e.response?.data?.message?.includes('Not Authorized!'))
                //     dispatch(userActions.deleteUserData())
            }
            else {
                dispatch(userActions.logError(e.message))
            }

        }
        finally {
            dispatch(loaderActions.setLoading(false))
        }
    }
}