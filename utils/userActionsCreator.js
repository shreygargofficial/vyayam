import Axios from "axios"
import { SERVERURL } from "../constants/Environment"
import { userActions } from "../slice/userSlice";

export function userActionCreator(data) {
    return async (dispatch) => {
        try {
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
    }
}


export function updateUserCreator(userName, data) {
    return async (dispatch) => {
        try {
            let myData = await Axios.put(`${SERVERURL}/updateUser/${userName}`, data);
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
    }
}