import Axios from "axios";
import { logoutActionCreator, setHeader } from "./userActionsCreator"
import { SERVERURL } from "../../constants/Environment";
import { loaderActions } from "../slice/loaderSlice";
import { dietActions } from "../slice/dietSlice";

export function allDietsFetchActionCreator() {
    return async (dispatch) => {
        try {
            let headers = await setHeader();
            if (!headers) {
                dispatch(logoutActionCreator())
                return;
            }
            dispatch(loaderActions.setLoading(true))
            let response = await Axios.get(`${SERVERURL}/getDiet`, {
                headers: headers
            })
            dispatch(dietActions.fetchDiet(response.data))
            dispatch(dietActions.logDietError(''))
        }
        catch (e) {
            if (e.response) {
                dispatch(dietActions.logDietError(e.response.data.message))
            }
            else {
                dispatch(dietActions.logDietError(e.message))
            }
        }
        finally {
            dispatch(loaderActions.setLoading(false))
        }
    }
}