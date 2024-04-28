import React from 'react';
import styles from "./Register.module.css";
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useAppDispatch } from '../../../redux/ReduxStore';

const Register: React.FC = () => {
    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            email: "",
            login: "",
            password: "",
            repeatPassword: ""
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().trim().required().email(),
            login: Yup.string().trim().required(),
            password: Yup.string().trim().required(),
            repeatPassword: Yup.string().trim().required().oneOf([Yup.ref("password")])
        }),
        onSubmit: (values) => {
            console.log(values);
        }
    })

    return <form onSubmit={formik.handleSubmit}>
        <div className={styles.RegisterBlock}>
            <div className={styles.SignIn}>Регистрация</div>
            <div className={styles.RegisterContainer}>
                <div>
                    <input name={"email"} type="email" placeholder='Электронная почта'
                        value={formik.values.email} onChange={formik.handleChange} />
                </div>
                <div>
                    <input name={"login"} type="text" placeholder='Логин'
                        value={formik.values.login} onChange={formik.handleChange} />
                </div>
                <div>
                    <input name={"password"} type="password" placeholder='Пароль'
                        value={formik.values.password} onChange={formik.handleChange} />
                </div>
                <div>
                    <input name={"repeatPassword"} type="password" placeholder='Повторите пароль'
                        value={formik.values.repeatPassword} onChange={formik.handleChange} />
                </div>
                <div>
                    <button>Зарегистрироваться</button>
                </div>
                <div className={styles.AnAccount}>Уже есть аккаунт? <NavLink to="/login">Авторизоваться</NavLink></div>
            </div>
        </div>
    </form>
};

export default Register;