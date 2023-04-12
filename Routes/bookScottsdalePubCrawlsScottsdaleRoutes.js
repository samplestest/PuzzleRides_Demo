"use strict"

const { BookScottsdalePubCrawlsScottsdaleController: Controller } = require("../Controllers");
const UniversalFunctions = require("../Utils/UniversalFunction");
const Joi = require('Joi');
const Config = require("../Config");

module.exports = [
    //Add Edit BookScottsdalePubCrawlsScottsdale
    {
        method: "POST",
        path: "/admin/BookScottsdalePubCrawlsScottsdale",
        config: {
            handler: async function (request, h) {
                try {
                    const userData =
                        request.auth &&
                        request.auth.credentials &&
                        request.auth.credentials.userData;
                    return await UniversalFunctions.sendSuccess(
                        null,
                        await Controller.addEditBookScottsdalePubCrawlsScottsdale(request.payload, userData)
                    )
                } catch (e) {
                    console.log(e);
                    return await UniversalFunctions.sendError(e);
                }
            },
            description: "Add Edit BookScottsdalePubCrawlsScottsdale API",
            auth: "AdminAuth",
            tags: ['api'],
            validate: {
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

    //Fetch BookScottsdalePubCrawlsScottsdale
    {
        method: "GET",
        path: "/admin/BookScottsdalePubCrawlsScottsdale",
        config: {
            handler: async function (request, h) {
                try {
                    return await UniversalFunctions.sendSuccess(
                        null,
                        await Controller.fetchBookScottsdalePubCrawlsScottsdale(request.query)
                    )
                } catch (e) {
                    console.log(e);
                    return await UniversalFunctions.sendError(e);
                }
            },
            description: "Fetch BookScottsdalePubCrawlsScottsdale API",
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

    //Fetch BookScottsdalePubCrawlsScottsdale Agg
    {
        method: "GET",
        path: "/admin/BookScottsdalePubCrawlsScottsdaleAgg",
        config: {
            handler: async function (request, h) {
                try {
                    return await UniversalFunctions.sendSuccess(
                        null,
                        await Controller.fetchBookScottsdalePubCrawlsScottsdaleAgg(request.query)
                    )
                } catch (e) {
                    console.log(e);
                    return await UniversalFunctions.sendError(e);
                }
            },
            description: "Fetch BookScottsdalePubCrawlsScottsdale API",
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