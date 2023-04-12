"use strict"

const { BookMurderPubCrawlsScottsdaleActivityController: Controller } = require("../Controllers");
const UniversalFunctions = require("../Utils/UniversalFunction");
const Joi = require('Joi');
const Config = require("../Config");

module.exports = [
    //Add Edit BookMurderPubCrawlsScottsdaleActivity
    {
        method: "POST",
        path: "/admin/BookMurderPubCrawlsScottsdaleActivity",
        config: {
            handler: async function (request, h) {
                try {
                    const userData =
                        request.auth &&
                        request.auth.credentials &&
                        request.auth.credentials.userData;
                    return await UniversalFunctions.sendSuccess(
                        null,
                        await Controller.addEditBookMurderPubCrawlsScottsdaleActivity(request.payload, userData)
                    )
                } catch (e) {
                    console.log(e);
                    return await UniversalFunctions.sendError(e);
                }
            },
            description: "Add Edit BookMurderPubCrawlsScottsdaleActivity API",
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
    //Fetch BookMurderPubCrawlsScottsdaleActivity
    {
        method: "GET",
        path: "/admin/BookMurderPubCrawlsScottsdaleActivity",
        config: {
            handler: async function (request, h) {
                try {
                    return await UniversalFunctions.sendSuccess(
                        null,
                        await Controller.fetchBookMurderPubCrawlsScottsdaleActivity(request.query)
                    )
                } catch (e) {
                    console.log(e);
                    return await UniversalFunctions.sendError(e);
                }
            },
            description: "Fetch BookMurderPubCrawlsScottsdaleActivity API",
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
    //Fetch MurderPubCrawlsScottsdaleActivity Sold Out Date
    {
        method: "GET",
        path: "/admin/MurderPubCrawlsScottsdaleActivitySoldDate",
        config: {
            handler: async function (request, h) {
                try {
                    return await UniversalFunctions.sendSuccess(
                        null,
                        await Controller.fetcMurderPubCrawlsScottsdaleActivitySoldDate(request.query)
                    )
                } catch (e) {
                    console.log(e);
                    return await UniversalFunctions.sendError(e);
                }
            },
            description: "Fetch MurderPubCrawlsScottsdaleActivity SoldDate  API",
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
    }
]