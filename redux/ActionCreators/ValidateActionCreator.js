import Axios from "axios";
import { loaderActions } from "../slice/loaderSlice";
import { SERVERURL } from "../../constants/Environment";

export function generateOTP(email, setEmailAddressValidators) {
    return async (dispatch) => {
        try {
            dispatch(loaderActions.setLoading(true))

            await Axios.get(`${SERVERURL}/emailOtpGenerate/${email}`);
        }
        catch (e) {
            if (e.response)
                setEmailAddressValidators(e.response.data.message)
            else
                setEmailAddressValidators(e.message)
        }
        finally {
            dispatch(loaderActions.setLoading(false))
        }
    }
}



export function validateOTP(email, otp) {
    return async (dispatch) => {
        try {
            dispatch(loaderActions.setLoading(true))

            return await Axios.get(`${SERVERURL}/validateEmailOtp/${email}/${otp}`);
        }
        catch (e) {
            throw e;
        }
        finally {
            dispatch(loaderActions.setLoading(false))
        }
    }
}