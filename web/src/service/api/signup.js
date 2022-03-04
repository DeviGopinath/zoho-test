const signup = (data) => {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: data,
    };

    return fetch(
        "http://localhost:5000/home/signup/register",
        requestOptions
    ).then(handleResponse);
};

const handleResponse = (response) => {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);
        return data;
    });
};

export default signup;

// const signup = (data) => {
// 	const requestOptions = {
// 		method: 'POST',
// 		headers: {
// 			'Content-type': 'application/json',
// 		},
// 		body: data,
// 	};

// 	return fetch(
// 		'https://kronos-test.idc.tarento.com/api/v1/user/login',
// 		requestOptions
// 	).then(handleResponse);
// };

// const handleResponse = (response) => {
// 	return response.text().then((text) => {
// 		const data = text && JSON.parse(text);
// 		return data;
// 	});
// };

// export default signup;
