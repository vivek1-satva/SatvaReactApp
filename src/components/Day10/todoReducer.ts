import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading : false,
    data : null,
    isError : false
}

export const fetchTodos = createAsyncThunk('fetchTodos',async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    return response.json();
});

const todoSlice = createSlice({
    name : "todo",
    initialState,
    reducers:{},
    extraReducers : (builder) => {
        builder.addCase(fetchTodos.pending,(state,action)=>{
            state.isLoading = true;
        })
        builder.addCase(fetchTodos.fulfilled,(state,action)=>{
            state.data = action.payload
            state.isLoading = false;
        })
        builder.addCase(fetchTodos.rejected,(state,action)=>{
            state.isError = true;
        })
    }
})

// export const {  } = counterSlice.actions
export default todoSlice.reducer

// export const counterReducer = (state = initialState, action: AppActions): AppState => {
//     switch (action.type) {
//         case INCREMENT:
//             return {
//                 counter: state.counter + 1
//             }
//         case DECREMENT:
//             return {
//                 counter: state.counter - 1
//             }
//         default:
//             return state
//     }
// }

