"use strict"

const { ClassicRockPubCrawlsScottsdaleActivityFormController: Controller } = require("../Controllers");
const UniversalFunctions = require("../Utils/UniversalFunction");
const Joi = require('Joi');
const Config = require("../Config");

module.exports = [
    //Add Edit ClassicRockPubCrawlsScottsdaleActivityForm
    {
        method: "POST",
        path: "/admin/ClassicRockPubCrawlsScottsdaleActivityForm",
        config: {
            handler: async function (request, h) {
                try {
                    const userData =
                        request.auth &&
                        request.auth.credentials &&
                        request.auth.credentials.userData;
                    return await UniversalFunctions.sendSuccess(
                        null,
                        await Controller.addEditClassicRockPubCrawlsScottsdaleActivityForm(request.payload, userData)
                    )
                } catch (e) {
                    console.log(e);
                    return await UniversalFunctions.sendError(e);
                }
            },
            description: "Add Edit ClassicRockPubCrawlsScottsdaleActivityForm API",
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
    //Fetch ClassicRockPubCrawlsScottsdaleActivityForm
    {
        method: "GET",
        path: "/admin/ClassicRockPubCrawlsScottsdaleActivityForm",
        config: {
            handler: async function (request, h) {
                try {
                    return await UniversalFunctions.sendSuccess(
                        null,
                        await Controller.fetchClassicRockPubCrawlsScottsdaleActivityForm(request.query)
                    )
                } catch (e) {
                    console.log(e);
                    return await UniversalFunctions.sendError(e);
                }
            },
            description: "Fetch ClassicRockPubCrawlsScottsdaleActivityForm API",
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
    // //Fetch ClassicRockPubCrawlsScottsdaleActivityForm Sold Out Date
    // {
    //     method: "GET",
    //     path: "/admin/ClassicRockPubCrawlsScottsdaleActivitySoldDate",
    //     config: {
    //         handler: async function (request, h) {
    //             try {
    //                 return await UniversalFunctions.sendSuccess(
    //                     null,
    //                     await Controller.fetchClassicRockPubCrawlsScottsdaleActivitySoldDate(request.query)
    //                 )
    //             } catch (e) {
    //                 console.log(e);
    //                 return await UniversalFunctions.sendError(e);
    //             }
    //         },
    //         description: "Fetch ClassicRockPubCrawlsScottsdaleActivity SoldDate  API",
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
    // }
]