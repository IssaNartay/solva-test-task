import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"

interface Person {
	name: string
	height: string
	mass: string
	birth_year: string
	url: string
}

interface PeopleState {
	people: Person[]
	loading: boolean
	currentPage: number
	totalPages: number
}

const initialState: PeopleState = {
	people: [],
	loading: false,
	currentPage: 1,
	totalPages: 0,
}

export const fetchPeopleData = createAsyncThunk(
	"people/fetchPeopleData",
	async (page: number) => {
		const response = await axios.get(
			`https://swapi.dev/api/people/?page=${page}`
		)
		return {
			people: response.data.results,
			totalPages: Math.ceil(response.data.count / 10),
		}
	}
)

const peopleSlice = createSlice({
	name: "people",
	initialState,
	reducers: {
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPeopleData.pending, (state) => {
				state.loading = true
			})
			.addCase(fetchPeopleData.fulfilled, (state, action) => {
				state.loading = false
				state.people = action.payload.people
				state.totalPages = action.payload.totalPages
			})
			.addCase(fetchPeopleData.rejected, (state) => {
				state.loading = false
			})
	},
})

export const { setCurrentPage } = peopleSlice.actions
export default peopleSlice.reducer
