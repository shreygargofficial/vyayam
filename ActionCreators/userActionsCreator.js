import Axios from "axios"
import { SERVERURL } from "../constants/Environment"
import { userActions } from "../slice/userSlice";
import { loaderActions } from "../slice/loaderSlice";
import * as SecureStore from 'expo-secure-store';
import { snackbarActions } from "../slice/snakbarSlice";

export async function setHeader() {
    let token = await SecureStore.getItemAsync('token');
    let exp = await SecureStore.getItemAsync('exp');

    if (!token) {
        console.log("Token absent");
        return null;
    }
    if (exp <= Date.now()) {
        console.log("Token expired");
        return null;
    }

    const headers = {
        "x-platform": 'mobile',
        "authorization": `Bearer ${token}`
    }
    return headers;
}

function calculateTokenExpireTimeFromNow(expireDuration) {
    let dayCount = parseInt(expireDuration);
    let milliseconds = dayCount * 24 * 60 * 60 * 1000;
    let currentTime = Date.now();

    let expirationTime = currentTime + milliseconds;
    return expirationTime.toString();
}

export function loginUserActionCreator(data) {
    return async (dispatch) => {
        try {
            dispatch(loaderActions.setLoading(true))
            let myData = await Axios.post(`${SERVERURL}/loginUser`, data, {
                headers: {
                    "x-platform": 'mobile',
                }
            });
            dispatch(userActions.addUserData(myData.data.userData))
            await SecureStore.setItemAsync('token', myData.data.token)

            await SecureStore.setItemAsync('exp', calculateTokenExpireTimeFromNow(myData.data.tokenExpiring))
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
            let headers = await setHeader() //setting headers
            if (!headers) {
                dispatch(logoutActionCreator())
                return;
            }
            dispatch(loaderActions.setLoading(true))
            let myData = await Axios.put(`${SERVERURL}/updateUser/${userName}`, data, {
                headers: headers
            });
            dispatch(userActions.addUserData(myData.data))
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

export function updateWeightForUserCreator(userName, data) {
    return async (dispatch) => {
        try {
            let headers = await setHeader() //setting headers
            if (!headers) {
                dispatch(logoutActionCreator())
                return;
            }
            dispatch(loaderActions.setLoading(true))
            let myData = await Axios.put(`${SERVERURL}/updateWeightForUser/${userName}`, data, {
                headers: headers
            });
            dispatch(userActions.addUserData(myData.data))
        }
        catch (e) {
            console.log(e);
            if (e.response) {
                dispatch(snackbarActions.enableSnakBar('Error ' + e.response.data.message))
                // dispatch(userActions.logError(e.response.data.message))
            }
            else {
                dispatch(snackbarActions.enableSnakBar('Error ' + e.message))
                // dispatch(userActions.logError(e.message))
            }

        }
        finally {
            dispatch(loaderActions.setLoading(false))
        }
    }
}



export function logoutActionCreator() {
    return async (dispatch) => {
        await SecureStore.deleteItemAsync('token');
        dispatch(userActions.logoutUser())
    }
}