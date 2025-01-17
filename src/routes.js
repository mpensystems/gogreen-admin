// Copyright 2025 MP ENSYSTEMS ADVISORY PRIVATE LIMITED.

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


import InviteUser from "./pages/examples/InviteUser";
import UserManagment from "./pages/UserManagment";

export const Routes = {
    // pages
    DashboardOverview: { path: "/" },
    Transactions: { path: "/transactions" },
    UserManagment: {path: '/UserManagment'},
    UpdateUserProfile: {path: '/UserManagment/:aid/update-profile'},
    Kyc: { path: "/Kyc" },
    InviteUser : {path : "/UserManagment/InviteUser"},
    KycDetails: { path: "/Kyc/:rid/get" },
    Riders : { path: "/Riders" },
    RiderDetails: { path: "/Riders/:id/get" },
    Bookings : { path: "/Bookings" },
    NewBooking : { path: "Bookings/new-Booking" },
    Booking : { path: "/bookings/:bid/get" },
    TripsTab : { path: "/Trips" },
    Trip : { path: "/Trips/:tripId" },
    UpdateProfile :{path : "/user/update-profile"},
    Settings: { path: "/settings" },
    Upgrade: { path: "/upgrade" },
    BootstrapTables: { path: "/tables/bootstrap-tables" },
    Billing: { path: "/examples/billing" },
    Invoice: { path: "/examples/invoice" },
    Signin: { path: "/signin" },
    unauthorized: { path: "/unauthorized" },
    InitialAccess: { path: "/InitialAccess" },
    Signup: { path: "/examples/sign-up" },
    ForgotPassword: { path: "/examples/forgot-password" },
    ResetPassword: { path: "/reset-password" },
    Lock: { path: "/examples/lock" },
    NotFound: { path: "/examples/404" },
    ServerError: { path: "/examples/500" },

    // docs
    DocsOverview: { path: "/documentation/overview" },
    DocsDownload: { path: "/documentation/download" },
    DocsQuickStart: { path: "/documentation/quick-start" },
    DocsLicense: { path: "/documentation/license" },
    DocsFolderStructure: { path: "/documentation/folder-structure" },
    DocsBuild: { path: "/documentation/build-tools" },
    DocsChangelog: { path: "/documentation/changelog" },

    // components
    Accordions: { path: "/components/accordions" },
    Alerts: { path: "/components/alerts" },
    Badges: { path: "/components/badges" },
    Widgets: { path: "/widgets" },
    Breadcrumbs: { path: "/components/breadcrumbs" },
    Buttons: { path: "/components/buttons" },
    Forms: { path: "/components/forms" },
    Modals: { path: "/components/modals" },
    Navs: { path: "/components/navs" },
    Navbars: { path: "/components/navbars" },
    Pagination: { path: "/components/pagination" },
    Popovers: { path: "/components/popovers" },
    Progress: { path: "/components/progress" },
    Tables: { path: "/components/tables" },
    Tabs: { path: "/components/tabs" },
    Tooltips: { path: "/components/tooltips" },
    Toasts: { path: "/components/toasts" },
    WidgetsComponent: { path: "/components/widgets" }
};