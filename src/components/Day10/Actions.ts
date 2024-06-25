import {INCREMENT,DECREMENT,AppActions} from './types'

export const increment = (): AppActions => ({type: INCREMENT})
export const decrement = (): AppActions => ({type: DECREMENT})