"use strict"

const Service = require("../Services").queries;
const UniversalFunctions = require("../Utils/UniversalFunction");
const Config = require("../Config");
const Model = require("../Models");

//add Edit Banner
async function addEditBanner(payloadData, userData) {
    try {
        let data;
        if (payloadData.bannerId) {
            data = await Service.findAndUpdate(
                Model.Banner,
                { _id: payloadData.bannerId },
                payloadData,
                { new: true }
            );
            if (!data) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.NOT_EXIST)
            }
        } else {
            const exit = await Service.findOne(Model.Banner,
                { title: payloadData.title, isDeleted: false });
            if (exit) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.EXIST)
            }
            payloadData.addedBy = userData._id
            data = await Service.saveData(Model.Banner, payloadData);
            if (!data) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR)
            }
        }
        return data;
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR)
    }
}

//Fetch Banner
async function fetchBanner(queryData) {
    try {
        const { skip = undefined, limit = undefined, search } = queryData;
        const query = { isDeleted: false };
        const projection = { isDeleted: 0, __v: 0 };
        const options = { sort: { _id: -1 } }

        if (typeof skip !== "undefined" && typeof limit !== "undefined") {
            options = { skip: skip, limit: limit, sort: { _id: -1 } }
        }
        if (search)
            query.name = new RegExp(search, "ig");
        let data = await Service.getData(Model.Banner, query, projection, options);
        let total = await Service.count(Model.Banner, query)
        return {
            BannerData: data,
            total: total
        }
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

//Delete Banner
async function deleteBannerById(paramsData) {
    try {
        const { bannerId } = paramsData;
        const resp = await Service.findAndUpdate(
            Model.Banner,
            { _id: bannerId },
            { $set: { isDeleted: true } }
        );
        if (resp) return Config.APP_CONSTANTS.STATUS_MSG.SUCCESS.DELETED
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.NOT_EXIST);
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR)
    }
}

//Fetch Home page
async function fetchHomePage(queryData) {
    try {
        const { skip = undefined, limit = undefined, search } = queryData;
        const query = { isDeleted: false };
        const projection = { isDeleted: 0, __v: 0, addedBy: 0, _id: 0, createdAt: 0, updatedAt: 0 };
        const options = { sort: { _id: -1 } }

        if (typeof skip !== "undefined" && typeof limit !== "undefined") {
            options = { skip: skip, limit: limit, sort: { _id: -1 } }
        }
        if (search)
            query.name = new RegExp(search, "ig");
        // const Header = await Service.getData(Model.Header, query, projection, options);
        const data = await Service.getData(Model.Banner, query, projection, options);
        const whatArePuzzle = await Service.getData(Model.WhatArePuzzle, query, projection, options);
        const AsSeenOn = await Service.getData(Model.AsSeenOn, query, projection, options);
        const BestThingToDO = await Service.getData(Model.BestThingToDo, query, projection, options);
        const Adventure = await Service.getData(Model.Adventure, query, projection, options);
        const ExpolreRides = await Service.getData(Model.ExploreRides, query, projection, options);
        const OurCrawls = await Service.getData(Model.OurCrawls, query, projection, options);
        const TeamBuilding = await Service.getData(Model.Team, query, projection, options);
        const OurReview = await Service.getData(Model.OurReview, query, projection, options);
        const RidesInfo = await Service.getData(Model.RidesInfo, query, projection, options);
        // const Footer = await Service.getData(Model.Footer, query, projection, options);

        return {
            // HeaderData: Header,
            BannerData: data,
            whatArePuzzleData: whatArePuzzle,
            AsSeenOn: AsSeenOn,
            BestThingToDO: BestThingToDO,
            Adventure: Adventure,
            ExpolreRides: ExpolreRides,
            OurCrawls: OurCrawls,
            TeamBuildingam: TeamBuilding,
            OurReview: OurReview,
            RidesInfo: RidesInfo,
            // Footer: Footer
        }
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

module.exports = {
    addEditBanner,
    fetchBanner,
    deleteBannerById,
    fetchHomePage
}