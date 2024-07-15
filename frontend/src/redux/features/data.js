import { createSlice } from "@reduxjs/toolkit";


const initialState =  {
    currentUser: JSON.stringify(localStorage.getItem('currentUser')) ,
    currentPage: localStorage.getItem('currentPage') || 'Dashboard',
    admin: [
        {
            name: '',
            email: '',
            password: '',
            user: 'admin'
        }
    ],

    patient: [
        {
            name: '',
            email: '',
            password: '',
            user: 'patient'
        }
    ],

    inventory: [
        {
            name: '',
            id: '',
            qty: '', 
            max : '',
        }
    ]
}


const data = createSlice({
    name: 'data',
    initialState,
    reducers: {
        inventory: (state, action) => {
            state.inventory = state.inventory.map(info => info === action.payload.name ? {...info, [action.payload.name]: action.payload.value}: {...info})
        }, 

        patient: (state, action) => {
            state.patient = state.patient.map(info => info === action.payload.name ? {...info, [action.payload.name]: action.payload.value}: {...info})
        }, 
        
        admin: (state, action) => {
            state.admin = state.admin.map(info => info === action.payload.name ? {...info, [action.payload.name]: action.payload.value}: {...info})
        }, 

        currentUser: (state, action) => {
            state.currentUser = {...action.payload}
        },

        currentPage: (state, action) => {
            state.currentPage = action.payload
        }
    }
})

export default data.reducer

export const {inventory, patient, admin, currentUser, currentPage} = data.actions
