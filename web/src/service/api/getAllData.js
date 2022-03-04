const getAllData = (data) => {
	const requestOptions = {
		method: 'GET',
	};
	return fetch(
		`http://localhost:5000/home/getall?month=${data}`,
		requestOptions
	).then(handleResponse);
};

const handleResponse = (response) => {
	return response.text().then((text) => {
		const data = text && JSON.parse(text);
		return data;
	});
};

export default getAllData;
