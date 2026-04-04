import { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';

// Lazy loading pages for performance
const UserHome = lazy(() => import('./modules/user/pages/Home'));
const Login = lazy(() => import('./modules/user/pages/auth/Login'));
const VerifyOTP = lazy(() => import('./modules/user/pages/auth/VerifyOTP'));
const Signup = lazy(() => import('./modules/user/pages/auth/Signup'));

// Ride Module Pages
const SelectLocation = lazy(() => import('./modules/user/pages/ride/SelectLocation'));
const SelectVehicle = lazy(() => import('./modules/user/pages/ride/SelectVehicle'));
const SearchingDriver = lazy(() => import('./modules/user/pages/ride/SearchingDriver'));
const RideTracking = lazy(() => import('./modules/user/pages/ride/RideTracking'));
const RideComplete = lazy(() => import('./modules/user/pages/ride/RideComplete'));
const Chat = lazy(() => import('./modules/user/pages/ride/Chat'));
const Support = lazy(() => import('./modules/user/pages/ride/Support'));
const RideDetail = lazy(() => import('./modules/user/pages/ride/RideDetail'));

// Parcel Module Pages
const ParcelType = lazy(() => import('./modules/user/pages/parcel/ParcelType'));
const ParcelDetails = lazy(() => import('./modules/user/pages/parcel/ParcelDetails'));
const SenderReceiverDetails = lazy(() => import('./modules/user/pages/parcel/SenderReceiverDetails'));

// Profile & History
const Activity = lazy(() => import('./modules/user/pages/Activity'));
const Profile = lazy(() => import('./modules/user/pages/Profile'));
const Wallet = lazy(() => import('./modules/user/pages/Wallet'));

// Coming Soon placeholder (for /tours and any unbuilt routes)
const ComingSoon = lazy(() => import('./modules/shared/pages/ComingSoon'));

// New Feature Pages
const BikeRentalHome = lazy(() => import('./modules/user/pages/rental/BikeRentalHome'));
const RentalVehicleDetail = lazy(() => import('./modules/user/pages/rental/RentalVehicleDetail'));
const RentalSchedule = lazy(() => import('./modules/user/pages/rental/RentalSchedule'));
const RentalKYC = lazy(() => import('./modules/user/pages/rental/RentalKYC'));
const RentalDeposit = lazy(() => import('./modules/user/pages/rental/RentalDeposit'));
const RentalConfirmed = lazy(() => import('./modules/user/pages/rental/RentalConfirmed'));
const IntercityHome = lazy(() => import('./modules/user/pages/intercity/IntercityHome'));
const CabSharing = lazy(() => import('./modules/user/pages/cabsharing/CabSharing'));
const CabHome = lazy(() => import('./modules/user/pages/cab/CabHome'));
const SharedTaxi = lazy(() => import('./modules/user/pages/cab/SharedTaxi'));
const SharedTaxiSeats = lazy(() => import('./modules/user/pages/cab/SharedTaxiSeats'));
const SharedTaxiConfirm = lazy(() => import('./modules/user/pages/cab/SharedTaxiConfirm'));

// Profile Settings Sub-pages
const ProfileSettings = lazy(() => import('./modules/user/pages/profile/ProfileSettings'));
const PaymentSettings = lazy(() => import('./modules/user/pages/profile/PaymentSettings'));
const AddressSettings = lazy(() => import('./modules/user/pages/profile/AddressSettings'));
const NotificationSettings = lazy(() => import('./modules/user/pages/profile/NotificationSettings'));
const SecuritySettings = lazy(() => import('./modules/user/pages/profile/SecuritySettings'));

// Driver Module - Registration
const DriverWelcome = lazy(() => import('./modules/driver/pages/registration/DriverWelcome'));
const DriverAuth = lazy(() => import('./modules/driver/pages/registration/DriverAuth'));
const RegistrationDashboard = lazy(() => import('./modules/driver/pages/registration/RegistrationDashboard'));
const RegistrationStatus = lazy(() => import('./modules/driver/pages/registration/RegistrationStatus'));
const StepPersonal = lazy(() => import('./modules/driver/pages/registration/StepPersonal'));
const StepVehicle = lazy(() => import('./modules/driver/pages/registration/StepVehicle'));
const StepDocuments = lazy(() => import('./modules/driver/pages/registration/StepDocuments'));
const StepSelfie = lazy(() => import('./modules/driver/pages/registration/StepSelfie'));
const StepBank = lazy(() => import('./modules/driver/pages/registration/StepBank'));
const ApplicationStatus = lazy(() => import('./modules/driver/pages/registration/ApplicationStatus'));

// Driver Module - Core
const DriverHome = lazy(() => import('./modules/driver/pages/DriverHome'));
const ActiveTrip = lazy(() => import('./modules/driver/pages/ActiveTrip'));
const DriverWallet = lazy(() => import('./modules/driver/pages/DriverWallet'));
const DriverProfile = lazy(() => import('./modules/driver/pages/DriverProfile'));
const RideRequests = lazy(() => import('./modules/driver/pages/RideRequests'));

// Driver Module - Settings
const DriverSettings = lazy(() => import('./modules/driver/pages/settings/DriverSettings'));
const EditProfile = lazy(() => import('./modules/driver/pages/settings/EditProfile'));
const DriverDocuments = lazy(() => import('./modules/driver/pages/settings/DriverDocuments'));
const Notifications = lazy(() => import('./modules/driver/pages/settings/Notifications'));
const PayoutMethods = lazy(() => import('./modules/driver/pages/settings/PayoutMethods'));
const Referral = lazy(() => import('./modules/driver/pages/settings/Referral'));
const SecuritySOS = lazy(() => import('./modules/driver/pages/settings/SecuritySOS'));
const DriverSupport = lazy(() => import('./modules/driver/pages/settings/Support'));
const VehicleFleet = lazy(() => import('./modules/driver/pages/settings/VehicleFleet'));

// Admin Module Pages
const AdminLayout = lazy(() => import('./modules/admin/components/AdminLayout'));
const AdminLogin = lazy(() => import('./modules/admin/pages/auth/AdminLogin'));
const AdminDashboard = lazy(() => import('./modules/admin/pages/dashboard/MainDashboard'));
const AdminUserList = lazy(() => import('./modules/admin/pages/users/UserList'));
const AdminUserDetails = lazy(() => import('./modules/admin/pages/users/UserDetails'));
const AdminDeleteRequestUsers = lazy(() => import('./modules/admin/pages/users/DeleteRequestUsers'));
const AdminUserBulkUpload = lazy(() => import('./modules/admin/pages/users/UserBulkUpload'));

// DRIVER MANAGEMENT IMPORTS
const AdminDriverList = lazy(() => import('./modules/admin/pages/drivers/DriverList'));
const AdminDriverDetails = lazy(() => import('./modules/admin/pages/drivers/DriverDetails'));
const AdminPendingDrivers = lazy(() => import('./modules/admin/pages/drivers/PendingDrivers'));
const AdminDriverSubscriptions = lazy(() => import('./modules/admin/pages/drivers/DriverSubscriptions'));
const AdminDriverRatings = lazy(() => import('./modules/admin/pages/drivers/DriverRatings'));
const AdminDriverRatingDetail = lazy(() => import('./modules/admin/pages/drivers/DriverRatingDetail'));
const AdminDriverWallet = lazy(() => import('./modules/admin/pages/drivers/DriverWallet'));
const AdminNegativeBalanceDrivers = lazy(() => import('./modules/admin/pages/drivers/NegativeBalanceDrivers'));
const AdminWithdrawalRequestDrivers = lazy(() => import('./modules/admin/pages/drivers/WithdrawalRequestDrivers'));
const AdminWithdrawalRequestDetail = lazy(() => import('./modules/admin/pages/drivers/WithdrawalRequestDetail'));
const AdminDriverDeleteRequests = lazy(() => import('./modules/admin/pages/drivers/DriverDeleteRequests'));
const AdminGlobalDocuments = lazy(() => import('./modules/admin/pages/drivers/GlobalDocuments'));
const AdminDriverBulkUpload = lazy(() => import('./modules/admin/pages/drivers/DriverBulkUpload'));
const AdminDriverAudit = lazy(() => import('./modules/admin/pages/drivers/DriverAudit'));
const AdminPaymentMethods = lazy(() => import('./modules/admin/pages/drivers/PaymentMethods'));
const AdminServiceConfig = lazy(() => import('./modules/admin/pages/drivers/ServiceConfig'));
const AdminReferralDashboard = lazy(() => import('./modules/admin/pages/referrals/ReferralDashboard'));
const AdminReferralSettings = lazy(() => import('./modules/admin/pages/referrals/ReferralSettings'));

// OWNER MANAGEMENT IMPORTS
const AdminOwnerDashboard = lazy(() => import('./modules/admin/pages/owners/OwnerDashboard'));
const AdminManageOwners = lazy(() => import('./modules/admin/pages/owners/ManageOwners'));

const AdminGeoFencing = lazy(() => import('./modules/admin/pages/geo/GeoFencing'));
const AdminFinance = lazy(() => import('./modules/admin/pages/finance/Finance'));
const AdminFareConfig = lazy(() => import('./modules/admin/pages/finance/FareConfiguration'));
const AdminSafetyCenter = lazy(() => import('./modules/admin/pages/safety/SafetyCenter'));
const AdminCMSBuilder = lazy(() => import('./modules/admin/pages/cms/CMSBuilder'));
const AdminGlobalSettings = lazy(() => import('./modules/admin/pages/settings/GlobalSettings'));

// A wrapper to handle conditional layouts (Mobile for User/Driver, Full for Admin)
const MainLayout = ({ children }) => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  if (isAdminPath) {
    return <div className="redigo-admin-root h-screen bg-gray-50 overflow-hidden">{children}</div>;
  }

  return (
    <div className="redigo-app min-h-screen bg-gray-50/50">
      <main className="max-w-lg mx-auto shadow-2xl bg-white min-h-screen relative overflow-x-hidden">
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <MainLayout>
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen bg-white">
            <span className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></span>
          </div>
        }>
          <Routes>
            {/* User Module Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<UserHome />} />
            
            <Route path="/ride/select-location" element={<SelectLocation />} />
            <Route path="/ride/select-vehicle" element={<SelectVehicle />} />
            <Route path="/ride/searching" element={<SearchingDriver />} />
            <Route path="/ride/tracking" element={<RideTracking />} />
            <Route path="/ride/complete" element={<RideComplete />} />
            <Route path="/ride/chat" element={<Chat />} />
            <Route path="/support" element={<Support />} />
            <Route path="/ride/detail/:id" element={<RideDetail />} />

            <Route path="/parcel/type" element={<ParcelType />} />
            <Route path="/parcel/details" element={<ParcelDetails />} />
            <Route path="/parcel/contacts" element={<SenderReceiverDetails />} />
            <Route path="/parcel/detail/:id" element={<RideDetail />} />

            {/* New Service Routes — Real pages replacing ComingSoon */}
            <Route path="/rental" element={<BikeRentalHome />} />
            <Route path="/rental/vehicle" element={<RentalVehicleDetail />} />
            <Route path="/rental/schedule" element={<RentalSchedule />} />
            <Route path="/rental/kyc" element={<RentalKYC />} />
            <Route path="/rental/deposit" element={<RentalDeposit />} />
            <Route path="/rental/confirmed" element={<RentalConfirmed />} />
            <Route path="/intercity" element={<IntercityHome />} />
            <Route path="/cab-sharing" element={<CabSharing />} />
            <Route path="/cab" element={<CabHome />} />
            <Route path="/cab/shared" element={<SharedTaxi />} />
            <Route path="/cab/shared/seats" element={<SharedTaxiSeats />} />
            <Route path="/cab/shared/confirm" element={<SharedTaxiConfirm />} />
            <Route path="/tours" element={<ComingSoon />} />

            <Route path="/activity" element={<Activity />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/wallet" element={<Wallet />} />

            <Route path="/profile/settings" element={<ProfileSettings />} />
            <Route path="/profile/payments" element={<PaymentSettings />} />
            <Route path="/profile/addresses" element={<AddressSettings />} />
            <Route path="/profile/notifications" element={<NotificationSettings />} />
            <Route path="/profile/security" element={<SecuritySettings />} />
            
            {/* Driver Module Routes */}
            <Route path="/taxi/driver/welcome" element={<DriverWelcome />} />
            <Route path="/taxi/driver/auth" element={<DriverAuth />} />
            <Route path="/taxi/driver/dashboard-reg" element={<RegistrationDashboard />} />
            <Route path="/taxi/driver/step-personal" element={<StepPersonal />} />
            <Route path="/taxi/driver/step-vehicle" element={<StepVehicle />} />
            <Route path="/taxi/driver/step-documents" element={<StepDocuments />} />
            <Route path="/taxi/driver/step-selfie" element={<StepSelfie />} />
            <Route path="/taxi/driver/step-bank" element={<StepBank />} />
            <Route path="/taxi/driver/registration-status" element={<RegistrationStatus />} />
            <Route path="/taxi/driver/status" element={<ApplicationStatus />} />

            <Route path="/taxi/driver/home" element={<DriverHome />} />
            <Route path="/taxi/driver/dashboard" element={<DriverHome />} />
            <Route path="/taxi/driver/active-trip" element={<ActiveTrip />} />
            <Route path="/taxi/driver/wallet" element={<DriverWallet />} />
            <Route path="/taxi/driver/profile" element={<DriverProfile />} />
            <Route path="/taxi/driver/history" element={<RideRequests />} />

            <Route path="/taxi/driver/settings" element={<DriverSettings />} />
            <Route path="/taxi/driver/edit-profile" element={<EditProfile />} />
            <Route path="/taxi/driver/documents" element={<DriverDocuments />} />
            <Route path="/taxi/driver/notifications" element={<Notifications />} />
            <Route path="/taxi/driver/payout-methods" element={<PayoutMethods />} />
            <Route path="/taxi/driver/referral" element={<Referral />} />
            <Route path="/taxi/driver/security" element={<SecuritySOS />} />
            <Route path="/taxi/driver/support" element={<DriverSupport />} />
            <Route path="/taxi/driver/vehicle-fleet" element={<VehicleFleet />} />

            {/* Admin Module Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<AdminUserList />} />
              <Route path="users/:id" element={<AdminUserDetails />} />
              <Route path="users/delete-requests" element={<AdminDeleteRequestUsers />} />
              <Route path="users/bulk-upload" element={<AdminUserBulkUpload />} />
              
              <Route path="drivers" element={<AdminDriverList />} />
              <Route path="drivers/:id" element={<AdminDriverDetails />} />
              <Route path="drivers/pending" element={<AdminPendingDrivers />} />
              <Route path="drivers/subscription" element={<AdminDriverSubscriptions />} />
              <Route path="drivers/ratings" element={<AdminDriverRatings />} />
              <Route path="drivers/ratings/:id" element={<AdminDriverRatingDetail />} />
              <Route path="drivers/wallet" element={<AdminDriverWallet />} />
              <Route path="drivers/wallet/negative" element={<AdminNegativeBalanceDrivers />} />
              <Route path="drivers/wallet/withdrawals" element={<AdminWithdrawalRequestDrivers />} />
              <Route path="drivers/wallet/withdrawals/:id" element={<AdminWithdrawalRequestDetail />} />
              <Route path="drivers/delete-requests" element={<AdminDriverDeleteRequests />} />
              <Route path="drivers/documents" element={<AdminGlobalDocuments />} />
              <Route path="drivers/bulk-upload" element={<AdminDriverBulkUpload />} />
              <Route path="drivers/payment-methods" element={<AdminPaymentMethods />} />
              <Route path="drivers/service-config" element={<AdminServiceConfig />} />
               <Route path="drivers/audit/:id" element={<AdminDriverAudit />} />
              <Route path="referrals/dashboard" element={<AdminReferralDashboard />} />
              <Route path="referrals/settings" element={<AdminReferralSettings />} />
              
              {/* Owner Management */}
              <Route path="owners/dashboard" element={<AdminOwnerDashboard />} />
              <Route path="owners" element={<AdminManageOwners />} />
              <Route path="owners/wallet" element={<div className="flex items-center justify-center min-h-[500px] text-gray-400 font-bold uppercase tracking-widest">Owner Wallet Ledger - Under Development</div>} />
              
              {/* Fleet Management Sub-routes */}
              <Route path="fleet/drivers" element={<div className="flex items-center justify-center min-h-[500px] text-gray-400 font-bold uppercase tracking-widest">Fleet Active Drivers - Under Development</div>} />
              <Route path="fleet/blocked" element={<div className="flex items-center justify-center min-h-[500px] text-gray-400 font-bold uppercase tracking-widest">Blocked Fleet Drivers List - Under Development</div>} />
              <Route path="fleet/documents" element={<div className="flex items-center justify-center min-h-[500px] text-gray-400 font-bold uppercase tracking-widest">Fleet Required Documents - Under Development</div>} />
              <Route path="fleet/manage" element={<div className="flex items-center justify-center min-h-[500px] text-gray-400 font-bold uppercase tracking-widest">Master Fleet Management - Under Development</div>} />
              
              <Route path="owners/documents" element={<div className="flex items-center justify-center min-h-[500px] text-gray-400 font-bold uppercase tracking-widest">Global Owner Documents - Under Development</div>} />
              <Route path="owners/deleted" element={<div className="flex items-center justify-center min-h-[500px] text-gray-400 font-bold uppercase tracking-widest">Archived Owners - Under Development</div>} />
              <Route path="owners/bookings" element={<div className="flex items-center justify-center min-h-[500px] text-gray-400 font-bold uppercase tracking-widest">Fleet Bookings - Under Development</div>} />
              <Route path="referrals/config" element={<div className="flex items-center justify-center min-h-[500px] text-gray-400 font-bold uppercase tracking-widest">Referral Configuration - Under Setup</div>} />
              <Route path="referrals/active" element={<div className="flex items-center justify-center min-h-[500px] text-gray-400 font-bold uppercase tracking-widest">Active Referrals Logs - Under Setup</div>} />
              <Route path="geo" element={<AdminGeoFencing />} />
              <Route path="finance" element={<AdminFinance />} />
              <Route path="pricing" element={<AdminFareConfig />} />
              <Route path="safety" element={<AdminSafetyCenter />} />
              <Route path="cms" element={<AdminCMSBuilder />} />
              <Route path="notifications" element={<div className="flex items-center justify-center min-h-[500px] text-gray-400 font-bold uppercase tracking-widest">Global Notifications Center - Under Development</div>} />
              <Route path="support" element={<div className="flex items-center justify-center min-h-[500px] text-gray-400 font-bold uppercase tracking-widest">Help & Ticket Management - Under Development</div>} />
              <Route path="settings" element={<AdminGlobalSettings />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </Router>
  );
}

export default App;
