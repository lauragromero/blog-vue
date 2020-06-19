
import * as axios from 'axios';

async function login (user) {
    axios.post('http://localhost:3002/login', {}, {
        auth: {
          username: user.username,
          password: user.password
        }
      }).then(response => {
        localStorage.setItem('token', response.data.token)})
        .catch(error=> {
        console.log('Error on Authentication', error);
      });
}

export default login;


