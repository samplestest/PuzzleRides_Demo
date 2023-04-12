"use strict"

const { BannerController: Controller } = require("../Controllers");
const UniversalFunctions = require("../Utils/UniversalFunction");
const Config = require("../Config");
const Joi = require("joi");
const { request } = require("express");

module.exports = [
    //add Edit Banner
    {
        method: "POST",
        path: "/admin/banner",
        config: {
            handler: async function (request, h) {
                try {
                    const userData =
                        request.auth &&
                        request.auth.credentials &&
                        request.auth.credentials.userData
                    return await UniversalFunctions.sendSuccess(
                        null,
                        await Controller.addEditBanner(request.payload, userData)
                    )
                } catch (e) {
                    console.log(e);
                    return await UniversalFunctions.sendError(e)
                }
            },
            description: "Add Edit Banner API",
            auth: "AdminAuth",
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    bannerId: Joi.string().trim(),
                    banner: Joi.string().trim().required(),
                    title: Joi.string().trim().required(),
                    button1: Joi.string().trim().required(),
                    button2: Joi.string().trim().required()
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
    //Fetch Banner
    {
        method: "GET",
        path: "/admin/banner",
        config: {
            handler: async function (request, h) {
                try {
                    return await UniversalFunctions.sendSuccess(
                        null,
                        await Controller.fetchBanner(request.query)
                    )
                } catch (e) {
                    console.log(e);
                    return await UniversalFunctions.sendError(e);
                }
            },
            description: "Fetch Banner API",
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
    //Deleted Banner
    {
        method: "DELETE",
        path: "/admin/banner/{bannerId}",
        config: {
            handler: async function (request, h) {
                try {
                    return await UniversalFunctions.sendSuccess(
                        null,
                        await Controller.deleteBannerById(request.params)
                    )
                } catch (e) {
                    console.log(e);
                    return await UniversalFunctions.sendError(e);
                }
            },
            description: "Delete Banner By Id API",
            auth: "AdminAuth",
            tags: ['api'],
            validate: {
                params: Joi.object({
                    bannerId: Joi.string().trim().required()
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
    //Fetch HomePage
    {
        method: "GET",
        path: "/admin/homepage",
        config: {
            handler: async function (request, h) {
                try {
                    return await UniversalFunctions.sendSuccess(
                        null,
                        await Controller.fetchHomePage(request.query)
                    )
                } catch (e) {
                    console.log(e);
                    return await UniversalFunctions.sendError(e);
                }
            },
            description: "Fetch HomePage API",
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
]