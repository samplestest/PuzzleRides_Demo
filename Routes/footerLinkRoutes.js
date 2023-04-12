"use strict"

const { FooterLinkController: Controller } = require("../Controllers");
const UniversalFunctions = require("../Utils/UniversalFunction");
const Config = require("../Config");
const Model = require("../Models");
const Joi = require("joi");

module.exports = [
    //Add Edit FooterLink
    {
        method: "POST",
        path: "/admin/footerLink",
        config: {
            handler: async function (request, h) {
                try {
                    const userData =
                        request.auth &&
                        request.auth.credentials &&
                        request.auth.credentials.userData
                    return UniversalFunctions.sendSuccess(
                        null,
                        await Controller.addEditFooterLink(request.payload, userData)
                    )
                } catch (e) {
                    console.log(e);
                    return UniversalFunctions.sendError(e);
                }
            },
            description: "Add Edit FooterLink API",
            auth: "AdminAuth",
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    footerLinkId: Joi.string().trim(),
                    title: Joi.string().trim().required(),
                    link: Joi.string().trim().required()
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
    //Fetch Footer
    {
        method: "GET",
        path: "/admin/footerLink",
        config: {
            handler: async function (request, h) {
                try {
                    return await UniversalFunctions.sendSuccess(
                        null,
                        await Controller.fetchFooterLink(request.query)
                    )
                } catch (e) {
                    console.log(e);
                    return await UniversalFunctions.sendError(e);
                }
            },
            description: "Fetch Footer API",
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
    //Delete FooterLink
    {
        method: "DELETE",
        path: "/admin/footerLink/{footerLinkId}",
        config: {
            handler: async function (request, h) {
                try {
                    return await UniversalFunctions.sendSuccess(
                        null,
                        await Controller.deleteFooterLinkById(request.params)
                    )
                } catch (e) {
                    console.log(e);
                    return await UniversalFunctions.sendError(e);
                }
            },
            description: "Delete FooterLink ById API ",
            auth: "AdminAuth",
            tags: ['api'],
            validate: {
                params: Joi.object({
                    footerLinkId: Joi.string().trim().required()
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