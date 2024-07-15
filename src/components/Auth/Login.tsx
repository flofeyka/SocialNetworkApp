import { Button, Checkbox, Input, Modal, ModalContent } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { LoginSystem } from "../../redux/authSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { useState } from "react";

type FormValues = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha: string;
}

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const captchaUrl = useSelector((state: RootState) => state.Auth.captchaUrl);
    const [openned, setOpen] = useState<boolean>(false);

    if (captchaUrl) {
        setOpen(true);
    }

    const dispatch = useAppDispatch();
    const onSubmit = handleSubmit((data: {
        email: string;
        password: string;
        rememberMe: boolean;
        captcha: string
    }) => dispatch(LoginSystem({
        email: data.email, password: data.password,
        rememberMe: data.rememberMe, captcha: data.captcha
    })));

    return <form onSubmit={onSubmit}>
        <div className={"h-screen flex flex-col justify-center items-center bg-[aliceblue]"}>
            <div className={"shadow-2xl border-solid min-h-[55%] max-h-[80%] min-w-[24%] max-w-[100%] justify-center items-center flex flex-col rounded-2xl border-black bg-[white] p-5"}>
                <div className={"text-7xl font-semibold my-5"}>Вход</div>
                <Input isInvalid={errors.email && errors.email.type === "required" && true} size={"lg"} {...register("email", { required: true })} className={"my-2"} label={"Электронная почта"} />
                <Input isInvalid={errors.password && errors.password.type === "required" && true} errorMessage={errors && "Неправильный логин или пароль"} size={"lg"} {...register("password", { required: true })} className={"mb-2"} label={"Пароль"} />
                <div className="flex">
                    <Checkbox {...register("rememberMe")} className={"text-sm"}>Запомнить меня</Checkbox>
                    <NavLink to="/forgot-password" className="text-primary-500 font-bold">Забыли пароль?</NavLink>
                </div>
                <Button className={"font-semibold my-2 w-full"} color={"primary"} type={"submit"} size={"lg"}>Войти</Button>
                <div>
                    Нет аккаунта? <NavLink className={"text-primary-500 font-bold"} to={"/register"}>Создайте аккаунт</NavLink>
                </div>
            </div>
        </div>
    </form>

}