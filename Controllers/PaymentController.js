"use strict"

const Service = require("../Services").queries;
const UniversalFunctions = require("../Utils/UniversalFunction");
const Config = require("../Config");
const Model = require("../Models");
const Razorpay = require("razorpay");
const razorPayInstance = new Razorpay({
    key_id: "rzp_test_vm8ts2j5f380aP",
    key_secret: "NV6bo12Wwf9obQxu1cHdW4Zc",
});

//Add Edit Order Create
async function addEditOrderCreate(payloadData, userData) {
    try {
        let finalData = {
            amount: 5000,
            currency: "INR",
            notes: { userId: userData._id.toString() },
        };
        let orderData = await razorPayInstance.orders.create({ ...finalData });
        console.log("OrderData:", orderData);
        let payments = await razorPayInstance.orders.fetchPayments(orderData.id);
        console.log(payments);
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

//Payment Verify
async function paymentVerify(payloadData, userData) {
    try {
        console.log("payloadData:", payloadData);
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

module.exports = {
    addEditOrderCreate,
    paymentVerify
}