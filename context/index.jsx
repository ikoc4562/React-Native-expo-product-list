
import { createContext, useState ,useEffect } from "react";

export const Context = createContext();

const ProductContext =({children})=>{


    const [user, setUser]= useState({})
    const [dataLists, setDataLists]= useState({})
    const [inActiveLists, setInActiveLists]= useState({})

    const [formData, setFormData]=useState({
        username:'',
        password:''});


    return (
        <Context.Provider value={{ user , setUser ,
            dataLists, setDataLists, setFormData, formData, setInActiveLists, inActiveLists}}>
            {children}
        </Context.Provider>
    )

}

export default ProductContext;