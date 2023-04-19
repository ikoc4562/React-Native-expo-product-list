
import { createContext, useState ,useEffect } from "react";

export const Context = createContext();

const ProductContext =({children})=>{

    const[loading, setLoading]=useState(false);

    const [products, setProducts]= useState([])

    useEffect(()=>{
        setLoading(true)

        async function getProducts(){
            const apiResponse= await fetch('https://dummyjson.com/products');
            const finalData= await apiResponse.json();
            if(finalData){
                setTimeout(()=>{
                    setLoading(false)
                }, 1000)
                setProducts(finalData.products);
       
            }
        }
        getProducts()

    }, [])

    return (
        <Context.Provider value={{products, loading}}>
            {children}
        </Context.Provider>
    )

}

export default ProductContext;