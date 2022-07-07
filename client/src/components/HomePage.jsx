import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, dietTypeFilter, aplhabeticalSort, scoreSort,  dietsFilter } from '../actions';
import Recipe from './Recipe';
import { Link } from 'react-router-dom'
import Paged from './Paged';
import SearchBar from './SearchBar';
import './home.css'


let prevId = 1;

export default function Home() {
    
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    
    const [order, setOrder] = useState('')
    
    
    const [page, setPage] = useState(1);
    const [recipesPage, setRecipesPage] = useState(9);
    
    const quantityRecipesPage = page * recipesPage; // 9 
    const firstRecipePage = quantityRecipesPage - recipesPage; //0
    const showRecipesPage = allRecipes.slice(firstRecipePage, quantityRecipesPage);
    
    const paged = function(pageNumber) {
        setPage(pageNumber)
    };


    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch]);


    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes());
        // setPage(1);
    }

    function handleDietTypeFilter(e) {
        e.preventDefault();
        dispatch(dietTypeFilter(e.target.value))
         setPage(1);
    }

    function handleAlphabeticalSort(e) {
        e.preventDefault();                
        dispatch(aplhabeticalSort(e.target.value))
        setPage(1);
         setOrder(`Order ${e.target.value}`);
    }
    
    function handleScoreSort(e) {
        e.preventDefault();                
        dispatch(scoreSort(e.target.value));
        setPage(1);
        setOrder(`Order ${e.target.value}`);
    }
    function handleScrore(e) {
        e.preventDefault();
        dispatch(dietsFilter(e.target.value))
        setPage(1);
    }

    return(
        <div className="home">
            <h1 className="initialMsg">Let's do it!</h1>
            <div>
                <button onClick={handleScrore}>holaa</button>
                <button className="refreshButton" onClick={handleClick}>Refresh recipes</button>
                <Link to="/recipe">
                    <button className="addButton">Add new recipe</button>
                </Link>
            </div>
            <div className="select">
                <label className="filters">Sort:</label>
                <select className="select" name="alphabetical" onChange={e => handleAlphabeticalSort(e)}>
                    <option defaultValue value>opciones...</option>
                    <option value="atoz">A to Z</option>
                    <option value="ztoa">Z to A</option>
                </select>
                <select className="select" name="numerical" onChange={e => handleScoreSort(e)}>
                    <option defaultValue value>Score</option>
                    <option value="asc">From Min to Max</option>
                    <option value="desc">From Max to Min</option>
                </select>
                <label className="filters">Diet Types:</label>
                <select className="select" name="diets" onChange={e => handleDietTypeFilter(e)}>
                    <option defaultValue value>Select...</option>
                    <option value='All'>All Recipes</option>
                    <option value="gluten free">Gluten Free</option>
                    <option value="ketogenic">Keto</option>
                    <option value="lacto ovo vegetarian">Vegetarian</option>
                    <option value="lacto ovo vegetarian">Ovo-Vegetarian</option>
                    <option value="lacto ovo vegetarian">Lacto-Ovo-Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="paleolithic">Paleo</option>
                    <option value="primal">Primal</option>
                    <option value="whole 30">Whole30</option>
                    <option value="dairy free">Dairy Free</option>
                </select>
            </div>

            <Paged recipesPage={recipesPage} allRecipes={allRecipes.length} paged={paged}/>
           
            <SearchBar/>

            <div className="allrecipes">
            {
                showRecipesPage?.map(e => {
                    return (
                        <div className="eachRecipe" key={prevId++}>
                            <Link className="linkRecetas" to={`home/${e.id}`}>
                                <Recipe
                                    image={e.image ? 
                                        e.image :
                                        'https://images.unsplash.com/photo-1635321593217-40050ad13c74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1748&q=80'}
                                    name={e.name}                             
                                    dietTypes={e.dietTypes} />
                            </Link>
                        </div>
                    )
                })
            }
            </div>            
            
            <Paged recipesPage={recipesPage} allRecipes={allRecipes.length} paged={paged}/>

        </div>






    )
}