import { GET_RECIPES, ADD_RECIPE, DIET_TYPE_FILTER, ALPHABETICAL_SORT, SCORE_SORT, SEARCH_RECIPE, GET_DIET_TYPES, GET_RECIPE_DETAILS, SET_DETAILS,FILTER_MAY } from '../actions/types'

const initialState = {
    recipes: [],
    allRecipes: [],
    dietTypes: [],
    recipeDetails: []
}


export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_RECIPES:
          return {
            ...state,
            recipes: action.payload,
            allRecipes: action.payload
          };
          case DIET_TYPE_FILTER:
            const allRecipes = state.allRecipes
            const dietsFiltered = action.payload === 'All' ? allRecipes : allRecipes.filter(e => e.diets.includes(action.payload)) 
            return {
                ...state,
                recipes: dietsFiltered
            };

        // case DIET_TYPE_FILTER:
        //   const allRecipes = state.allRecipes;
        //   const diets = allRecipes.map(e => e.diets);          
        //   const filteredByDietType = diets.filter( e => e.toLowerCase() === action.payload )           
        //   return {
        //     ...state,
        //     recipes: filteredByDietType
        //   };

        case ALPHABETICAL_SORT:   
          let sortedRecipes = [...state.recipes]       
          sortedRecipes = action.payload === 'atoz' ?
          state.recipes.sort(function(a, b) {
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            return 0;
          }) :
          state.recipes.sort(function(a, b) {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
            return 0;
          });          
          return {
            ...state,
            recipes: sortedRecipes
          };

        case SCORE_SORT:
          let sortedRecipesByScore = [...state.recipes] 
          sortedRecipesByScore = action.payload === 'asc' ?
          state.recipes.sort(function(a, b) {
            if (a.healthScore > b.healthScore) return 1;
            if (a.healthScore < b.healthScore) return -1;
            return 0;
          }) :
          state.recipes.sort(function(a, b) {
            if (a.healthScore < b.healthScore) return 1;
            if (a.healthScore > b.healthScore) return -1;
            return 0;
          });
          return {
            ...state,
            recipes: sortedRecipesByScore
          };
          case FILTER_MAY :
            var recipeSalud = state.recipes.filter(e => e.healthScore > 70)
            return{
              ...state,
              recipes:recipeSalud
            }

        case SEARCH_RECIPE:
          return {
            ...state,
            recipes: action.payload
          };
            
        case GET_RECIPE_DETAILS:
          return {
            ...state,
            recipeDetails: action.payload,
          };

        case ADD_RECIPE:
          return {
            ...state,
          }

        case GET_DIET_TYPES:
          return {
            ...state,
            dietTypes: action.payload
          }
          case SET_DETAILS :
            return{
                ...state,
                recipeDetails: action.payload
            }
         

        default:
          return state;
    }
  }