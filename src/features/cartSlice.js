import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name:"cart",
    initialState:{
        user: "UserLogged",
        updatedAt: Date.now().toLocaleString(),
        total: 0,
        items: []
    },
    reducers:{
        addItem: (state, action)=>{
            const isProductInCart = state.items.find(item=>item.id === action.payload.id)
            if(!isProductInCart){
                state.items.push(action.payload)
                const total = state.items.reduce(
                    (acc,current) => acc+= current.price*current.quantity,0
                )
                state.total = total
                state = {
                    ...state,
                    total,
                    updatedAt: Date.now().toLocaleString()
                }
            }else{
                const itemsUpdated = state.items.map(item=>{
                    if(item.id===action.payload.id && action.payload.quantity != 0){
                        item.quantity+=action.payload.quantity
                        return item
                    }
                    return item
                })
                const total = itemsUpdated.reduce(
                    (acc,current) => acc+= current.price*current.quantity,0
                )
                state.total = total
                state= {
                    ...state,
                    items: itemsUpdated,
                    total,
                    updatedAt: Date.now().toLocaleString()
                }
            }
        },
        removeItem: (state, action) => {
            const itemIndex = state.items.findIndex(item => item.id === action.payload.id);

            if (itemIndex !== -1) {
                const updatedItems = [...state.items];
                const itemToUpdate = updatedItems[itemIndex];

                if (itemToUpdate.quantity > 1) {
                    updatedItems[itemIndex] = {
                        ...itemToUpdate,
                        quantity: itemToUpdate.quantity - action.payload.quantity
                    };
                } else {
                    updatedItems.splice(itemIndex, 1);
                }

                const total = updatedItems.reduce(
                    (acc, current) => acc + current.price * current.quantity,
                    0
                );

                return {
                    ...state,
                    items: updatedItems,
                    total,
                    updatedAt: Date.now().toLocaleString()
                };
            }
        },
        clearCart: (state) => {
            return {
                ...state,
                items: [],
                total: 0,
                updatedAt: Date.now().toLocaleString()
            };
        }
    }
}
)

export const {addItem, removeItem,clearCart} = cartSlice.actions

export default cartSlice.reducer