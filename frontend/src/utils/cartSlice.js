import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
     initialState: {
        items: [],
     },
     reducers: {
        addItem: (state, action)=>{
            console.log(action);
            state.items.push(action.payload.product);

        },
        clearCart: (state) =>{
            state.items = [];
        },
        removeItem: (state,action) =>{
            state.items.pop();
        }
     }
})

export const {addItem, removeItem, clearCart} = cartSlice.actions;
export default cartSlice.reducer;