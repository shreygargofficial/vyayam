import Axios from "axios";
import { logoutActionCreator, setHeader } from "./userActionsCreator"
import { SERVERURL } from "../constants/Environment";
import { loaderActions } from "../slice/loaderSlice";
import { exerciseActions } from "../slice/exerciseSlice";

export function allExercisesFetchActionCreator() {
    return async (dispatch) => {
        try {
            let headers = await setHeader();
            if (!headers) {
                dispatch(logoutActionCreator())
                return;
            }
            dispatch(loaderActions.setLoading(true))
            let response = await Axios.get(`${SERVERURL}/getExercises`, {
                headers: headers
            })
            dispatch(exerciseActions.fetchExerciseData(response.data))
            dispatch(exerciseActions.logError(''))
        }
        catch (e) {
            if (e.response) {
                dispatch(exerciseActions.logError(e.response.data.message))
            }
            else {
                dispatch(exerciseActions.logError(e.message))
            }
        }
        finally {
            dispatch(loaderActions.setLoading(false))
        }
    }
}

export function singleExerciseFetchActionCreator(id) {
    return async (dispatch) => {
        try {
            let headers = await setHeader();
            if (!headers) {
                dispatch(logoutActionCreator())
                return;
            }
            dispatch(loaderActions.setLoading(true))
            let response = await Axios.get(`${SERVERURL}/getExerciseByExerciseId/${id}`, {
                headers: headers
            })
            dispatch(exerciseActions.myExercise(response.data))
            dispatch(exerciseActions.logError(''))
        }
        catch (e) {
            if (e.response) {
                dispatch(exerciseActions.logError(e.response.data.message))
            }
            else {
                dispatch(exerciseActions.logError(e.message))
            }
        }
        finally {
            dispatch(loaderActions.setLoading(false))
        }
    }
}


