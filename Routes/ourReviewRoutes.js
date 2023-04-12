"use strict"

const { OurReviewController: Controller } = require("../Controllers");
const UniversalFunctions = require("../Utils/UniversalFunction");
const Config = require("../Config");
const Joi = require("joi");
const { request } = require("express");

module.exports = [
    //add Edit OurReview
    {
        method: "POST",
        path: "/admin/OurReview",
        config: {
            handler: async function (request, h) {
                try {
                    const userData =
                        request.auth &&
                        request.auth.credentials &&
                        request.auth.credentials.userData
                    return await UniversalFunctions.sendSuccess(
                        null,
                        await Controller.addEditOurReview(request.payload, userData)
                    )
                } catch (e) {
                    console.log(e);
                    return await UniversalFunctions.sendError(e)
                }
            },
            description: "Add Edit OurReview API",
            auth: "AdminAuth",
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    OurReviewId: Joi.string().trim(),
                    image: Joi.string().trim().required(),
                    description: Joi.string().trim().required(),
                    name: Joi.string().trim().required(),
                }),
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
    //Fetch OurReview
    {
        method: "GET",
        path: "/admin/OurReview",
        config: {
            handler: async function (request, h) {
                try {
                    return await UniversalFunctions.sendSuccess(
                        null,
                        await Controller.fetchOurReview(request.query)
                    )
                } catch (e) {
                    console.log(e);
                    return await UniversalFunctions.sendError(e);
                }
            },
            description: "Fetch OurReview API",
            tags: ['api'],
            validate: {
                query: Joi.object({
                    skip: Joi.number(),
                    limit: Joi.number(),
                    search: Joi.string()
                }),
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
    //Deleted OurReview
    {
        method: "DELETE",
        path: "/admin/OurReview/{OurReviewId}",
        config: {
            handler: async function (request, h) {
                try {
                    return await UniversalFunctions.sendSuccess(
                        null,
                        await Controller.deleteOurReviewById(request.params)
                    )
                } catch (e) {
                    console.log(e);
                    return await UniversalFunctions.sendError(e);
                }
            },
            description: "Delete OurReview By Id API",
            auth: "AdminAuth",
            tags: ['api'],
            validate: {
                params: Joi.object({
                    OurReviewId: Joi.string().trim().required()
                }),
                failAction: UniversalFunctions.failActionFunction
            },
            plugins: {
                "hapi-sawgger": {
                    payloadType: "from",
                    responses: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
                }
            }
        }
    }
]