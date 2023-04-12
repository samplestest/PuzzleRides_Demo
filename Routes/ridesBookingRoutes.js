"use strict"

const { RidesBookingController: Controller } = require("../Controllers");
const UniversalFunctions = require("../Utils/UniversalFunction");
const Joi = require('Joi');
const Config = require("../Config");

module.exports = [
    //Add Edit RidesBooking
    {
        method: "POST",
        path: "/admin/RidesBooking",
        config: {
            handler: async function (request, h) {
                try {
                    const userData =
                        request.auth &&
                        request.auth.credentials &&
                        request.auth.credentials.userData;
                    return await UniversalFunctions.sendSuccess(
                        null,
                        await Controller.addEditRidesBooking(request.payload, userData)
                    )
                } catch (e) {
                    console.log(e);
                    return await UniversalFunctions.sendError(e);
                }
            },
            description: "Add Edit RidesBooking API",
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
    //Fetch RidesBooking
    {
        method: "GET",
        path: "/admin/RidesBooking",
        config: {
            handler: async function (request, h) {
                try {
                    return await UniversalFunctions.sendSuccess(
                        null,
                        await Controller.fetchRidesBooking(request.query)
                    )
                } catch (e) {
                    console.log(e);
                    return await UniversalFunctions.sendError(e);
                }
            },
            description: "Fetch RidesBooking API",
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
    //Fetch RidesBooking Calender
    {
        method: "GET",
        path: "/admin/RidesBookingCalender",
        config: {
            handler: async function (request, h) {
                try {
                    return await UniversalFunctions.sendSuccess(
                        null,
                        await Controller.fetchRides(request.query)
                    )
                } catch (e) {
                    console.log(e);
                    return await UniversalFunctions.sendError(e);
                }
            },
            description: "Fetch RidesBooking API",
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
    // //Fetch MurderPubCrawlsPrescottActivityForm Sold Out Date
    // {
    //     method: "GET",
    //     path: "/admin/RidesBookingSoldDate",
    //     config: {
    //         handler: async function (request, h) {
    //             try {
    //                 return await UniversalFunctions.sendSuccess(
    //                     null,
    //                     await Controller.fetchMurderPubCrawlsPrescottActivitySoldDate(request.query)
    //                 )
    //             } catch (e) {
    //                 console.log(e);
    //                 return await UniversalFunctions.sendError(e);
    //             }
    //         },
    //         description: "Fetch MurderPubCrawlsPrescottActivity SoldDate  API",
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
    // //Fetch MurderPubCrawlsPrescottActivityForm Upcoming Trips
    // {
    //     method: "GET",
    //     path: "/admin/MurderPubCrawlsPrescottActivityUpcomingTrip",
    //     config: {
    //         handler: async function (request, h) {
    //             try {
    //                 return await UniversalFunctions.sendSuccess(
    //                     null,
    //                     await Controller.fetchMurderPubCrawlsPrescottActivityUpcomingTrip(request.query)
    //                 )
    //             } catch (e) {
    //                 console.log(e);
    //                 return await UniversalFunctions.sendError(e);
    //             }
    //         },
    //         description: "Fetch MurderPubCrawlsPrescottActivity UpcomingTrip  API",
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