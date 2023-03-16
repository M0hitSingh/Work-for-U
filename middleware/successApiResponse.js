class successApiResponse {
    constructor(statusCode = 200) {
        this.status = { code: statusCode, message: "success" };
        this.data = {};
        this.error = {};
    }
    data;
    error;
    status;
}

const sendSuccessApiResponse = (data, statusCode = 200) => {
    const newApiResponse = new successApiResponse(statusCode);
    newApiResponse.data = data;
    return newApiResponse;
};

module.exports = { sendSuccessApiResponse, successApiResponse };
