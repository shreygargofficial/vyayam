import Axios from "axios";
import { logoutActionCreator, setHeader } from "./userActionsCreator"
import { SERVERURL } from "../constants/Environment";
import { loaderActions } from "../slice/loaderSlice";
import { mealActions } from "../slice/MealsSlice";

export function allMealsFetchActionCreator() {
    return async (dispatch) => {
        try {
            let headers = await setHeader();
            if (!headers) {
                dispatch(logoutActionCreator())
                return;
            }
            dispatch(loaderActions.setLoading(true))
            let response = await Axios.get(`${SERVERURL}/getMeals`, {
                headers: headers
            })
            dispatch(mealActions.fetchMeals(response.data))
            dispatch(mealActions.logError(''))
        }
        catch (e) {
            if (e.response) {
                dispatch(mealActions.logError(e.response.data.message))
            }
            else {
                dispatch(mealActions.logError(e.message))
            }
        }
        finally {
            dispatch(loaderActions.setLoading(false))
        }
    }
}