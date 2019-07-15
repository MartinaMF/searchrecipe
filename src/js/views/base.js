export const elements = {
  searchForm:document.querySelector('.search'),
  searchInput:document.querySelector('.search__field'),
  recipeList:document.querySelector('.results__list'),
  searchResDiv:document.querySelector('.results'),
  searchResPages:document.querySelector('.results__pages'),
  resultLink:document.querySelector('.results__link'),
  recipeDetails:document.querySelector('.recipe'),
  recipeIngredientList:document.querySelector('.recipe__ingredient-list')
}
export const elementStrings = {
  loader : 'loader'
}
 export const renderLoader = parent =>{
   const loader = `
   <div class="${elementStrings.loader}">
   <svg>
   <use href="img/icons.svg#icon-cw"></use>
   </svg>
   </div>`
   parent.insertAdjacentHTML('afterbegin',loader);
 }
 export const clearLoader = () =>{
   const loader = document.querySelector(`.${elementStrings.loader}`);
   if(loader)
   loader.parentElement.removeChild(loader);
 }
