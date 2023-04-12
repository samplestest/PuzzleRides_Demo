"use strict"

const { FooterController: Controller } = require("../Controllers");
const UniversalFunctions = require("../Utils/UniversalFunction");
const Config = require("../Config");
const Model = require("../Models");
const Joi = require("joi");

module.exports = [
    //Add Edit Footer
    {
        method: "POST",
        path: "/admin/footer",
        config: {
            handler: async function (request, h) {
                try {
                    const userData =
                        request.auth &&
                        request.auth.credentials &&
                        request.auth.credentials.userData;
                    return UniversalFunctions.sendSuccess(
                        null,
                        await Controller.addEditFooter(request.payload, userData)
                    )
                } catch (e) {
                    console.log(e);
                    return UniversalFunctions.sendError(e);
                }
            },
            description: "Add Edit Footer Api",
            auth: "AdminAuth",
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    footerId: Joi.string().trim(),
                    logo: Joi.string().trim().required(),
                    description1: Joi.string().trim().required(),
                    description2: Joi.string().trim().required(),
                    title: Joi.string().trim().required(),
                    subTitle1: Joi.string().trim().required(),
                    subTitle2: Joi.string().trim().required(),
                    preInstragamImage: Joi.string().trim().required(),
                    prefacebookImage: Joi.string().trim().required(),
                    preTikTokImage: Joi.string().trim().required(),
                    scottsInstragam: Joi.string().trim().required(),
                    scottsFacebook: Joi.string().trim().required(),
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
        path: "/admin/footer",
        config: {
            handler: async function (request, h) {
                try {
                    return await UniversalFunctions.sendSuccess(
                        null,
                        await Controller.fetchFooter(request.query)
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
]