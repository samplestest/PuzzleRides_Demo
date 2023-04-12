"use strict"

const { ExploreRidesController: Controller } = require("../Controllers");
const UniversalFunctions = require("../Utils/UniversalFunction");
const Config = require("../Config");
const Joi = require("joi");
const { request } = require("express");

module.exports = [
    //add Edit ExploreRides
    {
        method: "POST",
        path: "/admin/ExploreRides",
        config: {
            handler: async function (request, h) {
                try {
                    const userData =
                        request.auth &&
                        request.auth.credentials &&
                        request.auth.credentials.userData
                    return await UniversalFunctions.sendSuccess(
                        null,
                        await Controller.addEditExploreRides(request.payload, userData)
                    )
                } catch (e) {
                    console.log(e);
                    return await UniversalFunctions.sendError(e)
                }
            },
            description: "Add Edit ExploreRides API",
            auth: "AdminAuth",
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    ExploreRidesId: Joi.string().trim(),
                    image: Joi.string().trim().required(),
                    title: Joi.string().trim().required(),
                    description: Joi.string().trim().required(),
                    button: Joi.string().trim().required()
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
    //Fetch ExploreRides
    {
        method: "GET",
        path: "/admin/ExploreRides",
        config: {
            handler: async function (request, h) {
                try {
                    return await UniversalFunctions.sendSuccess(
                        null,
                        await Controller.fetchExploreRides(request.query)
                    )
                } catch (e) {
                    console.log(e);
                    return await UniversalFunctions.sendError(e);
                }
            },
            description: "Fetch ExploreRides API",
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
    //Deleted ExploreRides
    {
        method: "DELETE",
        path: "/admin/ExploreRides/{ExploreRidesId}",
        config: {
            handler: async function (request, h) {
                try {
                    return await UniversalFunctions.sendSuccess(
                        null,
                        await Controller.deleteExploreRidesById(request.params)
                    )
                } catch (e) {
                    console.log(e);
                    return await UniversalFunctions.sendError(e);
                }
            },
            description: "Delete ExploreRides By Id API",
            auth: "AdminAuth",
            tags: ['api'],
            validate: {
                params: Joi.object({
                    ExploreRidesId: Joi.string().trim().required()
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