"use strict"

const Service = require("../Services").queries;
const UniversalFunctions = require("../Utils/UniversalFunction");
const Config = require("../Config");
const Model = require("../Models");

//Add Edit UpcomingTrip
async function addEditUpcomingTrip(payloadData, userData) {
    try {
        let data;
        if (payloadData.upcomingTripId) {
            data = await Service.findAndUpdate(
                Model.UpcomingTrip,
                { _id: payloadData.upcomingTripId },
                payloadData,
                { new: true }
            );
            if (!data) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.NOT_EXIST)
            }
        } else {
            // if (await Service.findOne(Model.UpcomingTrip, { email: payloadData.email })) {
            //     return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.EMAIL_ALREADY_EXIST);
            // }
            // if (await Service.findOne(Model.UpcomingTrip, { phone: payloadData.phone })) {
            //     return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.PHONE_ALREADY_EXIST);
            // }
            payloadData.addedBy = userData._id
            data = await Service.saveData(Model.UpcomingTrip, payloadData);
            if (!data) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR)
            }
        }
        return data
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

//Fetch UpcomingTrip
async function fetchUpcomingTrip(queryData) {
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
        let data = await Service.getData(Model.UpcomingTrip, query, projection, options);
        let total = await Service.count(Model.UpcomingTrip, query)
        return {
            UpcomingTripData: data,
            total: total
        }
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

//Delete UpcomingTrip
async function deleteUpcomingTripById(paramsData) {
    try {
        const { UpcomingTripId } = paramsData;
        const resp = await Service.findAndUpdate(
            Model.UpcomingTrip,
            { _id: UpcomingTripId },
            { $set: { isDeleted: true } }
        );
        if (resp) return Config.APP_CONSTANTS.STATUS_MSG.SUCCESS.DELETED
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.NOT_EXIST);
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR)
    }
}

// //Fetch LostInTimePrescottForm Sold Out Date
// async function fetchLostInTimePrescottSoldDate(queryData) {
//     try {
//         const { skip = undefined, limit = undefined, search } = queryData;
//         const query = { isDeleted: false, date: { $gte: new Date() } };
//         const projection = { date: 1 };
//         const options = { sort: { _id: -1 } }

//         if (typeof skip !== "undefined" && typeof limit !== "undefined") {
//             options = { skip: skip, limit: limit, sort: { _id: -1 } }
//         }
//         if (search)
//             query.name = new RegExp(search, "ig");
//         let data = await Service.getData(Model.LostInTimePrescottForm, query, projection, options);
//         return {
//             SoldDate: data
//         }
//     } catch (err) {
//         console.log(err);
//         return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
//     }
// }


module.exports = {
    addEditUpcomingTrip,
    fetchUpcomingTrip,
    deleteUpcomingTripById
    // fetchLostInTimePrescottSoldDate
}