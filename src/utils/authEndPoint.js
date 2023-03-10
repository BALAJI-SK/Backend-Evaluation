const axios = require('axios');
const AUTHBASEURL = 'http://localhost:5000/';

const authRequest = async (token) => {
	try {
		console.log(token);
		const data = await axios({
			url: 'auth/validate',
			method: 'GET',
			baseURL: AUTHBASEURL,
			params: {
				token:token
			}
		});
		
		return data;
	}
	catch (err) {
		return err;
	}
};
module.exports = authRequest;
