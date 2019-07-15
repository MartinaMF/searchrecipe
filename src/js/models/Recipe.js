import axios from 'axios';
import {API_key} from '../config';
export default class Recipe {
  constructor(id){
    this.id = id;
  }
  async getRecipe(){
    try{
      const result = await axios(`https://www.food2fork.com/api/get?key=${API_key}&rId=${this.id}`);
      this.title= result.data.recipe.title;
      this.author= result.data.recipe.publisher;
      this.img= result.data.recipe.image_url;
      this.url= result.data.recipe.source_url;
      this.ingredients= result.data.recipe.ingredients;
    }
    catch(error){
      console.log(error);
    }

  }
  calcTime(){
    //assuming that we need 15 min for each 3 newIngredients
    const numIng = this.ingredients.length;
    const periods =  Math.ceil(numIng/3);
    this.time = periods * 14;
  }
  calServings(){
    this.servings = 4;
  }
  parseIngredients(){
    const unitsLong = ['tablespoons', 'tablespoon','ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
    const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp' ,'cup' , 'pound'];
    const newIngredients = this.ingredients.map((el)=>{
      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit,i)=>{
      ingredient =  ingredient.replace(unit,unitsShort[i]);
      });
      // 2)remove parentheses
      ingredient = ingredient.replace(/ *\([^)]*\) */g , ' ');
      // 3) parse ingredients into count, unit and ingredients
      const arrIng = ingredient.split(' ');
      const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2));
      let objIng;
      if(unitIndex >-1){
        //there is a unit
        const arrCount = arrIng.slice(0,unitIndex);
        let count;
        if(arrCount.length === 1){
          count = eval(arrIng[0].replace('-','+'));
        }
        else {
          count = eval(arrIng.slice(0,unitIndex).join('+'));
        }
        objIng = {
          count,
          unit:arrIng[unitIndex],
          ingredient:arrIng.slice(unitIndex + 1).join(' ')
        };
      }
      else if(parseInt(arrIng[0],10)){
        //there is No unit, but 1st element is number
        objIng = {
          count:parseInt(arrIng[0],10),
          unit:'',
          ingredient:arrIng.slice(1).join(' ')
        }
      }

      else if(unitIndex === -1){
        //there is No unit and NO number in 1St position
objIng = {
  count:1,
  unit:'',
  ingredient
}
      }
      return objIng;
    });
    this.ingredients = newIngredients;
  }
}
