import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading,setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('a') //why
  const [cocktails, setCocktails] = useState([])


  //fetch
  const fetchDrinks = useCallback(async () => {
    setLoading(true) //every time you will fetch something we need to do this
    try {
      const response = await fetch(`${url}${searchTerm}`)
      const data = await response.json()
      const {drinks} = data;
      if (drinks) {
        //parte irritante por asi decirlo
        const newCocktails = drinks.map((item) => {
          const {idDrink,strDrink,strDrinkThumb,strAlcoholic,strGlass} = item;
          return {id:idDrink,name:strDrink,image:strDrinkThumb,info:strAlcoholic,glass:strGlass}
        })
        setCocktails(newCocktails)
      }

      else{
        setCocktails([])
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  },[searchTerm])//evitando infinite loop con useCacllback
  //calling
  useEffect(() => {
   fetchDrinks()
  }, [searchTerm,fetchDrinks]) //evitando el infinite loop colocando fetchDrinks
 //every time search changes, use usse effect  

  return <AppContext.Provider value={{
    loading,
    cocktails,
    setSearchTerm,
  }}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
