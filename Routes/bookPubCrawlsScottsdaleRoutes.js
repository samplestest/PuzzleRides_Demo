"use strict"

const { BookPubCrawlsScottsdaleController: Controller } = require("../Controllers");
const UniversalFunctions = require("../Utils/UniversalFunction");
const Joi = require('Joi');
const Config = require("../Config");

module.exports = [
    //Add Edit BookPubCrawlsScottsdale
    {
        method: "POST",
        path: "/admin/BookPubCrawlsScottsdale",
        config: {
            handler: async function (request, h) {
                try {
                    const userData =
                        request.auth &&
                        request.auth.credentials &&
                        request.auth.credentials.userData;
                    return await UniversalFunctions.sendSuccess(
                        null,
                        await Controller.addEditBookPubCrawlsScottsdale(request.payload, userData)
                    )
                } catch (e) {
                    console.log(e);
                    return await UniversalFunctions.sendError(e);
                }
            },
            description: "Add Edit BookPubCrawlsScottsdale API",
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
    //Fetch BookPubCrawlsScottsdale
    {
        method: "GET",
        path: "/admin/BookPubCrawlsScottsdale",
        config: {
            handler: async function (request, h) {
                try {
                    return await UniversalFunctions.sendSuccess(
                        null,
                        await Controller.fetchBookPubCrawlsScottsdale(request.query)
                    )
                } catch (e) {
                    console.log(e);
                    return await UniversalFunctions.sendError(e);
                }
            },
            description: "Fetch BookPubCrawlsScottsdale API",
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
    // //Fetch BookPubCrawlsScottsdale Agg
    // {
    //     method: "GET",
    //     path: "/admin/BookPubCrawlsScottsdaleAgg",
    //     config: {
    //         handler: async function (request, h) {
    //             try {
    //                 return await UniversalFunctions.sendSuccess(
    //                     null,
    //                     await Controller.fetchBookPubCrawlsScottsdaleAgg(request.query)
    //                 )
    //             } catch (e) {
    //                 console.log(e);
    //                 return await UniversalFunctions.sendError(e);
    //             }
    //         },
    //         description: "Fetch BookPubCrawlsScottsdale API",
    //         tags: ['api'],
    //         validate: {
    //             query: Joi.object({
    //                 skip: Joi.number(),
    //                 limit: Joi.number(),
    //                 search: Joi.string()
    //             }),
    //             failAction: UniversalFunctions.failActionFunction
    //         },
    //         plugins: {
    //             "hapi-sawgger": {
    //                 payloadType: "from",
    //                 responses: Config.APP_CONSTANTS.swaggerDefaultResponseMessages
    //             }
    //         }
    //     }
    // },
]