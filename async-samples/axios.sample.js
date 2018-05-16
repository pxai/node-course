const axios = require('axios');

const url = 'http://api.postcodes.io/random/postcodes';

const getDataFromApi = () => {
	return axios.get(`${url}`)
		.then((response) => {
			return response;
			});

}

const getDataFromApiAsync = async () => {
	const result = await axios.get(`${url}`);
	return result;
}
getDataFromApi().then(r=>console.log(r));
