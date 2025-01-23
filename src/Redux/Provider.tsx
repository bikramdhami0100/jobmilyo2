"use client"
import {Provider} from "react-redux"
import { store } from "./store"
export function MyProviders({children}:any){
    return(
        <Provider  store={store}>
             {children}
        </Provider>
    )
}