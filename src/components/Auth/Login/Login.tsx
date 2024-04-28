import {Button, Input} from "@nextui-org/react";
import {useForm} from "react-hook-form";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {LoginSystem} from "../../../redux/AuthReducer";
import { useAppDispatch } from "../../../redux/ReduxStore";

export default function Login() {
    const {register, handleSubmit} = useForm()
    const dispatch = useAppDispatch();
    const onSubmit = (data: any) => dispatch(LoginSystem({email: data.email, password: data.password}));

    return <form onSubmit={handleSubmit(onSubmit)}>
        <div className={"h-screen flex flex-col justify-center items-center bg-[aliceblue]"}>
            <div className={"shadow-xl border-solid min-h-[55%] max-h-[80%] min-w-[22%] max-w-[100%] justify-center items-center flex flex-col rounded-xl border-black bg-[white] p-5"}>
                <div className={"text-7xl font-semibold my-5"}>Вход</div>
                <Input size={"lg"} {...register("email", {required: true})} className={"my-2"} label={"Электронная почта"}/>
                <Input size={"lg"} {...register("password", {required: true})} className={"mb-2"} label={"Пароль"}/>
                <Button className={"font-semibold my-2"} color={"primary"} type={"submit"} size={"lg"}>Войти</Button>
                <div>
                    Нет аккаунта? <NavLink className={"text-primary-500 font-bold"} to={"/register"}>Создайте аккаунт</NavLink>
                </div>
            </div>
        </div>
    </form>

}