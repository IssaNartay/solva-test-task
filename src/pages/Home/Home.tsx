import styles from "./Home.module.scss"
import { Link } from "react-router-dom"
import peopleImg from "../../assets/images/people.jpg"
import planetsImg from "../../assets/images/planets.jpg"
import starshipsImg from "../../assets/images/starships.webp"
import { logout } from '../../store/authSlice'
import { useDispatch } from 'react-redux'
const Home = () => {

	const dispatch = useDispatch()
	return (
		<div className={styles.pageContainer}>
			<h1>Добро пожаловать на SWAPI Исследование</h1>
			<p className={styles.description}>
				Исследуйте персонажей, планеты и звездолеты из вселенной «Звездных
				войн». Нажмите кнопки ниже, чтобы перейти к различным разделам.
			</p>
			<div className={styles.cardsContainer}>
				<Link to="/people" className={styles.card}>
					<img src={peopleImg} alt="" />
					<h3>Персонажи</h3>
					<p>
						Познакомьтесь с разнообразными персонажами вселенной «Звездных
						войн».
					</p>
				</Link>
				<Link to="/planets" className={styles.card}>
					<img src={planetsImg} alt="" />
					<h3>Планеты</h3>
					<p>
						Откройте для себя планеты, составляющие галактику «Звездных войн».
					</p>
				</Link>
				<Link to="/starships" className={styles.card}>
					<img src={starshipsImg} alt="" />
					<h3>Корабли</h3>
					<p>
						Узнайте о культовых звездолетах, использованных в саге «Звездные
						войны».
					</p>
				</Link>
			</div>

			<button className={styles.button} onClick={() => dispatch(logout())}>
				Выйти
			</button>
		</div>
	)
}

export default Home
