"use strict"

const Service = require("../Services").queries;
const UniversalFunctions = require("../Utils/UniversalFunction");
const Config = require("../Config");
const Model = require("../Models");
const { google } = require('googleapis');

// Provide the required configuration
const CREDENTIALS = {
    "type": "service_account",
    "project_id": "project-356911",
    "private_key_id": "42c1179c22e603c9412bbbdd0f823c1184299b84",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCmSab2Nz6rJAUy\nWCQUWdIJGn7xVTSXwMNjHDD5PB3kB1Zz9hIQjafgLPOvN9adRQFzme75dt2Waf2Q\nsysaRjAxC2NrQDFTICZauVESy0YI891YrNEsHGJKa6bQUlBh6d9+QYdr1DVHeDWX\nEhmeDuWd/xNNdHyyqD5eAGac9oHmMpaHuQ2RrtbyxPrLUEdcFiUXYuovt8yqjxhH\nVo+JVdnZcl4F1bTCcxICFCnKiaDT1gPMlVOyjC4It0+3KgBrkArWtReIMDqEE/e1\nXruSROGnldH21xNJQdKab6Ylfa/jG4/zHv1VjsZvpNqeerXfPVgT4SwogeT/JGSf\njq3YCkohAgMBAAECggEABWjDMIJ0zIymCiCVoN9YnqDw5PEWfkLAIFzaB3uCBelK\nscg9B3KSNc/EiAw/FBva65uj61PHasWNIOxBIFBM8EV8cRBUIm367WvWlC/OWgtz\nxXcOsVqFhIH6uc9Zq8u3sFPZn8N2Dbp+dMj7EhoONFzoL/Z0eXvRVo25CM1YhahN\ncILant5JooERvTOaP4hStTpOpKmSCnmvK6iqwLhjFxJyZLfdiKR9oW+9IKSqckgA\njQXJ5WqCgaPiFA6PIYhJRvzHuXd/2VvKUsbvUpl3K5oC8h5vgmGd3HTU2cy2LQWH\nk5b+GKFopuyZI67Kvj6nkYOQfpnoVxMebVYIHt1wqQKBgQDVr4BaHBrjKm0y2ALe\n/9Q1ass49SMdVUEYXgRb5fdHqMdtqRsIyaEr/QlfOrnYSGafbkFHGQNrCqvopYfh\ntyu9RQ3p6upnUUhh3cb0MHzUHfxyUY86FSe+6cORX8ZRPumM4YDpk0ZAaaQvjfwG\nsdg91mpq3VDHLONT92y3g+j1iQKBgQDHN2GeQMxBYXAkvcegkpYODIGc2TqGHAsk\nNcXZ80wZ5xzuVL4ftxJwmmjxZHjJxFCvrAaTdRXpmINtrjvczHK8V4Lq/8nJjIKG\nBzwGLkbTwUPt9Q823+ERn/zYMK/aPOZsbS/Ryf96zQI05mJiQqWQYXFKUUhjsjoo\n/mqlqS+h2QKBgQCLMTEIgXo6M27CSddE75yJ1zDdv0DKYLhwaP2p5xi2wwh1NEx5\n4u1ru/4Y3CYm7rJ6c9VtvKtvVJo6h2kF7M0/EvZHQ1DBUD84EMECW3tUqNvCk8Ia\ncaFcSOWtkpeaYMK9lD7m55pBZw8eMvzSV5KmZT8YsWVm+KR0E53rxK9BEQKBgQC2\nAVfzQFocRYwyVRykDCiBr1VfWmuIiOh47ZPUOt7FL4wUBmIpEZYMQFYubE+abvwU\nc0MSxz78yvUQaMWSRUtx3TXjw0u1EuVQ1B03vGHDJugL5/89cC7tblCPp3OSHF+c\noei1byo1JEWm1PD/usoObagWcMqFIxjVyRLgRQEaiQKBgEs5y852Yh0nDqa/vVsY\neF5y8BMffFJ1QwS4P064tQgYtnr+D6yiJvEIJBBd+Gn71x/5370RDMaHQdevcFly\nyQ09U+K0BHp+6u1BPX/BCrmKS6bjTJDWnTNVWcGVQDUU+u/WsJdM2oNJCnSsZtyV\nbcvLc1HHd28hZD44DKwiNEhz\n-----END PRIVATE KEY-----\n",
    "client_email": "calender-key@project-356911.iam.gserviceaccount.com",
    "client_id": "114880347222960565265",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/calender-key%40project-356911.iam.gserviceaccount.com"
};
const calendarId = "ca5f3e619f3f39c3ce72a09d89126b30e27bf51cf9f5f87227a63573c0aee2e3@group.calendar.google.com";
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({ version: "v3" });
const auth = new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES
);

//Add Edit RidesBooking
async function addEditRidesBooking(payloadData, userData) {
    try {
        let data;
        if (payloadData.RidesBookingId) {
            data = await Service.findAndUpdate(
                Model.RidesBooking,
                { _id: payloadData.RidesBookingId },
                payloadData,
                { new: true }
            );
            if (!data) {
                return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.NOT_EXIST)
            }
        } else {

            let response = await calendar.events.insert({
                auth: auth,
                calendarId: calendarId,
                resource: payloadData
            });
            if (response['status'] == 200 && response['statusText'] === 'OK') {
                let eventId = response.data.id;
                console.log("eventId:", eventId);

                // if (await Service.findOne(Model.MurderPubCrawlsPrescottActivityForm, { email: payloadData.email })) {
                //     return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.EMAIL_ALREADY_EXIST);
                // }
                // if (await Service.findOne(Model.MurderPubCrawlsPrescottActivityForm, { phone: payloadData.phone })) {
                //     return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.PHONE_ALREADY_EXIST);
                // }

                payloadData.addedBy = userData._id;
                payloadData.eventId = eventId;
                data = await Service.saveData(Model.RidesBooking, payloadData);
                if (!data) {
                    return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR)
                }
            } else {
                return 0;
            }
        }
        return data
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

//Fetch Rides Using Calender
async function fetchRides(queryData) {
    try {

        let response = await calendar.events.list({
            auth: auth,
            calendarId: calendarId
        });
        return {
            data: JSON.stringify({ events: response.data.items })
        }
    }
    catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

//Fetch RidesBooking
async function fetchRidesBooking(queryData) {
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
        let data = await Service.getData(Model.RidesBooking, query, projection, options);
        let total = await Service.count(Model.RidesBooking, query)
        return {
            RidesBookingData: data,
            total: total
        }
    } catch (err) {
        console.log(err);
        return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
    }
}

// //Fetch MurderPubCrawlsPrescottActivityForm Sold Out Date
// async function fetchMurderPubCrawlsPrescottActivitySoldDate(queryData) {
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
//         let data = await Service.getData(Model.MurderPubCrawlsPrescottActivityForm, query, projection, options);
//         return {
//             SoldDate: data
//         }
//     } catch (err) {
//         console.log(err);
//         return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
//     }
// }

// //Fetch UpcomingTrip
// async function fetchMurderPubCrawlsPrescottActivityUpcomingTrip(queryData) {
//     try {
//         const { skip = undefined, limit = undefined, search } = queryData;
//         const query = { isDeleted: false, date: { $gte: new Date() }, ridesId: "63d8b1f857ae4fce467c16f8" };
//         const projection = { date: 1 };
//         const options = { sort: { _id: -1 } }

//         if (typeof skip !== "undefined" && typeof limit !== "undefined") {
//             options = { skip: skip, limit: limit, sort: { _id: -1 } }
//         }
//         if (search)
//             query.name = new RegExp(search, "ig");
//         let data = await Service.getData(Model.UpcomingTrip, query, projection, options);
//         return {
//             Data: data
//         }
//     } catch (err) {
//         console.log(err);
//         return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
//     }
// }

module.exports = {
    addEditRidesBooking,
    fetchRidesBooking,
    fetchRides
    // fetchMurderPubCrawlsPrescottActivitySoldDate,
    // fetchMurderPubCrawlsPrescottActivityUpcomingTrip
}