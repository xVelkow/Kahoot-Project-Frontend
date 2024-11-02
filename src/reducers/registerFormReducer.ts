export const registerFormInitialState = {
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: {
        fname: "",
        lname: "",
        email: "",
        password: "",
        confirmPassword: "",
    }
}

export enum registerFormActions {
    UPDATE_FIELD = "UPDATE_FIELD",
    SET_ERROR = "SET_ERROR",
    RESET_FORM = "RESET_FORM",
}

type Action =
  | { type: registerFormActions.UPDATE_FIELD; field: string; value: string }
  | { type: registerFormActions.SET_ERROR; field: string; error: string }
  | { type: registerFormActions.RESET_FORM };

export function registerFormReducer(state: typeof registerFormInitialState, action: Action) {
    switch(action.type){
        case registerFormActions.UPDATE_FIELD:
            return {
                ...state,
                [action.field]: action.value,
            }
        case registerFormActions.SET_ERROR:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.field]: action.error,
                },
            }
        case registerFormActions.RESET_FORM:
            return registerFormInitialState;
        default:
            return state;
    }
}