  import axios from 'axios';
  import{ API_key} from '../config.js'
export default class Search{
  constructor(query){
    this.query = query
  }
  //API Key: 1634736584979292b52c2b1094ff68da
  async getResults(){

    try{

      const res = await  axios(`https://www.food2fork.com/api/search?key=${API_key}&q=${this.query}`);
      this.result = res.data.recipes;
    //  console.log(this.result);
    }
    catch(error){
      alert(error);
    }

  }
}
