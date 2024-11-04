export const loginFormInitialState = {
    email: "",
    password: "",
    errors: {
        email: "",
        password: "",
    }
};

export enum loginFormActions {
    UPDATE_FIELD = "UPDATE_FIELD",
    SET_ERROR = "SET_ERROR",
    RESET_FORM = "RESET_FORM",
}

type Action =
    | { type: loginFormActions.UPDATE_FIELD; field: string; value: string }
    | { type: loginFormActions.SET_ERROR; field: string; error: string }
    | { type: loginFormActions.RESET_FORM };

export function loginFormReducer(state: typeof loginFormInitialState, action: Action){
    switch(action.type){
        case loginFormActions.UPDATE_FIELD:
            return {
                ...state,
                [action.field]: action.value,
            };
        case loginFormActions.SET_ERROR:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.field]: action.error,
                }
            };
        case loginFormActions.RESET_FORM:
            return loginFormInitialState;
        default:
            return state;
    }
};