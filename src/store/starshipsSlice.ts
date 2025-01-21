import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"

interface Starship {
	name: string
	model: string
	manufacturer: string
	cost_in_credits: number
	length: number
	url: string
}

interface StarshipsState {
	starships: Starship[]
	loading: boolean
	currentPage: number
	totalPages: number
}

const initialState: StarshipsState = {
	starships: [],
	loading: false,
	currentPage: 1,
	totalPages: 0,
}

export const fetchStarshipsData = createAsyncThunk(
	"starships/fetchStarshipsData",
	async (page: number) => {
		const response = await axios.get(
			`https://swapi.dev/api/starships/?page=${page}`
		)
		return {
			starships: response.data.results,
			totalPages: Math.ceil(response.data.count / 10),
		}
	}
)

const starshipsSlice = createSlice({
	name: "starships",
	initialState,
	reducers: {
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchStarshipsData.pending, (state) => {
				state.loading = true
			})
			.addCase(fetchStarshipsData.fulfilled, (state, action) => {
				state.loading = false
				state.starships = action.payload.starships
				state.totalPages = action.payload.totalPages
			})
			.addCase(fetchStarshipsData.rejected, (state) => {
				state.loading = false
			})
	},
})

export const { setCurrentPage } = starshipsSlice.actions
export default starshipsSlice.reducer
