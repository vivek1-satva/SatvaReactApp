import { Book, BookState } from "./types"

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: BookState = {
  books: []
}

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Book>) => {
      state.books.push(action.payload)
    },
    removeBook: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter(book => book.name !== action.payload)
    },
    editBook: (state, action: PayloadAction<Book>) => {
      state.books.forEach(obj => {
        if (obj.id === action.payload.id) {
            obj.name = action.payload.name;
            obj.description = action.payload.description;
        }
    });
    }
  }
})

export const { addBook, removeBook, editBook } = booksSlice.actions
export default booksSlice.reducer

// export const bookReducer = (state = initialState, action: BookActions): BookState => {
//     switch (action.type) {
//         case AddBook:
//             return {
//                 name: state.name,
//                 description: state.description
//             }
//     }
// }