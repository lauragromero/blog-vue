import * as axios from 'axios';

async function getAllPost () {
  const result= await  axios.get('http://localhost:3002/post')
  return result.data
}

export default getAllPost;