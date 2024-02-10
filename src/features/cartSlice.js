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
                    if(item.id===action.payload.id){
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
            removeItem:(state, action) => {
            const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
        
            if (itemIndex !== -1) {
                const updatedItems = [...state.items];
                const itemToUpdate = updatedItems[itemIndex];
        
                if (itemToUpdate.quantity > 0) {
                    if (itemToUpdate.quantity === 1) {
                        updatedItems.splice(itemIndex, 1);
                    } else {
                        updatedItems[itemIndex] = {
                            ...itemToUpdate,
                            quantity: itemToUpdate.quantity - 1
                        };
                    }
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
        }
        
        
            
        },
        clearCart: (state) => {
            // Crea un nuevo estado con el carrito vacío
            return {
                ...state,
                items: [],
                total: 0
            };
        }
    }
)

export const {addItem, removeItem,clearCart} = cartSlice.actions

export default cartSlice.reducer