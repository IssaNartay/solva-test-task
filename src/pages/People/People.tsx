import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../store/store"
import { fetchPeopleData } from "../../store/peopleSlice"
import styles from "./People.module.scss"
import { Link } from "react-router-dom"
import { RotatingLines } from "react-loader-spinner"
import { useNavigate } from "react-router-dom"

const People = () => {
	const dispatch = useDispatch()
	const { people, loading, currentPage, totalPages } = useSelector(
		(state: RootState) => state.people
	)
	const navigate = useNavigate()

	useEffect(() => {
		dispatch(fetchPeopleData(currentPage))
	}, [dispatch, currentPage])

	const handlePageChange = (page: number) => {
		dispatch({ type: "people/setCurrentPage", payload: page })
	}

	const handleRowClick = (url: string) => {
		const id = url.split("/").filter(Boolean).pop()
		navigate(`/people/${id}`)
	}

	return (
		<div className={styles.pageContainer}>
			<Link to="/home">
				<button className={styles.button}>Назад</button>
			</Link>
			<h1>Персонажи</h1>
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
								<th>Имя</th>
								<th>Рост</th>
								<th>Вес</th>
								<th>Дата рождения</th>
							</tr>
						</thead>
						<tbody>
							{people.map((person) => (
								<tr key={person.name} onClick={() => handleRowClick(person.url)}>
									<td>{person.name}</td>
									<td>{person.height}</td>
									<td>{person.mass}</td>
									<td>{person.birth_year}</td>
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

export default People
