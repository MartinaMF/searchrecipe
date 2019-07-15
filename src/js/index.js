import Search from './models/Search';
import Recipe from './models/Recipe';
import {elements,renderLoader,clearLoader} from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
/*application state*/
const state = {}
/*Search controller*/
const searchController =  async ()=>{
  //get query
  const query = searchView.getInput();
  //new search objects
  state.search = new Search(query);
  //prepare ui for results
  searchView.clearInput();
  searchView.clearprviousResult();
  renderLoader(elements.searchResDiv);
  //get results
  await state.search.getResults();
  console.log(state.search.result);
  clearLoader();
  searchView.renderResults(state.search.result);
}
elements.searchForm.addEventListener('submit',(event)=>{
  event.preventDefault();
  searchController();
});
elements.searchResPages.addEventListener('click',e => {
  const btn = e.target.closest('.btn-inline');
  if(btn){
    const goToPage = parseInt(btn.dataset.goto,10);
    //clear current page
    searchView.clearprviousResult();
    //render current page
    searchView.renderResults(state.search.result,goToPage);
  }
});
/*arecipe controller*/
const recipeController = async ()=>{
  const id = window.location.hash.replace('#','');
  //creat a new recipe object if there is an id  and add it to state objects
  if(id){
    state.recipe = new Recipe(id);
    //for testing
//try{
  //Prepare UI for changes
  recipeView.clearRecipe();
  renderLoader(elements.recipeDetails);
  //Get recipe and parse ingredients
  await state.recipe.getRecipe();
  state.recipe.parseIngredients();
  state.recipe.calcTime();
  state.recipe.calServings();
  //render to ui
clearLoader();
  recipeView.renderRecipeDetails(state.recipe);

  console.log(state.recipe);
// }
//       catch(error){
//         alert('Error processing recipe');
//       }



  }

}
//r.getRecipe();

['load','hashchange'].forEach((event)=>window.addEventListener(event,recipeController));
