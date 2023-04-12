"use strict"

const { BestThingToDoController: Controller } = require("../Controllers");
const UniversalFunctions = require("../Utils/UniversalFunction");
const Config = require("../Config");
const Joi = require("joi");
const { request } = require("express");

module.exports = [
    //add Edit BestThingDoTO
    {
        method: "POST",
        path: "/admin/BestThingDoTO",
        config: {
            handler: async function (request, h) {
                try {
                    const userData =
                        request.auth &&
                        request.auth.credentials &&
                        request.auth.credentials.userData
                    return await UniversalFunctions.sendSuccess(
                        null,
                        await Controller.addEditBestThingDoTO(request.payload, userData)
                    )
                } catch (e) {
                    console.log(e);
                    return await UniversalFunctions.sendError(e)
                }
            },
            description: "Add Edit BestThingDoTO API",
            auth: "AdminAuth",
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    BestThingDoTOId: Joi.string().trim(),
                    title: Joi.string().trim().required(),
                    button1: Joi.string().trim().required(),
                    button2: Joi.string().trim().required(),
                    image1: Joi.string().trim().required(),
                    image2: Joi.string().trim().required(),
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
    //Fetch BestThingDoTO
    {
        method: "GET",
        path: "/admin/BestThingDoTO",
        config: {
            handler: async function (request, h) {
                try {
                    return await UniversalFunctions.sendSuccess(
                        null,
                        await Controller.fetchBestThingDoTO(request.query)
                    )
                } catch (e) {
                    console.log(e);
                    return await UniversalFunctions.sendError(e);
                }
            },
            description: "Fetch BestThingDoTO API",
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
    //Deleted BestThingDoTO
    {
        method: "DELETE",
        path: "/admin/BestThingDoTO/{BestThingDoTOId}",
        config: {
            handler: async function (request, h) {
                try {
                    return await UniversalFunctions.sendSuccess(
                        null,
                        await Controller.deleteBestThingDoTOById(request.params)
                    )
                } catch (e) {
                    console.log(e);
                    return await UniversalFunctions.sendError(e);
                }
            },
            description: "Delete BestThingDoTO By Id API",
            auth: "AdminAuth",
            tags: ['api'],
            validate: {
                params: Joi.object({
                    BestThingDoTOId: Joi.string().trim().required()
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