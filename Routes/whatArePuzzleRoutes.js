"use strict"

const { WhatArePuzzleController: Controller } = require("../Controllers");
const UniversalFunctions = require("../Utils/UniversalFunction");
const Config = require("../Config");
const Joi = require("joi");
const { request } = require("express");

module.exports = [
    //add Edit WhatArePuzzle
    {
        method: "POST",
        path: "/admin/whatArePuzzle",
        config: {
            handler: async function (request, h) {
                try {
                    const userData =
                        request.auth &&
                        request.auth.credentials &&
                        request.auth.credentials.userData
                    return await UniversalFunctions.sendSuccess(
                        null,
                        await Controller.addEditWhatArePuzzle(request.payload, userData)
                    )
                } catch (e) {
                    console.log(e);
                    return await UniversalFunctions.sendError(e)
                }
            },
            description: "Add Edit WhatArePuzzle API",
            auth: "AdminAuth",
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    whatArePuzzleId: Joi.string().trim(),
                    image: Joi.string().trim().required(),
                    video: Joi.string().trim().required(),
                    title: Joi.string().trim().required(),
                    description: Joi.string().trim().required(),
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
    //Fetch WhatArePuzzle
    {
        method: "GET",
        path: "/admin/WhatArePuzzle",
        config: {
            handler: async function (request, h) {
                try {
                    return await UniversalFunctions.sendSuccess(
                        null,
                        await Controller.fetchWhatArePuzzle(request.query)
                    )
                } catch (e) {
                    console.log(e);
                    return await UniversalFunctions.sendError(e);
                }
            },
            description: "Fetch WhatArePuzzle API",
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
    //Deleted WhatArePuzzle
    {
        method: "DELETE",
        path: "/admin/WhatArePuzzle/{whatArePuzzleId}",
        config: {
            handler: async function (request, h) {
                try {
                    return await UniversalFunctions.sendSuccess(
                        null,
                        await Controller.deleteWhatArePuzzleById(request.params)
                    )
                } catch (e) {
                    console.log(e);
                    return await UniversalFunctions.sendError(e);
                }
            },
            description: "Delete WhatArePuzzle By Id API",
            auth: "AdminAuth",
            tags: ['api'],
            validate: {
                params: Joi.object({
                    whatArePuzzleId: Joi.string().trim().required()
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