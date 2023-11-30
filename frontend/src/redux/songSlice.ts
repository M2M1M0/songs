import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  songs: null,
  error: null,
  loading: false
}

export const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    start: (state) => {
      state.loading = true
    },
    createSongSuccess: (state, action) => {
      state.songs = action.payload
      state.loading = false
      state.error = null
    },
    createSongFailer: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    updateSongSuccess: (state, action) => {
      state.songs = action.payload
      state.loading = false
      state.error = null
    },
    updateSongFailer: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    setSongs: (state, action) => {
      state.songs = action.payload
      state.loading = false
    },
  }
})

// Action creators are generated for each case reducer function
export const {
  start, createSongSuccess, createSongFailer, updateSongSuccess, updateSongFailer, setSongs
} = songSlice.actions

export default songSlice.reducer