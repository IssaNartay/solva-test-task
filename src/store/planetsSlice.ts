import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"

interface Planet {
	name: string
	rotation_period: number
	orbital_period: number
	diameter: number
	climate: string
	url: string
}

interface PlanetState {
	planets: Planet[]
	loading: boolean
	currentPage: number
	totalPages: number
}

const initialState: PlanetState = {
	planets: [],
	loading: false,
	currentPage: 1,
	totalPages: 0,
}

export const fetchPlanetsData = createAsyncThunk(
	"planets/fetchPlanetsData",
	async (page: number) => {
		const response = await axios.get(
			`https://swapi.dev/api/planets/?page=${page}`
		)
		return {
			planets: response.data.results,
			totalPages: Math.ceil(response.data.count / 10),
		}
	}
)

const planetsSlice = createSlice({
	name: "planets",
	initialState,
	reducers: {
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPlanetsData.pending, (state) => {
				state.loading = true
			})
			.addCase(fetchPlanetsData.fulfilled, (state, action) => {
				state.loading = false
				state.planets = action.payload.planets
				state.totalPages = action.payload.totalPages
			})
			.addCase(fetchPlanetsData.rejected, (state) => {
				state.loading = false
			})
	},
})

export const { setCurrentPage } = planetsSlice.actions
export default planetsSlice.reducer
