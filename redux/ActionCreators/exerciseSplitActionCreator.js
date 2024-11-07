import axios from "axios";
import { loaderActions } from "../slice/loaderSlice"
import { snackbarActions } from "../slice/snakbarSlice"
import { logoutActionCreator, setHeader } from "./userActionsCreator"
import { SERVERURL } from "../../constants/Environment";
import { splitActions } from "../slice/splitExerciseSlice";

export function exerciseSplitActionCreator() {
    return async (dispatch) => {
        try {
            let headers = await setHeader();
            if (!headers) {
                dispatch(logoutActionCreator())
                return;
            }
            dispatch(loaderActions.setLoading(true));
            const response = await axios.get(`${SERVERURL}/getSplits`, {
                headers: headers
            })
            dispatch(splitActions.fetchSplit(response.data));
        }
        catch (e) {
            if (e.response) {
                dispatch(snackbarActions.enableSnakBar('Error ' + e.response.data.message))
            }
            else {
                dispatch(snackbarActions.enableSnakBar('Error ' + e.message))
            }

        }
        finally {
            dispatch(loaderActions.setLoading(false))
        }

    }
}