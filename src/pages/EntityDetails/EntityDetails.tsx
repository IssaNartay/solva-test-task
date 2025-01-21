import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useForm, SubmitHandler } from "react-hook-form"
import styles from "./EntityDetails.module.scss"
import { Link } from "react-router-dom"
import { RotatingLines } from "react-loader-spinner"

interface Entity {
	name: string
	height?: string
	mass?: string
	birth_year?: string
	model?: string
	manufacturer?: string
	cost_in_credits?: number
	length?: number
	rotation_period?: number
	orbital_period?: number
	diameter?: number
	climate?: string
}

interface EntityFormInputs {
	name: string
	height?: string
	mass?: string
	birth_year?: string
	model?: string
	manufacturer?: string
	cost_in_credits?: number
	length?: number
	rotation_period?: number
	orbital_period?: number
	diameter?: number
	climate?: string
}

const EntityDetails = () => {
	const { id, entityType } = useParams<{ id: string; entityType: string }>()  
	const [entity, setEntity] = useState<Entity | null>(null)
	const { register, handleSubmit, reset } = useForm<EntityFormInputs>()

	useEffect(() => {
		fetch(`https://swapi.dev/api/${entityType}/${id}/`)
			.then((res) => res.json())
			.then((data) => {
				setEntity(data)
				reset(data)
			})
	}, [id, entityType, reset])

	const onSubmit: SubmitHandler<EntityFormInputs> = (data) => {
		setEntity({ ...entity, ...data })
		console.log("Измененные данные:", data)
	}

	return (
		<div className={styles.container}>
			<Link to={-1}>
				<button className={styles.button}>Назад</button>
			</Link>
			<h1>Детали сущности {entity?.name || "Entity"}</h1>
			{entity ? (
				<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
					<div className={styles.field}>
						<label>Имя:</label>
						<input {...register("name")} defaultValue={entity.name} />
					</div>
					{entity.height && (
						<div className={styles.field}>
							<label>Рост:</label>
							<input {...register("height")} defaultValue={entity.height} />
						</div>
					)}
					{entity.mass && (
						<div className={styles.field}>
							<label>Вес:</label>
							<input {...register("mass")} defaultValue={entity.mass} />
						</div>
					)}
					{entity.birth_year && (
						<div className={styles.field}>
							<label>Дата рождение:</label>
							<input
								{...register("birth_year")}
								defaultValue={entity.birth_year}
							/>
						</div>
					)}
					{entity.model && (
						<div className={styles.field}>
							<label>Модель:</label>
							<input {...register("model")} defaultValue={entity.model} />
						</div>
					)}
					{entity.manufacturer && (
						<div className={styles.field}>
							<label>Производитель:</label>
							<input
								{...register("manufacturer")}
								defaultValue={entity.manufacturer}
							/>
						</div>
					)}
					{entity.cost_in_credits && (
						<div className={styles.field}>
							<label>Стоимость в кредитах:</label>
							<input
								{...register("cost_in_credits")}
								defaultValue={entity.cost_in_credits}
							/>
						</div>
					)}
					{entity.length && (
						<div className={styles.field}>
							<label>Длина:</label>
							<input {...register("length")} defaultValue={entity.length} />
						</div>
					)}
					{entity.rotation_period && (
						<div className={styles.field}>
							<label>Период ротации:</label>
							<input
								{...register("rotation_period")}
								defaultValue={entity.rotation_period}
							/>
						</div>
					)}
					{entity.orbital_period && (
						<div className={styles.field}>
							<label>Период орбиты:</label>
							<input
								{...register("orbital_period")}
								defaultValue={entity.orbital_period}
							/>
						</div>
					)}
					{entity.diameter && (
						<div className={styles.field}>
							<label>Диаметр:</label>
							<input {...register("diameter")} defaultValue={entity.diameter} />
						</div>
					)}
					{entity.climate && (
						<div className={styles.field}>
							<label>Климат:</label>
							<input {...register("climate")} defaultValue={entity.climate} />
						</div>
					)}
					<button type="submit" className={styles.submitButton}>
						Сохранить изменения
					</button>
				</form>
			) : (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "50vh",
					}}
				>
					<RotatingLines
						visible={true}
						height="96"
						width="96"
						color="red"
						strokeWidth="5"
						animationDuration="0.75"
						ariaLabel="rotating-lines-loading"
						wrapperStyle={{}}
						wrapperClass=""
					/>
				</div>
			)}
		</div>
	)
}

export default EntityDetails
