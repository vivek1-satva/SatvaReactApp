export interface AppState{
    counter : number
}

export const INCREMENT = "INCREMENT"
export const DECREMENT = "DECREMENT"

interface IncrementAction {
    type : typeof INCREMENT
}

interface DecrementAction {
    type : typeof DECREMENT
}

export type AppActions = IncrementAction | DecrementAction

export interface Book{
    id : string,
    name : string,
    description : string
}

export interface BookState{
    books : Book[]
}

export const AddBook = "AddBook"

interface AddBook {
    type : typeof AddBook
}

export type BookActions = AddBook