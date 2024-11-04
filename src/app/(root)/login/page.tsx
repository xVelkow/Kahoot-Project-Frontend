"use client";

import { Button } from "@/components/Button";
import { H1 } from "@/components/H1";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { loginFormActions, loginFormInitialState, loginFormReducer } from "@/reducers/loginFormReducer";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useReducer } from "react";

export default function Login(){

    const [state, dispatch] = useReducer(loginFormReducer, loginFormInitialState)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch({ type: loginFormActions.UPDATE_FIELD, field: name, value });
        if(!value) dispatch({ type: loginFormActions.SET_ERROR, field: name, error: "Please fill out this field." });
        else dispatch({ type: loginFormActions.SET_ERROR, field: name, error: "" });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let isValid = true;
        const { email, password } = state;

        if(!email){
            dispatch({ type: loginFormActions.SET_ERROR, field: "email", error: "Please enter your email address." });
            isValid = false;
        } else dispatch({ type: loginFormActions.SET_ERROR, field: "email", error: "" });

        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            dispatch({ type: loginFormActions.SET_ERROR, field: "email", error: "Please enter a valid email address." });
            isValid = false;
        } else dispatch({ type: loginFormActions.SET_ERROR, field: "email", error: "" });

        if(!password){
            dispatch({ type: loginFormActions.SET_ERROR, field: "password", error: "Please enter your password." });
            isValid = false;
        } else dispatch({ type: loginFormActions.SET_ERROR, field: "password", error: "" });

        if(!isValid) return;

        try{
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, { email, password }, { withCredentials: true, headers: { "Content-Type": "application/json" } });
            dispatch({ type: loginFormActions.RESET_FORM });
        }catch(err: unknown){
            const axiosError = err as AxiosError;
            const errorMessage = axiosError.response && axiosError.response.data ? (axiosError.response.data as { message: string }).message : "An error occurred.";
            dispatch({ type: loginFormActions.SET_ERROR, field: "email", error: errorMessage });
            dispatch({ type: loginFormActions.SET_ERROR, field: "password", error: errorMessage });
        }
    }

    return <main className="grid place-items-center h-screen bg-secondary-dark">
        <form onSubmit={handleSubmit} noValidate className="w-fit p-6 md:p-10 flex flex-col justify-center items-start gap-y-8 bg-primary-dark rounded-md">
            <H1 variant="form">Sign in</H1>
            <p className="text-sm text-primary-light font-light">Don't have an account? <Link href="/register" className="text-primary underline font-medium">Sign up</Link></p>
            <div className="input-holder">
                <Label
                    htmlFor="email" errorMessage={state.errors.email}
                    variant={state.errors.email ? "error" : "default"}
                >E-Mail Address</Label>
                <Input
                    type="email" id="email" name="email" placeholder="E-Mail address" autoComplete="off"
                    size="md" value={state.email} onChange={handleChange}
                    variant={state.errors.email ? "error" : "default"}
                />
            </div>
            <div className="input-holder">
                <Label
                    htmlFor="password" errorMessage={state.errors.password}
                    variant={state.errors.password ? "error" : "default"}
                >Password</Label>
                <Input
                    type="password" id="password" name="password" placeholder="Password" autoComplete="off"
                    size="md" value={state.password} onChange={handleChange}
                    variant={state.errors.password ? "error" : "default"}
                />
                <p className="text-xs font-light text-primary-light self-end">Forgot your password?</p>
            </div>
            <Button width="full">Sign in</Button>
        </form>
    </main>
}