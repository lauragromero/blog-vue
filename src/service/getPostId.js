import * as axios from 'axios';

async function getPostId (id) {
  const result= await  axios.get(`http://localhost:3002/post/${id}`)
  return result.data
}

export default getPostId;