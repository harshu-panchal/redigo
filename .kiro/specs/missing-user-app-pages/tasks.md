# Implementation Plan: Missing User App Pages

## Overview

Implement 13 missing pages across 5 delivery phases for the Redigo React 18 + Tailwind CSS + Framer Motion mobile web app. Each phase wires new pages into `App.jsx` routes and updates the relevant entry-point components. All pages follow the existing glassmorphism design language: orange/slate palette, `rounded-[20px+]` corners, `font-black` typography, and Framer Motion entrance animations.

## Tasks

- [x] 1. Phase 1 — Critical Flow Completions
  - [x] 1.1 Create `ParcelSearchingDriver.jsx` at `frontend/src/modules/user/pages/parcel/ParcelSearchingDriver.jsx`
    - Mirror `SearchingDriver.jsx` structure with SEARCHING → ASSIGNED → ACCEPTED → COMPLETING stage machine
    - Replace all ride-specific copy with parcel equivalents ("Finding your delivery agent", "Delivery Agent Found!", "Delivery Accepted!")
    - On ACCEPTED stage, navigate to `/parcel/tracking` after 800 ms animation, passing `{ driver, otp, pickup, drop, fare, paymentMethod }` via location state
    - Cancel modal must confirm before navigating to `/`; preserve current stage on any backward transition attempt
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9_

  - [ ]\* 1.2 Write property test for stage monotonicity (Req 1 — Property: Stage monotonicity)
    - **Property 1: Stage monotonicity** — FOR ALL stage transition sequences, the stage index SHALL only increase (SEARCHING=0, ASSIGNED=1, ACCEPTED=2, COMPLETING=3)
    - **Validates: Requirements 1.8**
    - Use fast-check `fc.array(fc.integer({min:0,max:3}))` to generate transition sequences and assert no index ever decreases

  - [ ]\* 1.3 Write property test for OTP format (Req 1 — Property: OTP format)
    - **Property 2: OTP format** — FOR ALL generated OTPs, the string SHALL be exactly 4 characters, each in `[0-9]`
    - **Validates: Requirements 1.5**
    - Run `generateOTP()` 1000 times via fast-check and assert `/^\d{4}$/` on every result

  - [x] 1.4 Create `ParcelTracking.jsx` at `frontend/src/modules/user/pages/parcel/ParcelTracking.jsx`
    - Mirror `RideTracking.jsx` with full-screen map background and bottom drawer
    - Source driver name, rating, plate, ETA, OTP, fare, paymentMethod from `useLocation().state`
    - Display OTP in orange-accented pill inside the bottom drawer
    - Action buttons: Call (`tel:`), Chat (`/ride/chat`), Share (`navigator.share` → clipboard fallback with toast), Help (`/support`)
    - Cancel button shows confirmation modal; on confirm navigate to `/`
    - Replace all ride copy with parcel equivalents ("Delivery in progress", "Delivery Agent")
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8_

  - [ ]\* 1.5 Write property test for share idempotence (Req 2 — Property: Share idempotence)
    - **Property 3: Share idempotence** — FOR ALL invocations of the share action on the same delivery state, the produced share text SHALL be identical
    - **Validates: Requirements 2.5**
    - Use fast-check to generate arbitrary driver/pickup/drop state objects and assert `buildShareText(state) === buildShareText(state)` across multiple calls

  - [x] 1.6 Register WorkshopRSA route in `App.jsx` and add entry point in `Profile.jsx`
    - Add `const WorkshopRSA = lazy(() => import('./modules/user/pages/services/WorkshopRSA'))` to the lazy imports block in `App.jsx`
    - Add `<Route path="/services/workshop-rsa" element={<WorkshopRSA />} />` inside the User Module Routes section
    - Add a menu item `{ icon: Wrench, title: 'Workshop & RSA', sub: 'Roadside assistance', path: '/services/workshop-rsa', bg: 'bg-amber-50', color: 'text-amber-500' }` to the `menuItems` array in `Profile.jsx`
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

  - [x] 1.7 Wire Phase 1 routes into `App.jsx` and update `SenderReceiverDetails.jsx`
    - Add lazy imports for `ParcelSearchingDriver` and `ParcelTracking`
    - Add routes: `<Route path="/parcel/searching" element={<ParcelSearchingDriver />} />` and `<Route path="/parcel/tracking" element={<ParcelTracking />} />`
    - In `SenderReceiverDetails.jsx`, change the `handleProceed` navigation target from `/ride/select-location` to `/parcel/searching`, passing all existing state fields plus `isParcel: true`
    - _Requirements: 1.1, 2.1, 3.1_

- [x] 2. Checkpoint — Phase 1 complete
  - Ensure all Phase 1 tests pass and routes render without errors. Ask the user if questions arise.

- [x] 3. Phase 2 — Core Utility Pages
  - [x] 3.1 Create `Notifications.jsx` at `frontend/src/modules/user/pages/Notifications.jsx`
    - Fetch from `GET /api/v1/notifications/get-notification` on mount; show skeleton cards while loading
    - Render each item with title, body, timestamp, and read/unread visual indicator (orange left-border or dot for unread)
    - Unread badge count in header equals `notifications.filter(n => !n.read).length`
    - Tap to mark as read; swipe-left or delete icon removes item with slide-out Framer Motion animation
    - Empty state: illustration + "You're all caught up"; error state: message + "Retry" button
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8_

  - [ ]\* 3.2 Write property test for unread count invariant (Req 4 — Property: Unread count invariant)
    - **Property 4: Unread count invariant** — FOR ALL notification list states, `unreadCount === notifications.filter(n => !n.read).length` and `unreadCount <= notifications.length`
    - **Validates: Requirements 4.7**
    - Use fast-check `fc.array(fc.record({ id: fc.string(), read: fc.boolean() }))` and assert both conditions

  - [ ]\* 3.3 Write property test for delete invariant (Req 4 — Property: Delete invariant)
    - **Property 5: Delete invariant** — FOR ALL delete operations on a list of length N, result has length N-1 and does not contain the deleted item
    - **Validates: Requirements 4.6**
    - Generate arbitrary notification arrays and a random index to delete; assert length and absence

  - [x] 3.4 Create `PromoCodes.jsx` at `frontend/src/modules/user/pages/PromoCodes.jsx`
    - Fetch from `GET /api/v1/request/promocode-list`; show skeleton cards while loading
    - Each card: code string, discount value/percentage, expiry date, applicable service type, "Apply" button
    - "Apply" calls `POST /api/v1/request/promocode-redeem`; success → success toast + checkmark; error → dismissible error banner with API message
    - Manual code entry text input + submit via same redemption API
    - Applied state: tapping "Apply" again SHALL NOT trigger a second API call
    - Empty state: "No promo codes available right now"
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8_

  - [ ]\* 3.5 Write property test for discount bounds (Req 5 — Property: Discount bounds)
    - **Property 6: Discount bounds** — FOR ALL applied promo codes, `discount >= 0` and `discount <= fare`
    - **Validates: Requirements 5.3, 5.4**
    - Use fast-check `fc.record({ discount: fc.float({min:0}), fare: fc.float({min:0}) })` and assert the invariant after applying

  - [ ]\* 3.6 Write property test for applied idempotence (Req 5 — Property: Applied idempotence)
    - **Property 7: Applied idempotence** — FOR ALL promo codes already in applied state, tapping Apply again SHALL NOT change state or trigger API call
    - **Validates: Requirements 5.3**
    - Mock the API call counter and assert it remains 0 when Apply is invoked on an already-applied code

  - [x] 3.7 Create `Referral.jsx` at `frontend/src/modules/user/pages/Referral.jsx`
    - Display user's referral code in a prominent copyable card; copy icon → clipboard + "Copied!" toast for 2 s
    - Share button: `navigator.share` with pre-composed invite message; fallback to WhatsApp deep link
    - Fetch history from `GET /api/v1/common/referral/history`; display each record with referred user name, join date, reward amount
    - Aggregate stats: total invites = `referralHistory.length`, total rewards = sum of all `record.reward`
    - Empty state: "No referrals yet — share your code to start earning"; skeleton rows while loading
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7_

  - [ ]\* 3.8 Write property test for stats consistency (Req 6 — Property: Stats consistency)
    - **Property 8: Stats consistency** — FOR ALL referral history states, `totalInvites === referralHistory.length` and `totalRewards === sum(referralHistory.map(r => r.reward))`
    - **Validates: Requirements 6.5**
    - Use fast-check `fc.array(fc.record({ reward: fc.float({min:0}) }))` and assert both aggregate values

  - [x] 3.9 Wire Phase 2 routes into `App.jsx` and update `Profile.jsx` and `Wallet.jsx`
    - Add lazy imports for `Notifications`, `PromoCodes`, `Referral` (user module, not driver)
    - Add routes: `/notifications`, `/promo`, `/referral`
    - In `Profile.jsx` `menuItems`, update the Notifications entry path from `/profile/notifications` to `/notifications` and add a Referral entry `{ icon: Gift, title: 'Referral', sub: 'Invite friends & earn', path: '/referral', bg: 'bg-yellow-50', color: 'text-yellow-500' }`
    - In `Wallet.jsx`, update the "Refer & Earn" promo card `onClick` from `/taxi/driver/referral` to `/referral`
    - _Requirements: 4.1, 5.1, 6.1_

- [x] 4. Checkpoint — Phase 2 complete
  - Ensure all Phase 2 tests pass and new routes render correctly. Ask the user if questions arise.

- [x] 5. Phase 3 — Safety & Support
  - [x] 5.1 Create `SOSContacts.jsx` at `frontend/src/modules/user/pages/safety/SOSContacts.jsx`
    - Display current SOS contacts list (name + phone); "Add Contact" button opens inline form / bottom sheet with name + phone fields
    - Validate: non-empty name, 10-digit Indian mobile (`/^[6-9]\d{9}$/`); show inline error and block API call on invalid input
    - Add: `POST /api/v1/common/sos/store`; Delete: confirmation prompt → `POST /api/v1/common/sos/delete/:id`; remove from list on success
    - Limit: max 5 contacts; disable "Add Contact" when limit reached
    - Prominent SOS trigger button with 3-second countdown before alerting contacts
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7_

  - [ ]\* 5.2 Write property test for SOS add invariant (Req 7 — Property: Add invariant)
    - **Property 9: Add invariant** — FOR ALL successful add operations on a list of length N (<5), result has length N+1 and contains the new contact
    - **Validates: Requirements 7.3**
    - Use fast-check to generate contact arrays of length 0–4 and assert post-add length and membership

  - [ ]\* 5.3 Write property test for SOS delete invariant (Req 7 — Property: Delete invariant)
    - **Property 10: Delete invariant** — FOR ALL successful delete operations on a list of length N, result has length N-1 and does not contain the deleted contact
    - **Validates: Requirements 7.5**

  - [ ]\* 5.4 Write property test for SOS uniqueness invariant (Req 7 — Property: Uniqueness invariant)
    - **Property 11: Uniqueness invariant** — FOR ALL states of the SOS contact list, no two contacts share the same phone number
    - **Validates: Requirements 7.3**
    - Generate contact arrays and assert `new Set(contacts.map(c => c.phone)).size === contacts.length`

  - [ ]\* 5.5 Write property test for SOS limit invariant (Req 7 — Property: Limit invariant)
    - **Property 12: Limit invariant** — FOR ALL states of the SOS contact list, `contacts.length <= 5`
    - **Validates: Requirements 7.7**

  - [x] 5.6 Create `SupportTickets.jsx` at `frontend/src/modules/user/pages/support/SupportTickets.jsx`
    - List tickets with subject, status badge (Open=orange, In Progress=blue, Resolved=green), last-updated timestamp
    - "New Ticket" form: subject (text), category (dropdown), description (textarea); inline validation on empty subject/description
    - Create ticket via support API; add to list on success
    - Tap ticket → navigate to `/support/ticket/:id`
    - Empty state: "No tickets yet — tap + to get help"
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.7, 8.8_

  - [x] 5.7 Create `SupportTicketDetail.jsx` at `frontend/src/modules/user/pages/support/SupportTicketDetail.jsx`
    - Display full ticket thread with all messages
    - Reply input at bottom; submit non-empty reply → append to thread
    - Status badge colour coding consistent with list page
    - _Requirements: 8.5, 8.6, 8.7_

  - [ ]\* 5.8 Write property test for ticket status progression (Req 8 — Property: Status progression)
    - **Property 13: Status progression** — FOR ALL status transitions, status SHALL only move Open → In_Progress → Resolved and SHALL NOT regress
    - **Validates: Requirements 8.1, 8.7**
    - Encode statuses as integers (0,1,2) and use fast-check to assert no transition decreases the index

  - [ ]\* 5.9 Write property test for reply append (Req 8 — Property: Reply append)
    - **Property 14: Reply append** — FOR ALL reply submissions on a thread of length N, result has length N+1 and last message equals submitted text
    - **Validates: Requirements 8.6**

  - [x] 5.10 Create `DeleteAccount.jsx` at `frontend/src/modules/user/pages/profile/DeleteAccount.jsx`
    - Warning screen explaining consequences (ride history, wallet balance, saved data loss)
    - Predefined deletion reason list (radio/select); confirm button disabled until reason selected
    - "Confirm Delete" → final modal with "This action cannot be undone" text
    - On modal confirm: call deletion API → navigate to `/login` on success; show error and stay on page on failure
    - "Cancel" navigates to `/profile` without any API call
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7_

  - [x] 5.11 Wire Phase 3 routes into `App.jsx` and update `Profile.jsx` and `SecuritySettings.jsx`
    - Add lazy imports for `SOSContacts`, `SupportTickets`, `SupportTicketDetail`, `DeleteAccount`
    - Add routes: `/safety/sos`, `/support/tickets`, `/support/ticket/:id`, `/profile/delete-account`
    - In `Profile.jsx` `menuItems`, update Support entry path from `/support` to `/support/tickets`
    - In `SecuritySettings.jsx`, add a navigable "SOS Contacts" row linking to `/safety/sos` and a "Delete Account" row linking to `/profile/delete-account`
    - _Requirements: 7.1, 8.1, 9.1_

- [x] 6. Checkpoint — Phase 3 complete
  - Ensure all Phase 3 tests pass and safety/support routes render correctly. Ask the user if questions arise.

- [x] 7. Phase 4 — New Service Pages
  - [x] 7.1 Create `AirportCab.jsx` at `frontend/src/modules/user/pages/cab/AirportCab.jsx`
    - Form fields: pickup address (text), terminal selection (T1/T2/T3 toggle), travel date (date input), travel time (time input), vehicle type (Mini/Sedan/SUV cards)
    - Each vehicle card shows fixed fare amount and a "Fixed Fare" badge
    - Selecting a vehicle updates the fare summary section
    - Validation: highlight empty fields with red border + inline error on submit attempt
    - "Book Airport Cab" navigates to `/ride/select-location` with `{ isAirport: true, terminal, date, time, vehicle, fare }` via location state
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_

  - [ ]\* 7.2 Write property test for fare monotonicity (Req 10 — Property: Fare monotonicity)
    - **Property 15: Fare monotonicity** — FOR ALL vehicle options ordered Mini < Sedan < SUV, `fare(Mini) <= fare(Sedan) <= fare(SUV)`
    - **Validates: Requirements 10.2**
    - Assert the static fare array satisfies the ordering invariant

  - [x] 7.3 Create `SpiritualTrip.jsx` at `frontend/src/modules/user/pages/cab/SpiritualTrip.jsx`
    - Grid of destination cards: Ujjain (Mahakaleshwar), Omkareshwar, Maheshwar, Orchha (minimum)
    - Each card: image/icon, destination name, distance from Indore, estimated fare range
    - "Guided Tours" header badge consistent with CabHome service tag style
    - Tap card → navigate to `/ride/select-location` with `{ destination, isSpiritualTrip: true }` via location state
    - _Requirements: 11.1, 11.2, 11.3, 11.4_

  - [x] 7.4 Create `IntercityConfirm.jsx` at `frontend/src/modules/user/pages/intercity/IntercityConfirm.jsx`
    - Success animation: scale-in checkmark using Framer Motion
    - Display Booking_ID (format `IC-XXXXXX`), origin city, destination city, travel date, vehicle type, passengers, total fare — all from `useLocation().state`
    - Generate Booking_ID matching `^IC-[A-Z0-9]{6}$` if not provided in state
    - "Back to Home" button → navigate to `/`
    - "Share Booking" button → `navigator.share` with booking summary
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.6_

  - [ ]\* 7.5 Write property test for Booking ID format (Req 12 — Property: Booking ID format)
    - **Property 16: Booking ID format** — FOR ALL generated Booking IDs, the string SHALL match `^IC-[A-Z0-9]{6}$`
    - **Validates: Requirements 12.6**
    - Run `generateBookingId()` 1000 times via fast-check and assert the regex on every result

  - [x] 7.6 Update `CabHome.jsx` and `IntercityHome.jsx` entry points
    - In `CabHome.jsx` `services` array, change Airport Cab `path` from `/ride/select-location` to `/cab/airport`
    - In `CabHome.jsx` `services` array, change Spiritual Trips `path` from `/ride/select-location` to `/cab/spiritual`
    - In `IntercityHome.jsx`, update the "Book Intercity Cab" `onClick` to navigate to `/intercity/confirm` instead of `/ride/select-location`, passing `{ bookingId, fromCity, toCity, tripType, date, passengers, vehicle, fare: estimatedFare }` via location state
    - _Requirements: 10.7, 11.5, 12.5_

  - [x] 7.7 Wire Phase 4 routes into `App.jsx`
    - Add lazy imports for `AirportCab`, `SpiritualTrip`, `IntercityConfirm`
    - Add routes: `/cab/airport`, `/cab/spiritual`, `/intercity/confirm`
    - _Requirements: 10.1, 11.1, 12.1_

- [x] 8. Checkpoint — Phase 4 complete
  - Ensure all Phase 4 tests pass and new service routes render correctly. Ask the user if questions arise.

- [x] 9. Phase 5 — Onboarding
  - [x] 9.1 Create `Onboarding.jsx` at `frontend/src/modules/user/pages/auth/Onboarding.jsx`
    - On mount: check `localStorage.getItem('onboarding_complete')`; if present, redirect to `/` immediately
    - Fetch slides from `GET /api/v1/on-boarding`; fall back to 3 locally seeded slides (fast rides, safety features, earning with referrals) on API failure — no error screen shown
    - Horizontal slide animation on "Next" (Framer Motion `AnimatePresence` with `x` variants)
    - Dot-indicator row: active dot is orange and larger; inactive dots are slate-colored
    - "Next" on last slide replaced by "Get Started" CTA → `localStorage.setItem('onboarding_complete', 'true')` then navigate to `/login`
    - "Skip" button on every slide → navigate immediately to `/login`
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7, 13.8_

  - [ ]\* 9.2 Write property test for slide index bounds (Req 13 — Property: Slide index bounds)
    - **Property 17: Slide index bounds** — FOR ALL "Next" interactions, `currentIndex` SHALL remain within `[0, slides.length - 1]`; tapping Next on the last slide SHALL NOT increment beyond `slides.length - 1`
    - **Validates: Requirements 13.3, 13.4**
    - Use fast-check `fc.array(fc.anything(), {minLength:1})` for slides and `fc.nat()` for tap count; assert index never exceeds `slides.length - 1`

  - [ ]\* 9.3 Write property test for skip idempotence (Req 13 — Property: Skip idempotence)
    - **Property 18: Skip idempotence** — FOR ALL slide positions, tapping "Skip" SHALL always navigate to `/login` regardless of current index
    - **Validates: Requirements 13.5**
    - Use fast-check `fc.integer({min:0, max:10})` for current index and assert the navigation target is always `/login`

  - [x] 9.4 Wire Phase 5 route into `App.jsx`
    - Add lazy import for `Onboarding`
    - Add route: `<Route path="/onboarding" element={<Onboarding />} />`
    - _Requirements: 13.1_

- [x] 10. Final checkpoint — All phases complete
  - Ensure all tests pass across all 5 phases. Verify all 13 pages render without errors and all entry-point wiring is correct. Ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP delivery
- Property tests use `fast-check` (`fc`) consistent with the existing frontend test setup
- Each task references specific requirements for full traceability
- All new pages must use the existing design tokens: `bg-[linear-gradient(180deg,#F8FAFC...)]`, `rounded-[20px+]`, `font-black`, orange-500 primary accent
- Framer Motion entrance animations (`initial={{ opacity:0, y:10 }}`, `animate={{ opacity:1, y:0 }}`) are required on all new pages
- The `WorkshopRSA` component already exists at `frontend/src/modules/user/pages/services/WorkshopRSA.jsx` — only routing and entry-point wiring is needed
