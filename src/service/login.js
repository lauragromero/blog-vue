
import * as axios from 'axios';

async function login (username, password) {
     const response = await axios.post('http://localhost:3002/login', {}, {
        auth: {
          username: username,
          password: password
        }
      })
      return response.data
}
      


export default login;


