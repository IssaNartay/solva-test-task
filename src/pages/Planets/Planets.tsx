import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../store/store"
import { fetchPlanetsData } from "../../store/planetsSlice"
import styles from "./Planets.module.scss"
import { Link } from "react-router-dom"
import { RotatingLines } from "react-loader-spinner"
import { useNavigate } from "react-router-dom"

const Planets = () => {
	const dispatch = useDispatch()
	const { planets, loading, currentPage, totalPages } = useSelector(
		(state: RootState) => state.planets
	)
	const navigate = useNavigate()

	useEffect(() => {
		dispatch(fetchPlanetsData(currentPage))
	}, [dispatch, currentPage])

	const handlePageChange = (page: number) => {
		dispatch({ type: "planets/setCurrentPage", payload: page })
	}
	const handleRowClick = (url: string) => {
		const id = url.split("/").filter(Boolean).pop()
		navigate(`/planets/${id}`)
	}

	return (
		<div className={styles.pageContainer}>
			<Link to="/home">
				<button className={styles.button}>Назад</button>
			</Link>
			<h1>Планеты</h1>
			{loading ? (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "70vh",
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
			) : (
				<>
					<table>
						<thead>
							<tr>
								<th>Название</th>
								<th>Период ротации</th>
								<th>Период орбиты</th>
								<th>Диаметр</th>
								<th>Климат</th>
							</tr>
						</thead>
						<tbody>
							{planets.map((planet) => (
								<tr
									key={planet.name}
									onClick={() => handleRowClick(planet.url)}
								>
									<td>{planet.name}</td>
									<td>{planet.rotation_period}</td>
									<td>{planet.orbital_period}</td>
									<td>{planet.diameter}</td>
									<td>{planet.climate}</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className={styles.pagination}>
						{Array.from({ length: totalPages }, (_, index) => (
							<button
								key={index + 1}
								onClick={() => handlePageChange(index + 1)}
								disabled={index + 1 === currentPage}
							>
								{index + 1}
							</button>
						))}
					</div>
				</>
			)}
		</div>
	)
}

export default Planets
