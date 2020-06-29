

import * as axios from 'axios';

async function singin (user) {
     const response = await axios.post('http://localhost:3002/user', user)
      return response.data
}
      


export default singin;