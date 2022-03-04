const insertData = (name, phone, email) => {
	const data = {
		name: name,
		phone: phone,
		email: email
	};
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
		body: JSON.stringify(data),
	};
	console.log(requestOptions.body);
	return fetch('http://localhost:5000/home/insert', requestOptions).then(
		handleResponse
	);
};
const handleResponse = (response) => {
	return response.text().then((text) => {
		const data = text && JSON.parse(text);
		return data;
	});
};

export default insertData;
