# Requirements Document

## Introduction

Redigo is a React 18 + Tailwind CSS + Framer Motion ride-hailing mobile web app (max-width 512 px, mobile-first). A deep codebase audit identified 13 pages that are either missing entirely or registered without a route. This document specifies all 13 pages grouped into five delivery phases, ordered by user-journey criticality. Every page must conform to the existing design language: glassmorphism cards, orange/slate palette, `rounded-[20px+]` corners, `font-black` typography, and Framer Motion entrance animations.

---

## Glossary

- **App**: The Redigo React single-page application served at the root URL.
- **Router**: React Router v6 `<Routes>` tree defined in `App.jsx`.
- **User**: An authenticated Redigo customer using the mobile web app.
- **Delivery_Agent**: The driver assigned to a parcel delivery request.
- **Ride_Driver**: The driver assigned to a ride or cab booking.
- **Notification_Item**: A single push/in-app notification object returned by `GET /api/v1/notifications/get-notification`.
- **Promo_Code**: A discount voucher object returned by `GET /api/v1/request/promocode-list`.
- **SOS_Contact**: An emergency contact object stored via `POST /api/v1/common/sos/store`.
- **Support_Ticket**: A help request object managed through the support ticket API.
- **Referral_Record**: A single referral history entry returned by `GET /api/v1/common/referral/history`.
- **Booking_ID**: A unique alphanumeric identifier generated for a confirmed booking.
- **Onboarding_Slide**: One screen in the first-launch walkthrough sequence.
- **Stage**: A named step in a multi-step async flow (e.g., SEARCHING → ASSIGNED → ACCEPTED).
- **ComingSoon**: The existing shared placeholder component used for unbuilt routes.

---

## Phase 1 — Critical Flow Completions

### Requirement 1: Parcel Searching Driver Page

**User Story:** As a User who has filled in parcel contacts, I want to see a live driver-search screen, so that I know my parcel delivery request is being processed and I can track its progress.

#### Acceptance Criteria

1. WHEN the User navigates to `/parcel/searching`, THE App SHALL render the Parcel Searching Driver page with a map background and an animated pulse ring while in the SEARCHING stage.
2. WHEN the SEARCHING stage begins, THE App SHALL display the route pill showing pickup and drop addresses passed via React Router location state.
3. WHEN a Delivery_Agent is found, THE App SHALL transition the Stage from SEARCHING to ASSIGNED and display the Delivery_Agent's name, rating, vehicle, plate, and ETA.
4. WHEN the Stage is ASSIGNED, THE App SHALL display Call, Chat, and Safety action buttons linked to the Delivery_Agent's phone number and the `/ride/chat` and `/support` routes respectively.
5. WHEN the Delivery_Agent accepts the request, THE App SHALL transition the Stage from ASSIGNED to ACCEPTED and reveal the 4-digit OTP the User must share with the Delivery_Agent.
6. WHEN the Stage is ACCEPTED, THE App SHALL navigate to `/parcel/tracking` after a 800 ms completing animation, passing driver, OTP, pickup, drop, and fare via location state.
7. WHEN the User taps "Cancel" during SEARCHING or ASSIGNED, THE App SHALL display a confirmation modal before navigating back to `/`.
8. IF the Stage transitions backward (ACCEPTED → ASSIGNED or ASSIGNED → SEARCHING), THEN THE App SHALL preserve the current Stage and not regress.
9. THE App SHALL mirror the visual design of the existing `/ride/searching` page, substituting parcel-specific copy ("Finding your delivery agent" instead of "Finding your captain").

**Correctness Properties**

- **Stage monotonicity**: FOR ALL stage transition sequences, the Stage index SHALL only increase (SEARCHING=0, ASSIGNED=1, ACCEPTED=2, COMPLETING=3); no backward transition is possible once a Stage is set.
- **OTP format**: FOR ALL generated OTPs, THE App SHALL produce a 4-digit numeric string where each character is in `[0-9]` and the total length equals 4.

---

### Requirement 2: Parcel Tracking Page

**User Story:** As a User whose parcel has been picked up, I want to see a live tracking screen, so that I can monitor the Delivery_Agent's progress and contact them if needed.

#### Acceptance Criteria

1. WHEN the User navigates to `/parcel/tracking`, THE App SHALL render a full-screen map background with a bottom drawer showing Delivery_Agent details.
2. THE App SHALL display the Delivery_Agent's name, rating, vehicle plate, and ETA sourced from React Router location state.
3. THE App SHALL display the 4-digit OTP in an orange-accented pill within the bottom drawer.
4. THE App SHALL provide Call, Chat, Share, and Help action buttons; Call SHALL open `tel:` with the Delivery_Agent's phone number; Chat SHALL navigate to `/ride/chat`; Help SHALL navigate to `/support`.
5. WHEN the User taps Share, THE App SHALL invoke `navigator.share` if available, otherwise copy the delivery details to the clipboard and show a toast notification.
6. WHEN the User taps Cancel, THE App SHALL display a confirmation modal; upon confirmation THE App SHALL navigate to `/`.
7. THE App SHALL display the total fare and payment method sourced from location state.
8. THE App SHALL mirror the visual design of the existing `/ride/tracking` page with parcel-specific copy ("Delivery in progress" instead of "Ride in progress").

**Correctness Properties**

- **Share idempotence**: FOR ALL invocations of the Share action on the same delivery state, THE App SHALL produce identical share text content regardless of how many times Share is tapped.

---

### Requirement 3: WorkshopRSA Route Registration

**User Story:** As a User who needs roadside assistance, I want to navigate to the Workshop & RSA page from the app, so that I can request help without the page returning a 404 or redirect.

#### Acceptance Criteria

1. THE Router SHALL register the path `/services/workshop-rsa` mapped to the existing `WorkshopRSA` component located at `frontend/src/modules/user/pages/services/WorkshopRSA.jsx`.
2. WHEN the User navigates to `/services/workshop-rsa`, THE App SHALL render the WorkshopRSA page without redirecting to `/`.
3. THE App SHALL add a lazy import for `WorkshopRSA` in `App.jsx` consistent with the existing lazy-loading pattern.
4. WHERE a Home page service grid or Profile menu entry exists, THE App SHALL provide a navigable entry point to `/services/workshop-rsa`.

---

## Phase 2 — Core Utility Pages

### Requirement 4: Notifications Inbox Page

**User Story:** As a User, I want to view and manage my in-app notifications, so that I can stay informed about ride updates, offers, and safety alerts.

#### Acceptance Criteria

1. WHEN the User navigates to `/notifications`, THE App SHALL fetch notifications from `GET /api/v1/notifications/get-notification` and display them as a scrollable list.
2. THE App SHALL display each Notification_Item with its title, body text, timestamp, and a visual indicator distinguishing read from unread items.
3. WHEN the list is loading, THE App SHALL display skeleton placeholder cards matching the notification card dimensions.
4. IF the API returns an empty list, THEN THE App SHALL display an empty-state illustration with the message "You're all caught up".
5. WHEN the User taps a Notification_Item, THE App SHALL mark it as read and expand or navigate to its detail.
6. WHEN the User swipes left on a Notification_Item or taps a delete icon, THE App SHALL remove the item from the list with a slide-out animation.
7. THE App SHALL display an unread badge count in the page header that equals the number of Notification_Items where `read === false`.
8. IF the API call fails, THEN THE App SHALL display an error state with a "Retry" button that re-triggers the fetch.

**Correctness Properties**

- **Unread count invariant**: FOR ALL states of the notification list, the unread badge count SHALL equal `notifications.filter(n => !n.read).length`; this value SHALL never exceed `notifications.length`.
- **Delete invariant**: FOR ALL delete operations on a list of length N, the resulting list SHALL have length N-1 and SHALL NOT contain the deleted Notification_Item.

---

### Requirement 5: Promo Codes Page

**User Story:** As a User, I want to browse and apply promo codes, so that I can get discounts on my rides and deliveries.

#### Acceptance Criteria

1. WHEN the User navigates to `/promo`, THE App SHALL fetch available Promo_Codes from `GET /api/v1/request/promocode-list` and display them as cards.
2. THE App SHALL display each Promo_Code card with its code string, discount value or percentage, expiry date, and applicable service type.
3. WHEN the User taps "Apply" on a Promo_Code card, THE App SHALL call `POST /api/v1/request/promocode-redeem` with the selected code.
4. WHEN the redemption API returns success, THE App SHALL display a success toast and mark the Promo_Code as applied with a visual checkmark.
5. IF the redemption API returns an error (e.g., expired or already used), THEN THE App SHALL display the error message returned by the API in a dismissible banner.
6. THE App SHALL allow the User to manually enter a promo code in a text input field and submit it via the same redemption API.
7. WHEN the list is loading, THE App SHALL display skeleton placeholder cards.
8. IF the API returns an empty list, THEN THE App SHALL display an empty-state with the message "No promo codes available right now".

**Correctness Properties**

- **Discount bounds**: FOR ALL applied Promo_Codes, the discount amount SHALL be greater than or equal to 0 and SHALL NOT exceed the original fare amount (discount ≤ fare).
- **Applied idempotence**: FOR ALL Promo_Codes already in the applied state, tapping "Apply" again SHALL NOT trigger a second API call and SHALL leave the applied state unchanged.

---

### Requirement 6: User Referral Page

**User Story:** As a User, I want to view my referral code and history, so that I can invite friends and track my earned rewards.

#### Acceptance Criteria

1. WHEN the User navigates to `/referral`, THE App SHALL display the User's unique referral code in a prominent, copyable card.
2. WHEN the User taps the copy icon, THE App SHALL copy the referral code to the clipboard and show a "Copied!" toast for 2 seconds.
3. WHEN the User taps "Share", THE App SHALL invoke `navigator.share` with a pre-composed invite message containing the referral code; if unavailable, THE App SHALL open a WhatsApp deep link.
4. THE App SHALL fetch referral history from `GET /api/v1/common/referral/history` and display each Referral_Record with the referred user's name, join date, and reward amount.
5. THE App SHALL display aggregate stats: total invites sent and total rewards earned.
6. IF the referral history is empty, THEN THE App SHALL display an empty-state with the message "No referrals yet — share your code to start earning".
7. WHEN the list is loading, THE App SHALL display skeleton placeholder rows.

**Correctness Properties**

- **Stats consistency**: FOR ALL referral history states, the displayed total invites count SHALL equal `referralHistory.length` and the displayed total rewards SHALL equal the sum of all `Referral_Record.reward` values.

---

## Phase 3 — Safety & Support

### Requirement 7: SOS Contacts Page

**User Story:** As a User, I want to manage my emergency contacts, so that trusted people are notified automatically when I trigger an SOS during a trip.

#### Acceptance Criteria

1. WHEN the User navigates to `/safety/sos`, THE App SHALL display the current list of SOS_Contacts with each contact's name and phone number.
2. WHEN the User taps "Add Contact", THE App SHALL display an inline form or bottom sheet with name and phone number fields.
3. WHEN the User submits a valid contact (non-empty name, valid 10-digit Indian mobile number), THE App SHALL call `POST /api/v1/common/sos/store` and add the contact to the list on success.
4. IF the phone number field contains fewer than 10 digits or non-numeric characters, THEN THE App SHALL display an inline validation error and SHALL NOT submit the API call.
5. WHEN the User taps the delete icon on a SOS_Contact, THE App SHALL display a confirmation prompt; upon confirmation THE App SHALL call `POST /api/v1/common/sos/delete/:id` and remove the contact from the list.
6. THE App SHALL display a prominent SOS trigger button; WHEN tapped, THE App SHALL show a 3-second countdown before alerting all SOS_Contacts.
7. THE App SHALL limit the SOS_Contact list to a maximum of 5 contacts and disable the "Add Contact" button when the limit is reached.

**Correctness Properties**

- **Add invariant**: FOR ALL successful add operations on a list of length N, the resulting list SHALL have length N+1 and SHALL contain the newly added SOS_Contact.
- **Delete invariant**: FOR ALL successful delete operations on a list of length N, the resulting list SHALL have length N-1 and SHALL NOT contain the deleted SOS_Contact.
- **Uniqueness invariant**: FOR ALL states of the SOS_Contact list, no two contacts SHALL share the same phone number.
- **Limit invariant**: FOR ALL states of the SOS_Contact list, `contacts.length` SHALL never exceed 5.

---

### Requirement 8: Support Tickets Pages

**User Story:** As a User, I want to create, view, and reply to support tickets, so that I can get help with issues that are not resolved through live chat.

#### Acceptance Criteria

1. WHEN the User navigates to `/support/tickets`, THE App SHALL display a list of the User's existing Support_Tickets with subject, status badge (Open / In Progress / Resolved), and last-updated timestamp.
2. WHEN the User taps "New Ticket", THE App SHALL display a form with subject (text input), category (dropdown), and description (textarea) fields.
3. WHEN the User submits a valid ticket form (non-empty subject and description), THE App SHALL create the ticket via the support API and add it to the list.
4. IF the subject or description field is empty on submission, THEN THE App SHALL display inline validation errors and SHALL NOT submit the API call.
5. WHEN the User taps a Support_Ticket in the list, THE App SHALL navigate to `/support/ticket/:id` and display the full ticket thread including all messages.
6. WHEN the User is on the ticket detail page, THE App SHALL display a reply input at the bottom; WHEN the User submits a non-empty reply, THE App SHALL append the message to the thread.
7. THE App SHALL display status badges using colour coding: Open = orange, In Progress = blue, Resolved = green.
8. IF the ticket list is empty, THEN THE App SHALL display an empty-state with the message "No tickets yet — tap + to get help".

**Correctness Properties**

- **Status progression**: FOR ALL Support_Ticket status transitions, the status SHALL only move in the direction Open → In_Progress → Resolved and SHALL NOT regress to a prior status.
- **Reply append**: FOR ALL reply submissions on a thread of length N, the resulting thread SHALL have length N+1 and the last message SHALL equal the submitted reply text.

---

### Requirement 9: Delete Account Page

**User Story:** As a User, I want to permanently delete my account, so that my personal data is removed from the platform.

#### Acceptance Criteria

1. WHEN the User navigates to `/profile/delete-account`, THE App SHALL display a warning screen explaining the consequences of account deletion (loss of ride history, wallet balance, and saved data).
2. THE App SHALL require the User to select a deletion reason from a predefined list before enabling the confirm button.
3. WHEN the User taps "Confirm Delete", THE App SHALL display a final confirmation modal with the text "This action cannot be undone".
4. WHEN the User confirms deletion in the modal, THE App SHALL call the account deletion API and navigate to `/login` on success.
5. IF the deletion API call fails, THEN THE App SHALL display an error message and keep the User on the current page.
6. THE App SHALL provide a clearly visible "Cancel" option that navigates back to `/profile` without making any API call.
7. THE confirm button SHALL remain disabled until a deletion reason is selected.

---

## Phase 4 — New Service Pages

### Requirement 10: Airport Cab Page

**User Story:** As a User who needs airport transport, I want a dedicated airport cab booking page, so that I can book a fixed-fare transfer with terminal and flight details.

#### Acceptance Criteria

1. WHEN the User navigates to `/cab/airport`, THE App SHALL display an airport cab booking form with fields for pickup address, terminal selection (T1/T2/T3), travel date, travel time, and vehicle type.
2. THE App SHALL display available vehicle options (Mini, Sedan, SUV) with fixed fare amounts per vehicle type.
3. WHEN the User selects a vehicle, THE App SHALL update the displayed fare summary.
4. WHEN the User taps "Book Airport Cab" with all required fields filled, THE App SHALL navigate to `/ride/select-location` passing the booking details via location state with `isAirport: true`.
5. IF any required field is empty when the User taps "Book", THEN THE App SHALL highlight the empty fields with a red border and display inline error messages.
6. THE App SHALL display a "Fixed Fare" badge on each vehicle card to communicate price certainty.
7. THE CabHome page at `/cab` SHALL update the Airport Cab service card path from `/ride/select-location` to `/cab/airport`.

**Correctness Properties**

- **Fare monotonicity**: FOR ALL vehicle options ordered by tier (Mini < Sedan < SUV), the fixed fare of a higher-tier vehicle SHALL be greater than or equal to the fixed fare of a lower-tier vehicle.

---

### Requirement 11: Spiritual Trip Page

**User Story:** As a User interested in religious tourism, I want a dedicated spiritual trip destination selector, so that I can browse and book guided tours to pilgrimage sites.

#### Acceptance Criteria

1. WHEN the User navigates to `/cab/spiritual`, THE App SHALL display a grid of spiritual destination cards including at minimum Ujjain (Mahakaleshwar), Omkareshwar, Maheshwar, and Orchha.
2. THE App SHALL display each destination card with an image or icon, destination name, distance from Indore, and an estimated fare range.
3. WHEN the User taps a destination card, THE App SHALL navigate to `/ride/select-location` passing the destination name and `isSpiritualTrip: true` via location state.
4. THE App SHALL display a "Guided Tours" header badge consistent with the CabHome service tag.
5. THE CabHome page at `/cab` SHALL update the Spiritual Trips service card path from `/ride/select-location` to `/cab/spiritual`.

---

### Requirement 12: Intercity Confirm Page

**User Story:** As a User who has completed intercity booking, I want a dedicated confirmation screen, so that I have a clear record of my booking details and a Booking_ID.

#### Acceptance Criteria

1. WHEN the User navigates to `/intercity/confirm`, THE App SHALL display a booking confirmation screen with a success animation (scale-in checkmark).
2. THE App SHALL display the Booking_ID, origin city, destination city, travel date, vehicle type, number of passengers, and total fare sourced from React Router location state.
3. THE App SHALL provide a "Back to Home" button that navigates to `/`.
4. THE App SHALL provide a "Share Booking" button that invokes `navigator.share` with the booking summary.
5. THE IntercityHome page SHALL update its "Book Intercity Cab" CTA to navigate to `/intercity/confirm` instead of `/ride/select-location`, passing all booking details via location state.
6. THE App SHALL generate a Booking_ID in the format `IC-XXXXXX` where X is an uppercase alphanumeric character.

**Correctness Properties**

- **Booking ID format**: FOR ALL generated Booking_IDs, the string SHALL match the pattern `^IC-[A-Z0-9]{6}$`.

---

## Phase 5 — Onboarding

### Requirement 13: Onboarding / Splash Page

**User Story:** As a first-time User, I want to see an onboarding walkthrough on first launch, so that I understand the app's key features before signing up.

#### Acceptance Criteria

1. WHEN the User navigates to `/onboarding`, THE App SHALL display a sequence of Onboarding_Slides fetched from or seeded by `GET /api/v1/on-boarding`.
2. THE App SHALL display at minimum 3 Onboarding_Slides covering: fast rides, safety features, and earning with referrals.
3. WHEN the User taps "Next", THE App SHALL advance to the next Onboarding_Slide with a horizontal slide animation.
4. WHEN the User is on the last Onboarding_Slide, THE App SHALL replace the "Next" button with a "Get Started" CTA that navigates to `/login`.
5. WHEN the User taps "Skip", THE App SHALL navigate immediately to `/login` from any slide.
6. THE App SHALL display a dot-indicator row showing the current slide position; the active dot SHALL be orange and larger than inactive dots.
7. IF the API call to `GET /api/v1/on-boarding` fails, THEN THE App SHALL fall back to the locally seeded slide content and SHALL NOT display an error screen.
8. THE App SHALL store a `onboarding_complete` flag in `localStorage`; WHEN the flag is present, THE App SHALL redirect `/onboarding` to `/` without showing the slides.

**Correctness Properties**

- **Slide index bounds**: FOR ALL "Next" and "Back" interactions, the current slide index SHALL remain within `[0, slides.length - 1]`; tapping "Next" on the last slide SHALL NOT increment the index beyond `slides.length - 1`.
- **Skip idempotence**: FOR ALL slide positions, tapping "Skip" SHALL always navigate to `/login` regardless of the current slide index.
