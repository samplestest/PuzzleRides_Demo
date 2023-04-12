"use strict"

const adminRoutes = require("../Routes/adminRoutes");
const bannerRoutes = require("../Routes/bannerRoutes");
const WhatArePuzzle = require("../Routes/whatArePuzzleRoutes");
const AsSeenOn = require("../Routes/asSeenOnRoutes");
const BestThingToDo = require("../Routes/bestThingToDoRoutes");
const Adventure = require("../Routes/adventureRoutes");
const ExploreRides = require("../Routes/exploreRidesRoutes");
const OurCrawls = require("../Routes/ourCrawlsRoutes");
const Team = require("../Routes/teamRoutes");
const OurReview = require("../Routes/ourReviewRoutes");
const Header = require("../Routes/headerRoutes");
const RidesInfo = require("../Routes/ridesInfoRoutes");
const Footer = require("../Routes/footerRoutes");
const FooterLink = require("../Routes/footerLinkRoutes");
const Title = require("../Routes/titleRoutes");
const BookScottsDale = require("./bookScottsDaleRoutes");
const BookPrescotts = require("./bookingPrescottsRoutes");
const PubCrawls = require("../Routes/pubCrawlsRoutes");
const TeamBuilding = require("../Routes/teamBuildingRoutes");
const ScottsdaleTeamBuilding = require("../Routes/scottsdaleTeamBuildingRoutes");
const PrescottTeamBuilding = require("../Routes/prescottTeamBuildingRoutes");
const BacheloretteParties = require("../Routes/bachelorettePartiesRoutes");
const MediaAppearances = require("../Routes/MediaAppearancesRoutes");
const Faq = require("../Routes/faqRoutes");
const GiftCards = require("../Routes/giftCardsRoutes");
const ContactUs = require("../Routes/contactUsRoutes");
const ContactUsForm = require("../Routes/contactUsFormRoutes");
const Location = require("../Routes/locationRoutes");
const OurPuzzleMaster = require("../Routes/ourPuzzleMasterRoutes");
const AffiliateProgram = require("../Routes/affiliateProgramRoutes");
const AffiliateProgramSignup = require("../Routes/affiliateProgramSignupRoutes");
const CancellationPolicy = require("../Routes/cancellationPolicyRoutes");
const CancellationPolicyForm = require("../Routes/cancellationPolicyFormRoutes");
const PrivacyPolicy = require("../Routes/privacyPolicyRoutes");
const BookCopperCanyonScottsdale = require("../Routes/bookCopperCanyonScottsdaleRoutes");
const CopperCanyonScottsdaleForm = require("../Routes/copperCanyonScottsdaleFormRoutes");
const BookWildWestHeistScottsdale = require("../Routes/bookWildWestHeistScottsdaleRoutes");
const WildWestHeistScottsdaleForm = require("../Routes/wildWestHeistScottsdaleFormRoutes");
const BookGhostRidersScottsdale = require("../Routes/bookGhostRidersScottsdaleRoutes");
const GhostRidersScottsdaleForm = require("../Routes/ghostRidersScottsdaleFormRoutes");
const BookHijackedScottsdale = require("../Routes/bookHijackedScottsdaleRoutes");
const HijackScottsdaleForm = require("../Routes/hijackScottsdaleFormRoutes");
const BookAdventureScottsdale = require("../Routes/bookAdventureScottsdaleRoutes");
const AdventureScottsdaleForm = require("../Routes/adventureScottsdaleFormRoutes");
const BookDoubleRidesScottsdale = require("../Routes/bookDoubleRidesScottsdaleRoutes");
const DoubleRidesScottsdaleForm = require("../Routes/doubleRidesScottsdaleFormRoutes");
const BookWildWestHeistPrescott = require("../Routes/bookWildWestHeistPrescottRoutes");
const WildWestHeistPrescottForm = require("../Routes/wildWestHeistPrescottFormRoutes");
const BookGhostRidersPrescott = require("../Routes/bookGhostRidersPrescottRoutes");
const GhostRidersPrescottForm = require("../Routes/ghostRidersPrescottFormRoutes");
const BookHijackedPrescott = require("../Routes/bookHijackedPrescottRoutes");
const HijackPrescottForm = require("../Routes/hijackPrescottFormRoutes");
const BookAdventurePrescott = require("../Routes/bookAdventurePrescottRoutes");
const AdventurePrescottForm = require("../Routes/adventurePrescottFormRoutes");
const BookLostInTimePrescott = require("../Routes/bookLostInTimePrescottRoutes");
const LostInTimePrescottForm = require("../Routes/lostInTimePrescottFormRoutes");
const BookDoubleRidesPrescott = require("../Routes/bookDoubleRidesPrescottRoutes");
const DoubleRidesPrescottForm = require("../Routes/doubleRidesPrescottFormRoutes");
const UpcomingTrip = require("../Routes/upcomingTripRoutes");
const PubActivity = require("../Routes/pubActivityRoutes");
const BookPubCrawlsScottsdale = require("../Routes/bookPubCrawlsScottsdaleRoutes");
const BookClassicRockPubCrawlsScottsdaleActivity = require("./bookClassicRockPubCrawlsScottsdaleActivityRoutes");
const ClassicRockPubCrawlsScottsdaleActivityForm = require("./classicRockPubCrawlsScottsdaleActivityFormRoutes");
const BookClassicRockPubCrawlsPrescottActivity = require("./bookClassicRockPubCrawlsPrecottsActivityRoutes");
const ClassicRockPubCrawlsPrescottActivityForm = require("./classicRockPubCrawlsPrecottActivityFormRoutes");
const BookMurderPubCrawlsPrescottActivity = require("./bookMurderPubCrawlsPrecottsActivityRoutes");
const MurderPubCrawlsPrescottActivityForm = require("./murderPubCrawlsPrecottActivityFormRoutes");
const BookMurderPubCrawlsScottsdaleActivity = require("./bookMurderPubCrawlsScottsdaleActivityRoutes");
const MurderPubCrawlsScottsdaleActivityForm = require("./murderPubCrawlsScottsdaleActivityFormRoutes");
const BookPubPuzzlesPubCrawlsScottsdaleActivity = require("./bookPubPuzzlesPubCrawlsScottsdaleActivityRoutes");
const PubPuzzlesPubCrawlsScottsdaleActivityForm = require("./PubPuzzlesPubCrawlsScottsdaleActivityFormRoutes");
const BookPubPuzzlesPubCrawlsPrescottActivity = require("./bookPubPuzzlesPubCrawlsPrescottActivityRoutes");
const PubPuzzlesPubCrawlsPrescottActivityForm = require("./PubPuzzlesPubCrawlsPrescottActivityFormRoutes");
const BookPubPuzzlesPubCrawlsScottsdale = require("./bookPubPuzzlesPubCrawlsScottsdaleRoutes");
const BookClassicRockPubCrawlsScottsdale = require("./bookClassicRockPubCrawlsScottsdaleRoutes");
const BookMurderPubCrawlsScottsdale = require("./bookMurderPubCrawlsScottsdaleRoutes");
const RidesBooking = require("./ridesBookingRoutes");
const BookScottsdalePubCrawlsScottsdale = require("../Routes/bookScottsdalePubCrawlsScottsdaleRoutes");
const BookPrescottPubCrawlsScottsdale = require("../Routes/bookPrescottPubCrawlsScottsdaleRoutes");
const Payment = require("../Routes/paymentRoutes");

const all = [].concat(adminRoutes, bannerRoutes, WhatArePuzzle, AsSeenOn, BestThingToDo, Adventure, ExploreRides, OurCrawls, Team, OurReview,
    Header, RidesInfo, Footer, FooterLink, Title, BookScottsDale, BookPrescotts, PubCrawls, TeamBuilding, ScottsdaleTeamBuilding, PrescottTeamBuilding, BacheloretteParties,
    MediaAppearances, Faq, GiftCards, ContactUs, ContactUsForm, Location, OurPuzzleMaster, AffiliateProgram, AffiliateProgramSignup, CancellationPolicy, CancellationPolicyForm,
    PrivacyPolicy, BookCopperCanyonScottsdale, CopperCanyonScottsdaleForm, BookWildWestHeistScottsdale, WildWestHeistScottsdaleForm, BookGhostRidersScottsdale,
    GhostRidersScottsdaleForm, BookHijackedScottsdale, HijackScottsdaleForm, BookAdventureScottsdale, AdventureScottsdaleForm, BookDoubleRidesScottsdale, DoubleRidesScottsdaleForm,
    BookWildWestHeistPrescott, WildWestHeistPrescottForm, BookGhostRidersPrescott, GhostRidersPrescottForm, BookHijackedPrescott, HijackPrescottForm, BookAdventurePrescott,
    AdventurePrescottForm, BookLostInTimePrescott, LostInTimePrescottForm, BookDoubleRidesPrescott, DoubleRidesPrescottForm, UpcomingTrip, PubActivity, BookPubCrawlsScottsdale,
    BookClassicRockPubCrawlsScottsdaleActivity, ClassicRockPubCrawlsScottsdaleActivityForm, BookClassicRockPubCrawlsPrescottActivity, ClassicRockPubCrawlsPrescottActivityForm,
    BookMurderPubCrawlsPrescottActivity, MurderPubCrawlsPrescottActivityForm, BookMurderPubCrawlsScottsdaleActivity, MurderPubCrawlsScottsdaleActivityForm,
    BookPubPuzzlesPubCrawlsScottsdaleActivity, PubPuzzlesPubCrawlsScottsdaleActivityForm, BookPubPuzzlesPubCrawlsPrescottActivity, PubPuzzlesPubCrawlsPrescottActivityForm,
    BookPubPuzzlesPubCrawlsScottsdale, BookClassicRockPubCrawlsScottsdale, BookMurderPubCrawlsScottsdale, RidesBooking, BookScottsdalePubCrawlsScottsdale,
    BookPrescottPubCrawlsScottsdale, Payment);

module.exports = all;