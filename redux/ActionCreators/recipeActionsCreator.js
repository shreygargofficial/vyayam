import Axios from "axios";
import { logoutActionCreator, setHeader } from "./userActionsCreator"
import { SERVERURL } from "../../constants/Environment";
import { loaderActions } from "../slice/loaderSlice";
import { recipeActions } from "../slice/recipeSlice";

export function allRecipesFetchActionCreator() {
    return async (dispatch) => {
        try {
            let headers = await setHeader();
            if (!headers) {
                dispatch(logoutActionCreator())
                return;
            }
            dispatch(loaderActions.setLoading(true))
            let response = await Axios.get(`${SERVERURL}/getRecipes`, {
                headers: headers
            })
            dispatch(recipeActions.fetchRecipe(response.data))
            dispatch(recipeActions.logError(''))
        }
        catch (e) {
            if (e.response) {
                dispatch(recipeActions.logError(e.response.data.message))
            }
            else {
                dispatch(recipeActions.logError(e.message))
            }
        }
        finally {
            dispatch(loaderActions.setLoading(false))
        }
    }
}