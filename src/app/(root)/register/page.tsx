'use client';

import { Label } from "@/components/Label";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useReducer } from "react";
import { registerFormActions, registerFormInitialState, registerFormReducer } from "@/reducers/registerFormReducer";

export default function Register() {

    const [state, dispatch] = useReducer(registerFormReducer, registerFormInitialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch({ type: registerFormActions.UPDATE_FIELD, field: name, value });
        if(!value) dispatch({ type: registerFormActions.SET_ERROR, field: name, error: `This field is required` });
        else dispatch({ type: registerFormActions.SET_ERROR, field: name, error: "" });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let isValid = true;
        const { fname, lname, email, password, confirmPassword } = state;

        if(!fname){
            dispatch({ type: registerFormActions.SET_ERROR, field: "fname", error: "First name is required" });
            isValid = false;
        } else dispatch({ type: registerFormActions.SET_ERROR, field: "fname", error: "" });

        if(!lname){
            dispatch({ type: registerFormActions.SET_ERROR, field: "lname", error: "Last name is required" });
            isValid = false;
        } else dispatch({ type: registerFormActions.SET_ERROR, field: "lname", error: "" });

        if(!email){
            dispatch({ type: registerFormActions.SET_ERROR, field: "email", error: "E-Mail is required" });
            isValid = false;
        } else dispatch({ type: registerFormActions.SET_ERROR, field: "email", error: "" });

        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            dispatch({ type: registerFormActions.SET_ERROR, field: "email", error: "Invalid E-Mail address" });
            isValid = false;
        } else dispatch({ type: registerFormActions.SET_ERROR, field: "email", error: "" });

        if(!password){
            dispatch({ type: registerFormActions.SET_ERROR, field: "password", error: "Password is required" });
            isValid = false;
        } else dispatch({ type: registerFormActions.SET_ERROR, field: "password", error: "" });

        if(!confirmPassword){
            dispatch({ type: registerFormActions.SET_ERROR, field: "confirmPassword", error: "Confirm password is required" });
            isValid = false;
        } else dispatch({ type: registerFormActions.SET_ERROR, field: "confirmPassword", error: "" });

        if(password.length < 8){
            dispatch({ type: registerFormActions.SET_ERROR, field: "password", error: "Password must be at least 8 characters" });
            isValid = false;
        } else dispatch({ type: registerFormActions.SET_ERROR, field: "password", error: "" });

        if(password !== confirmPassword || (confirmPassword === password && confirmPassword.length < 8)){
            dispatch({ type: registerFormActions.SET_ERROR, field: "confirmPassword", error: "Passwords do not match" });
            isValid = false;
        } else dispatch({ type: registerFormActions.SET_ERROR, field: "confirmPassword", error: "" });

        if(!isValid) return;
        
    }

    return <main className="grid place-items-center h-screen bg-secondary-dark">
        <form onSubmit={handleSubmit} noValidate className="w-fit p-6 md:p-10 flex flex-col justify-center items-start gap-y-8 bg-primary-dark rounded-md">
            <div className="text-3xl md:text-4xl font-medium text-primary-light">Create an account</div>
            <div className="text-sm text-primary-light font-light">Already have an account? <span className="text-primary underline font-medium">Log in</span></div>
            <div className="space-y-3 w-full">
                <div className="input-group w-full">
                    <div className="input-holder w-full">
                        <Label
                            htmlFor="fname" errorMessage={state.errors.fname}
                            variant={state.errors.fname ? "error" : "default"}
                        >First Name</Label>
                        <Input
                            type="text" id="fname" name="fname" placeholder="First name"
                            autoComplete="none" onChange={handleChange}
                            variant={state.errors.fname ? "error" : "default"}
                        />
                    </div>
                    <div className="input-holder">
                        <Label
                            htmlFor="lname" errorMessage={state.errors.lname}
                            variant={state.errors.lname ? "error" : "default"}
                        >Last Name</Label>
                        <Input
                            type="text" id="lname" name="lname" placeholder="Last name"
                            autoComplete="none" onChange={handleChange}
                            variant={state.errors.lname ? "error" : "default"}
                        />
                    </div>
                </div>
                <div className="input-holder">
                    <Label
                        htmlFor="email" errorMessage={state.errors.email}
                        variant={state.errors.email ? "error" : "default"}
                    >E-Mail Address</Label>
                    <Input
                        type="email" id="email" name="email" placeholder="E-Mail address"
                        autoComplete="off" onChange={handleChange}
                        size={"lg"} variant={state.errors.email ? "error" : "default"}
                    />
                </div>
                <div className="input-group">
                    <div className="input-holder">
                        <Label
                            htmlFor="password" errorMessage={state.errors.password}
                            variant={state.errors.password ? "error" : "default"}
                        >Password</Label>
                        <Input
                            type="password" id="password" name="password" placeholder="Password"
                            autoComplete="off" onChange={handleChange}
                            variant={state.errors.password ? "error" : "default"}
                        />
                    </div>
                    <div className="input-holder">
                        <Label
                            htmlFor="confirmPassword" errorMessage={state.errors.confirmPassword}
                            variant={state.errors.confirmPassword ? "error" : "default"}
                        >Confirm Password</Label>
                        <Input
                            type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm password"
                            autoComplete="off" onChange={handleChange}
                            variant={state.errors.confirmPassword ? "error" : "default"}
                        />
                    </div>
                </div>
            </div>
            <Button className="w-full">Create account</Button>
        </form>
    </main>
}