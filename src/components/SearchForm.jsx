import React, { useRef,useEffect } from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {

  const {setSearchTerm} = useGlobalContext();
  const searchValue = useRef('')

  //function
  const searchCocktail = () => {
    setSearchTerm(searchValue.current.value)
  }

  useEffect(() => {
    searchValue.current.focus()
  }, [])
  //function form
  const handleSubmit = (e) => {
e.preventDefault()
  }
  return (
    <section className="section search">
      <form  className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
        <label htmlFor="name">search your favorite cocktail</label>
        <input type="text" name="name" id="name" ref={searchValue} 
        onChange={searchCocktail}  placeholder='cocktail'/>
        </div>
      </form>
    </section>
  )
}

export default SearchForm
