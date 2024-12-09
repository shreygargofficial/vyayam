import Axios from "axios";
import { logoutActionCreator, setHeader } from "./userActionsCreator"
import { SERVERURL } from "../../constants/Environment";
import { loaderActions } from "../slice/loaderSlice";
import { supplementActions } from "../slice/supplementSlice";

export function allSupplementsFetchActionCreator() {
    return async (dispatch) => {
        try {
            let headers = await setHeader();
            if (!headers) {
                dispatch(logoutActionCreator())
                return;
            }
            dispatch(loaderActions.setLoading(true))
            let response = await Axios.get(`${SERVERURL}/getSupplements`, {
                headers: headers
            })
            dispatch(supplementActions.fetchSupplement(response.data))
            dispatch(supplementActions.supplementLogError(''))
        }
        catch (e) {
            if (e.response) {
                dispatch(supplementActions.supplementLogError(e.response.data.message))
            }
            else {
                dispatch(supplementActions.supplementLogError(e.message))
            }
        }
        finally {
            dispatch(loaderActions.setLoading(false))
        }
    }
}