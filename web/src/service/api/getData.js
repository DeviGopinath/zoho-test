const getData = () => {
    const AT = localStorage.getItem("token");
    console.log(AT);
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            authorization: AT,
        },
    };
    return fetch(
        `http://localhost:5000/home/get`,
        requestOptions
    ).then(handleResponse);
};

const handleResponse = (response) => {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);
        return data;
    });
};

export default getData;
