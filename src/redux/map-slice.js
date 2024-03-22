import { createSlice } from '@reduxjs/toolkit'

export const mapSlice = createSlice({
  name: 'map',
  initialState: {
    pinElement: {}
  },
  reducers: {
    // Actualiza la lista de elementos de pin (pinElements) con los datos proporcionados:
    // State: el estado actual del slice
    // Action: el objeto de acción que fue despachado
    loadData: (state, action) => {
      state.pinElements = action.payload
    },
    selectLocation: (state, action) => {
      state.selectedLocation = action.payload
    },
    resetMap: (state) => {
      state.selectedLocation = null
    }
  }
})

export const { loadData, selectLocation, resetMap } = mapSlice.actions

export default mapSlice.reducer
