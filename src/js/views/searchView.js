import {elements} from './base';

export const clearInput = ()=>{
  elements.searchInput.value= '';
}
export const clearprviousResult = () =>{
  elements.recipeList.innerHTML = '';
  elements.searchResPages.innerHTML = '';
}
export const getInput = () => elements.searchInput.value;

const limitTitlelength = (title,limit = 17) =>{
  const newTitle = [];
  if(title.length > limit){
    title.split(' ').reduce((acc,cur)=>{
      if(acc + cur.length <= limit){
        newTitle.push(cur);
      }
      return acc+cur.length;
    },0);
    return `${newTitle.join(' ') }...`;
  }
  return title;
}
const renderrecipe = (recipe) => {
const markup  = `<li>
      <a class="results__link results__link--active" href="#${recipe.recipe_id}">
          <figure class="results__fig">
              <img src="${recipe.image_url}" alt="Test">
          </figure>
          <div class="results__data">
              <h4 class="results__name">${limitTitlelength(recipe.title)}</h4>
              <p class="results__author">${recipe.publisher}</p>
          </div>
      </a>
  </li>`
  elements.recipeList.insertAdjacentHTML('afterbegin' , markup);
}
const createButton = (type, page) =>`
<button class="btn-inline results__btn--${type}" data-goto=${type=== 'prev' ? page -1 : page + 1}>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
    </svg>
    <span>Page ${type === 'prev' ? page - 1 : page +1}</span>
</button>
`

export const renderBaginationButtons = (page, recPerPage, numOfResults) =>{
  const pages = Math.ceil(numOfResults / recPerPage);
  let button;
  if(page === 1 && pages > 1){
    //create one button to go to next page
  button = createButton('next',page);
  }else if(page < pages) {
    //create prev and next buttons
    button = `${button = createButton('prev',page)}
    ${button = createButton('next',page)}
    `
  }
  else if(page === pages){
    //create one button to go to prev page
    button = createButton('prev',page);
  }
  elements.searchResPages.insertAdjacentHTML('afterbegin', button);
}
export const renderResults = (recipes, page =1, recPerPage =10) => {
  const start = (page-1)*recPerPage;
  const end = recPerPage * page;
  //render recipes 10 per page
  recipes.slice(start,end).forEach(renderrecipe);
  //render pagination buttons
  renderBaginationButtons(page, recPerPage, recipes.length);
}
