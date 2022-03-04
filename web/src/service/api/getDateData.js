const getDateData = (unit, from, to) => {
	console.log(unit, from, to);
	const AT=localStorage.getItem("token");
	const requestOptions = {
		method: 'GET',
		headers: {
			'Content-type': 'text/plain',
			authorization : AT,
		},
	};
	return fetch(
		`http://localhost:5000/getdatedetails?unit=${unit}&from=${from}&to=${to}`,
		requestOptions
	).then(handleResponse);
};

const handleResponse = (response) => {
	return response.text().then((text) => {
		const data = text && JSON.parse(text);
		return data;
	});
};

export default getDateData;
