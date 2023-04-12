"use strict"

const { PaymentController: Controller } = require("../Controllers");
const UniversalFunctions = require("../Utils/UniversalFunction");
// const Joi = require('Joi');
const Config = require("../Config");

module.exports = [
    //Order Create
    {
        method: "POST",
        path: "/order/orderCreate",
        config: {
            handler: async function (request, h) {
                try {
                    const userData =
                        request.auth &&
                        request.auth.credentials &&
                        request.auth.credentials.userData;
                    return await UniversalFunctions.sendSuccess(
                        null,
                        await Controller.addEditOrderCreate(request.payload, userData)
                    )
                } catch (e) {
                    console.log(e);
                    return await UniversalFunctions.sendError(e);
                }
            },
            description: "Add Edit orderCreate API",
            auth: "AdminAuth",
            tags: ['api'],
            validate: {
                // payload: Joi.object({

                // }),
                failAction: UniversalFunctions.failActionFunction
            },
            plugins: {
                "hapi-sawgger": {
                    payloadType: "from",
                    responses: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
                }
            }
        }
    },
    //payment verify
    {
        method: "POST",
        path: "/payment/verify",
        config: {
            handler: async function (request, h) {
                try {
                    const userData =
                        request.auth &&
                        request.auth.credentials &&
                        request.auth.credentials.userData;
                    return UniversalFunctions.sendSuccess(
                        null,
                        await Controller.paymentVerify(request.payload, userData)
                    );
                } catch (e) {
                    return await UniversalFunctions.sendError(e);
                }
            },
            tags: ["api"],
            description: "verify payment api",
            auth: "AdminAuth",
            validate: {
                payload: Joi.object({
                    razorpay_payment_id: Joi.string().required(),
                    razorpay_order_id: Joi.string().required(),
                    razorpay_signature: Joi.string().required(),
                }),
                headers: UniversalFunctions.authorizationHeaderObj,
                failAction: UniversalFunctions.failActionFunction,
            },
            plugins: {
                "hapi-swagger": {
                    payloadType: "form",
                    responses: Config.APP_CONSTANTS.swaggerDefaultResponseMessages,
                },
            },
        },
    },
]