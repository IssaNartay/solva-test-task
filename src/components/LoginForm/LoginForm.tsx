import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { login } from "../../store/authSlice"
import styles from "../LoginForm/LoginForm.module.scss"

interface LoginFormData {
	username: string
	password: string
}

const LoginForm = () => {
	const { register, handleSubmit } = useForm<LoginFormData>()
	const dispatch = useDispatch()

	const onSubmit = (data: LoginFormData) => {
		dispatch(login(data))
	}

	return (
		<div className={styles.loginForm}>
			<form onSubmit={handleSubmit(onSubmit)}>
        <h2>Войдите в аккаунт</h2>
				<div>
					<label>Логин</label>
					<input {...register("username")} />
				</div>
				<div>
					<label>Пароль</label>
					<input {...register("password")} />
				</div>
				<button type="submit">Войти</button>
			</form>
		</div>
	)
}

export default LoginForm
