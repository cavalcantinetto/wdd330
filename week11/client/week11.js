import { makeRequest } from './authHelpers.js'
import { Auth } from './auth.js'

const user = new Auth();
const submit = document.getElementById('submitButton');
submit.addEventListener('click', () => { user.login(getPosts) })

async function getPosts() {
    const data = await makeRequest('posts', 'GET', null, user.token);
    console.log(data);
}

// makeRequest('login', 'POST', {
//     password: 'user1',
//     email: 'user1@email.com'
// });