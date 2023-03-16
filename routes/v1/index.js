const express = require("express");
const { sendSuccessApiResponse } = require("../../middleware/successApiResponse");



const { authorization } = require("../../middleware/authorization");

/**
 * Endpoint: /api/v1
 */
const router = express.Router();



router.get("/", (req, res) => {
    const response = sendSuccessApiResponse({ message: "Inspiro - V1 API is running" });
    res.status(200).send(response);
});

module.exports = router;
