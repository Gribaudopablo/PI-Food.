import axios from 'axios';
import { GET_RECIPES, GET_RECIPE_DETAILS, DIET_TYPE_FILTER, ALPHABETICAL_SORT, SCORE_SORT, SEARCH_RECIPE, GET_DIET_TYPES, LOCAL_HOST , SET_DETAILS, FILTER_MAY} from './types';

export function getRecipes() {
    return function(dispatch) {
        axios.get(`${LOCAL_HOST}/recipe`)   
    .then((response) => {
        return dispatch({type: GET_RECIPES, payload: response.data})
    }).catch((error) => {
        console.log(error)
    }
    )
}};

export function getRecipesByName(payload) {
    return async function(dispatch) {
        try {
            var response = await axios.get(`${LOCAL_HOST}/recipe?name=${payload}`);
            return dispatch({type: SEARCH_RECIPE, payload: response.data})
        } catch {
            return alert ('Recipe Not Found')
        }
    }
}

export function getDietTypes() {
    return async function(dispatch) {
        try{
            var response = await axios.get(`${LOCAL_HOST}/type`);
            return dispatch({type: GET_DIET_TYPES, payload: response.data.map(d => d.name)});
        } catch (error) {
            console.log(error)
        }
    }
}

export function addRecipe(payload) {
    return async function(dispatch) {
     const response = await axios.post('http://localhost:3001/recipe', payload)
    }
}

export function getRecipeDetails(payload) {
    return async function(dispatch) {
        try {
            var response = await axios.get(`${LOCAL_HOST}/recipe/${payload}`);
            return dispatch({type: GET_RECIPE_DETAILS, payload: response.data})
        } catch (error) {
            console.log(error)
        }
    }
};


export function dietTypeFilter(payload){
    return {
        type: DIET_TYPE_FILTER,
        payload
    }
}



export function aplhabeticalSort(payload) {
    return {
        type: ALPHABETICAL_SORT,
        payload
    }
};

export function scoreSort(payload) {
    return {
        type: SCORE_SORT,
        payload
    }
}
export function setDetailS () {
    return async function (dispatch){
        return dispatch ({
            type: SET_DETAILS,
            recipeDetails: []
        })
    }
}

export function dietsFilter (payload){
    return{
        type: FILTER_MAY,
        payload
    }
 }


