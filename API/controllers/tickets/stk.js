// /controllers/tickets/add.js
const axios = require("axios");
const MPESA_BASE_URL = process.env.MPESA_MODE === "production"
    ? "https://api.safaricom.co.ke"
    : "https://sandbox.safaricom.co.ke";

const generateTimestamp = () => {
    const date = new Date();
    return date.getFullYear() +
        ('0' + (date.getMonth() + 1)).slice(-2) +
        ('0' + date.getDate()).slice(-2) +
        ('0' + date.getHours()).slice(-2) +
        ('0' + date.getMinutes()).slice(-2) +
        ('0' + date.getSeconds()).slice(-2);
};

const generateToken = async (req, res, next) => {
    try {
        const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_SECRET_KEY}`).toString("base64");

        const response = await axios.get(`${MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`, {
            headers: {
                Authorization: `Basic ${auth}`,
            },
        });

        req.token = response.data.access_token;
        next();
    } catch (error) {
        console.error("Error generating token:", error.response?.data || error.message);
        res.status(400).json({ success: false, message: "Failed to generate token" });
    }
};

const stkPush = async (req, res) => {
    const {
        phoneNo,
        price,
    } = req.body;

    if ( !phoneNo ||  !price) {
        return res.status(400).json({
            success: false,
            message: "All fields are required.",
        });
    }

    const formattedPhone = phoneNo.startsWith("0") ? `254${phoneNo.substring(1)}` : phoneNo;

    try {
        const timestamp = generateTimestamp();
        const password = Buffer.from(`${process.env.MPESA_PAYBILL}${process.env.MPESA_PASSKEY}${timestamp}`).toString("base64");

        const stkResponse = await axios.post(
            `${MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`,
            {
                BusinessShortCode: process.env.MPESA_PAYBILL,
                Password: password,
                Timestamp: timestamp,
                TransactionType: "CustomerPayBillOnline",
                Amount: price,
                PartyA: formattedPhone,
                PartyB: process.env.MPESA_PAYBILL,
                PhoneNumber: formattedPhone,
                CallBackURL: process.env.CALLBACK_URL || "https://mydomain.com/callback",
                AccountReference: `${phoneNo} `,
                TransactionDesc: `Payment by ${phoneNo}, amount: ${price}`,
            },
            {
                headers: {
                    Authorization: `Bearer ${req.token}`,
                },
            }
        );

        res.status(200).json({
            success: true,
            message: "STK Push initiated successfully",
            data: stkResponse.data,
        });
    } catch (error) {
        console.error("Error in STK Push:", error.response?.data || error.message);
        res.status(400).json({
            success: false,
            message: "Failed to initiate STK Push",
            error: error.response?.data || error.message,
        });
    }
};

module.exports = {
    generateToken,
    stkPush,
};
