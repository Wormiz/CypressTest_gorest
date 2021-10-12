function requestPostUser(){
    let requestBody = {
        "name": "Teste",
        "gender": "male",
        "email": "testing_12345@testing.com",
        "status": "active"
    };

    return requestBody;
}

module.exports = { requestPostUser };