import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../store/store"
import { fetchStarshipsData } from "../../store/starshipsSlice"
import styles from "./Starships.module.scss"
import { Link } from 'react-router-dom'
import { RotatingLines } from "react-loader-spinner"
import { useNavigate } from "react-router-dom"


const Starships = () => {
	const dispatch = useDispatch()
	const { starships, loading, currentPage, totalPages } = useSelector(
		(state: RootState) => state.starships
	)
	const navigate = useNavigate()

	useEffect(() => {
		dispatch(fetchStarshipsData(currentPage))
	}, [dispatch, currentPage])

	const handlePageChange = (page: number) => {
		dispatch({ type: "starships/setCurrentPage", payload: page })
	}

	const handleRowClick = (url: string) => {
		const id = url.split("/").filter(Boolean).pop()
		navigate(`/starships/${id}`)
	}
	return (
		<div className={styles.pageContainer}>
			<Link to="/home">
				<button className={styles.button}>Назад</button>
			</Link>
			<h1>Корабли</h1>
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
								<th>Модель</th>
								<th>Производитель</th>
								<th>Стоимость в кредитах</th>
								<th>Длина</th>
							</tr>
						</thead>
						<tbody>
							{starships.map((starship) => (
								<tr
									key={starship.name}
									onClick={() => handleRowClick(starship.url)}
								>
									<td>{starship.name}</td>
									<td>{starship.model}</td>
									<td>{starship.manufacturer}</td>
									<td>{starship.cost_in_credits}</td>
									<td>{starship.length}</td>
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

export default Starships
