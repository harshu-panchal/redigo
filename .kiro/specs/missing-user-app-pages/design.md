# Design Document — Missing User App Pages

## Overview

This document covers the technical design for all 13 missing pages in the Namma user app, grouped into 5 phases. All pages follow the existing design language: glassmorphism cards, orange/slate palette, `rounded-[20px+]` corners, `font-black` typography, Framer Motion entrance animations, and mobile-first `max-w-lg` layout.

---

## Architecture

### Routing additions to `App.jsx`

All new pages use the existing lazy-import pattern:

```
const ParcelSearchingDriver = lazy(() => import('./modules/user/pages/parcel/ParcelSearchingDriver'));
const ParcelTracking        = lazy(() => import('./modules/user/pages/parcel/ParcelTracking'));
const WorkshopRSA           = lazy(() => import('./modules/user/pages/services/WorkshopRSA'));
const Notifications         = lazy(() => import('./modules/user/pages/Notifications'));
const PromoCodes            = lazy(() => import('./modules/user/pages/PromoCodes'));
const Referral              = lazy(() => import('./modules/user/pages/Referral'));
const SOSContacts           = lazy(() => import('./modules/user/pages/safety/SOSContacts'));
const SupportTickets        = lazy(() => import('./modules/user/pages/support/SupportTickets'));
const SupportTicketDetail   = lazy(() => import('./modules/user/pages/support/SupportTicketDetail'));
const DeleteAccount         = lazy(() => import('./modules/user/pages/profile/DeleteAccount'));
const AirportCab            = lazy(() => import('./modules/user/pages/cab/AirportCab'));
const SpiritualTrip         = lazy(() => import('./modules/user/pages/cab/SpiritualTrip'));
const IntercityConfirm      = lazy(() => import('./modules/user/pages/intercity/IntercityConfirm'));
const Onboarding            = lazy(() => import('./modules/user/pages/auth/Onboarding'));
```

New `<Route>` entries:

```
<Route path="/parcel/searching"         element={<ParcelSearchingDriver />} />
<Route path="/parcel/tracking"          element={<ParcelTracking />} />
<Route path="/services/workshop-rsa"    element={<WorkshopRSA />} />
<Route path="/notifications"            element={<Notifications />} />
<Route path="/promo"                    element={<PromoCodes />} />
<Route path="/referral"                 element={<Referral />} />
<Route path="/safety/sos"               element={<SOSContacts />} />
<Route path="/support/tickets"          element={<SupportTickets />} />
<Route path="/support/ticket/:id"       element={<SupportTicketDetail />} />
<Route path="/profile/delete-account"   element={<DeleteAccount />} />
<Route path="/cab/airport"              element={<AirportCab />} />
<Route path="/cab/spiritual"            element={<SpiritualTrip />} />
<Route path="/intercity/confirm"        element={<IntercityConfirm />} />
<Route path="/onboarding"               element={<Onboarding />} />
```

### New file structure

```
frontend/src/modules/user/pages/
  auth/
    Onboarding.jsx                  (new)
  parcel/
    ParcelSearchingDriver.jsx       (new)
    ParcelTracking.jsx              (new)
  safety/
    SOSContacts.jsx                 (new)
  support/
    SupportTickets.jsx              (new)
    SupportTicketDetail.jsx         (new)
  profile/
    DeleteAccount.jsx               (new)
  cab/
    AirportCab.jsx                  (new)
    SpiritualTrip.jsx               (new)
  intercity/
    IntercityConfirm.jsx            (new)
  Notifications.jsx                 (new)
  PromoCodes.jsx                    (new)
  Referral.jsx                      (new)
```

### Entry point wiring (existing files to update)

| Page              | Entry point file            | Change                                                                                       |
| ----------------- | --------------------------- | -------------------------------------------------------------------------------------------- |
| WorkshopRSA       | `Profile.jsx`               | Add menu item `{ title: 'Workshop & RSA', path: '/services/workshop-rsa' }`                  |
| Notifications     | `Profile.jsx`               | Change Notifications path from `/profile/notifications` to `/notifications`                  |
| Referral          | `Wallet.jsx`                | Fix referral card navigate from `/taxi/driver/referral` → `/referral`                        |
| Airport Cab       | `CabHome.jsx`               | Change airport service path from `/ride/select-location` → `/cab/airport`                    |
| Spiritual Trip    | `CabHome.jsx`               | Change spiritual service path from `/ride/select-location` → `/cab/spiritual`                |
| Intercity Confirm | `IntercityHome.jsx`         | Change Book CTA navigate from `/ride/select-location` → `/intercity/confirm`                 |
| Parcel Searching  | `SenderReceiverDetails.jsx` | Change submit navigate to `/parcel/searching`                                                |
| Delete Account    | `SecuritySettings.jsx`      | Add delete account link to `/profile/delete-account`                                         |
| Onboarding        | `App.jsx`                   | Add redirect: if no `onboarding_complete` in localStorage, redirect `/login` → `/onboarding` |

---

---

## Phase 1 — Critical Flow Completions

### 1. ParcelSearchingDriver (`/parcel/searching`)

**Reference:** Mirrors `SearchingDriver.jsx` exactly — same STAGES, same DriverCard, same ActionBtn, same cancel modal. Only copy changes.

**Component:** `ParcelSearchingDriver.jsx`

**State:**

```js
const [stage, setStage] = useState(STAGES.SEARCHING);
const [showCancelConfirm, setShowCancel] = useState(false);
const [otp] = useState(() => String(Math.floor(1000 + Math.random() * 9000)));
const [driver] = useState(
  () => MOCK_AGENTS[Math.floor(Math.random() * MOCK_AGENTS.length)],
);
```

**STAGES constant:** `{ SEARCHING, ASSIGNED, ACCEPTED, COMPLETING }` — identical to ride flow.

**Timer sequence (useEffect):**

- 0 ms → SEARCHING
- +5 s → ASSIGNED
- +5 s → ACCEPTED
- +5 s → COMPLETING → navigate(`/parcel/tracking`, { state: { driver, otp, ...routeState } })

**Copy differences from SearchingDriver:**

- "Finding your delivery agent..." (was "Finding your captain...")
- "Connecting with delivery agents nearby"
- Banner: "Delivery Agent Found!" / "Delivery Accepted!"

**Navigation in:** `SenderReceiverDetails.jsx` → navigate(`/parcel/searching`, { state: { pickup, drop, parcelType, fare, paymentMethod } })

**Navigation out:** → `/parcel/tracking` (on COMPLETING), → `/` (on cancel)

---

### 2. ParcelTracking (`/parcel/tracking`)

**Reference:** Mirrors `RideTracking.jsx` — same map background, same bottom drawer, same ActionBtn row.

**Component:** `ParcelTracking.jsx`

**Props from location.state:** `{ driver, otp, pickup, drop, fare, paymentMethod }`

**State:**

```js
const [showCancelModal, setShowCancelModal] = useState(false);
```

**Layout:**

- Full-screen `/map image.avif` background
- Top-left back button → `/`
- Top-right safety badge → `/support`
- Bottom drawer (fixed, rounded-t-[28px]):
  - Agent name, rating, plate, ETA
  - OTP pill (orange-accented, 4 boxes)
  - ActionBtn row: Call | Chat | Share | Help
  - Fare + payment method row
  - "Cancel Delivery" button → cancel modal

**Share handler:**

```js
const shareText = `Parcel delivery in progress!\nAgent: ${driver.name}\nPickup: ${pickup}\nDrop: ${drop}\nOTP: ${otp}`;
navigator.share
  ? navigator.share({ text: shareText })
  : navigator.clipboard.writeText(shareText);
```

**Copy differences from RideTracking:**

- "Delivery in progress" (was "Ride in progress")
- "Your delivery agent is on the way"

---

### 3. WorkshopRSA Route Registration

**No new file needed.** Changes only:

1. `App.jsx` — add lazy import + route (shown in Architecture section above)
2. `Profile.jsx` — add to `menuItems` array:

```js
{ icon: Wrench, title: 'Workshop & RSA', sub: 'Roadside help on demand', path: '/services/workshop-rsa', bg: 'bg-emerald-50', color: 'text-emerald-500' }
```

---

## Phase 2 — Core Utility Pages

### 4. Notifications (`/notifications`)

**Component:** `Notifications.jsx`

**State:**

```js
const [notifications, setNotifications] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

**Data flow:**

- `useEffect` → `GET /api/v1/notifications/get-notification` → set notifications
- Delete: `POST /api/v1/notifications/delete-notification/:id` → filter from state
- Mark read: local state toggle (optimistic)

**Layout (top → bottom):**

- Sticky header: back arrow, "Notifications" title, unread count badge (orange pill)
- Scrollable list of `NotificationCard` components
- Empty state: bell icon + "You're all caught up"
- Error state: warning icon + "Retry" button

**NotificationCard sub-component:**

```
[unread dot] [icon bg] [title + body] [timestamp]
             [type icon]              [delete btn]
```

- Unread: white bg, left orange border `border-l-4 border-orange-400`
- Read: `bg-white/60`, no border
- Slide-out delete: `AnimatePresence` + `motion.div` with `exit={{ x: -100, opacity: 0 }}`

**Skeleton:** 5 placeholder cards, `animate-pulse`, matching card height

**Unread badge:** `notifications.filter(n => !n.read).length` — shown only when > 0

**Entry point:** `Profile.jsx` Notifications menu item path updated to `/notifications`

---

### 5. PromoCodes (`/promo`)

**Component:** `PromoCodes.jsx`

**State:**

```js
const [promos, setPromos] = useState([]);
const [loading, setLoading] = useState(true);
const [appliedCode, setApplied] = useState(null);
const [manualCode, setManualCode] = useState("");
const [toast, setToast] = useState(null); // { type: 'success'|'error', msg }
```

**Data flow:**

- `useEffect` → `GET /api/v1/request/promocode-list` → set promos
- Apply: `POST /api/v1/request/promocode-redeem` → on success set appliedCode, show toast
- Guard: if `appliedCode === promo.code` skip API call

**Layout (top → bottom):**

- Sticky header: back arrow, "Promo Codes" title
- Manual entry card: text input + "Apply" button
- Section label "Available Offers"
- Scrollable list of `PromoCard` components
- Empty state: ticket icon + "No promo codes available right now"

**PromoCard sub-component:**

```
[discount badge]  [code string]  [expiry]
[service type tag]               [Apply / Applied ✓ button]
```

- Applied state: green checkmark, button disabled, `bg-emerald-50 border-emerald-200`
- Normal state: `bg-white/90`, orange "Apply" button

**Toast:** fixed bottom center, auto-dismiss 2.5 s, `AnimatePresence`

**Entry point:** `SelectVehicle.jsx` promo banner "Apply Code" → `/promo`; also `Profile.jsx` or `Wallet.jsx` can link

---

### 6. Referral (`/referral`)

**Component:** `Referral.jsx`

**State:**

```js
const [history, setHistory] = useState([]);
const [loading, setLoading] = useState(true);
const [copied, setCopied] = useState(false);
const REFERRAL_CODE = "RYDON-HR24"; // from user profile
```

**Data flow:**

- `useEffect` → `GET /api/v1/common/referral/history` → set history
- Copy: `navigator.clipboard.writeText(REFERRAL_CODE)` → setCopied(true) → reset after 2 s
- Share: `navigator.share({ text: \`Join Namma with my code ${REFERRAL_CODE}...\` })` or WhatsApp fallback

**Layout (top → bottom):**

- Sticky header: back arrow, "Referral" title
- Referral code card (orange gradient): large code text, copy icon, share button
- Stats row: "X Invites" | "₹Y Earned" (derived from history)
- Section label "Referral History"
- List of `ReferralRow` components
- Empty state: gift icon + "No referrals yet — share your code to start earning"

**ReferralRow sub-component:**

```
[avatar initials]  [name + join date]  [₹reward badge]
```

**Stats derivation:**

```js
const totalInvites = history.length;
const totalEarned = history.reduce((sum, r) => sum + (r.reward || 0), 0);
```

**Entry point:** `Wallet.jsx` referral card navigate fixed to `/referral`

---

## Phase 3 — Safety & Support

### 7. SOSContacts (`/safety/sos`)

**Component:** `SOSContacts.jsx`

**State:**

```js
const [contacts, setContacts] = useState([]);
const [showAddSheet, setShowAddSheet] = useState(false);
const [name, setName] = useState("");
const [phone, setPhone] = useState("");
const [errors, setErrors] = useState({});
const [sosActive, setSosActive] = useState(false);
const [countdown, setCountdown] = useState(3);
const [deleteTarget, setDeleteTarget] = useState(null);
```

**Validation:**

```js
const validate = () => ({
  name: !name.trim() ? "Name is required" : null,
  phone: !/^\d{10}$/.test(phone) ? "Enter valid 10-digit number" : null,
  dup: contacts.some((c) => c.phone === phone) ? "Contact already added" : null,
});
```

**Add flow:** validate → `POST /api/v1/common/sos/store` → append to contacts → close sheet

**Delete flow:** tap delete → set deleteTarget → confirm modal → `POST /api/v1/common/sos/delete/:id` → filter from contacts

**SOS trigger:** tap SOS button → setSosActive(true) → 3-second countdown interval → alert (mock) → reset

**Layout (top → bottom):**

- Sticky header: back arrow, "SOS Contacts" title, "Add" button (disabled if contacts.length >= 5)
- Large red SOS trigger button with countdown ring
- List of `SOSContactCard` components (name, phone, delete icon)
- Empty state: shield icon + "Add emergency contacts to stay safe"
- Add bottom sheet: name input, phone input, validation errors, "Save Contact" CTA

**Entry point:** `SecuritySettings.jsx` → add SOS Contacts link; also `Profile.jsx` Security menu item

---

### 8. SupportTickets (`/support/tickets`) + SupportTicketDetail (`/support/ticket/:id`)

**Components:** `SupportTickets.jsx`, `SupportTicketDetail.jsx`

**SupportTickets state:**

```js
const [tickets, setTickets] = useState([]);
const [loading, setLoading] = useState(true);
const [showNewForm, setShowNew] = useState(false);
const [subject, setSubject] = useState("");
const [category, setCategory] = useState("");
const [description, setDesc] = useState("");
const [errors, setErrors] = useState({});
```

**CATEGORIES:** `['Ride Issue', 'Payment', 'Driver Behaviour', 'App Bug', 'Other']`

**STATUS_COLORS:** `{ Open: 'orange', 'In Progress': 'blue', Resolved: 'green' }`

**Layout (SupportTickets):**

- Sticky header: back arrow, "Support" title, "+" new ticket button
- Tab row: All | Open | Resolved
- List of `TicketCard` components → navigate(`/support/ticket/${ticket.id}`)
- Empty state: headset icon + "No tickets yet — tap + to get help"
- New ticket bottom sheet: subject input, category select, description textarea, "Submit" CTA

**SupportTicketDetail state:**

```js
const [ticket, setTicket] = useState(null);
const [reply, setReply] = useState("");
const [sending, setSending] = useState(false);
```

**Layout (SupportTicketDetail):**

- Sticky header: back arrow, ticket subject, status badge
- Scrollable message thread (user messages right-aligned, support left-aligned)
- Fixed bottom reply bar: text input + send button
- Send: `POST /api/v1/common/reply-message/:id` → append to thread

**Entry point:** `Support.jsx` existing page → add "View My Tickets" button → `/support/tickets`; `Activity.jsx` Support tab "Contact Us" button already goes to `/support`

---

### 9. DeleteAccount (`/profile/delete-account`)

**Component:** `DeleteAccount.jsx`

**State:**

```js
const [reason, setReason] = useState("");
const [showConfirm, setShowConfirm] = useState(false);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
```

**REASONS:** `['I use another app', 'Too expensive', 'Privacy concerns', 'Technical issues', 'Other']`

**Delete flow:** select reason → enable "Delete My Account" button → tap → show confirm modal → confirm → `POST /api/v1/user/delete-user-account` → navigate(`/login`) on success

**Layout (top → bottom):**

- Header: back arrow, "Delete Account" title (red)
- Warning card: red border, list of consequences (ride history lost, wallet balance forfeited, saved data removed)
- Reason selector: radio-style list
- "Delete My Account" button (red, disabled until reason selected)
- Confirm modal: "This action cannot be undone" + Cancel + Confirm buttons

**Entry point:** `SecuritySettings.jsx` → add "Delete Account" danger row at bottom

---

## Phase 4 — New Service Pages

### 10. AirportCab (`/cab/airport`)

**Component:** `AirportCab.jsx`

**State:**

```js
const [pickup, setPickup] = useState("");
const [terminal, setTerminal] = useState("");
const [date, setDate] = useState("");
const [time, setTime] = useState("");
const [vehicle, setVehicle] = useState("mini");
const [errors, setErrors] = useState({});
```

**VEHICLES:**

```js
[
  {
    id: "mini",
    name: "Mini Cab",
    icon: "🚕",
    fare: 499,
    desc: "Swift, Alto, WagonR",
  },
  {
    id: "sedan",
    name: "Sedan",
    icon: "🚗",
    fare: 699,
    desc: "Dzire, Amaze, Aspire",
  },
  {
    id: "suv",
    name: "SUV",
    icon: "🚙",
    fare: 999,
    desc: "Ertiga, Innova, Crysta",
  },
];
```

**Validation:** pickup non-empty, terminal selected, date non-empty, time non-empty

**Book flow:** validate → navigate(`/ride/select-location`, { state: { isAirport: true, pickup, terminal, date, time, vehicle } })

**Layout (top → bottom):**

- Header: back arrow, "Airport Cab" title, "Fixed Fare" badge
- Airport illustration banner (use `/airport_illustration.png`)
- Pickup address input
- Terminal selector: T1 | T2 | T3 pill tabs
- Date + Time inputs (grid-cols-2)
- Vehicle cards with "Fixed Fare" badge on each
- Fare summary bar + "Book Airport Cab" CTA

**Entry point:** `CabHome.jsx` airport service path updated to `/cab/airport`

---

### 11. SpiritualTrip (`/cab/spiritual`)

**Component:** `SpiritualTrip.jsx`

**DESTINATIONS:**

```js
[
  {
    id: "ujjain",
    name: "Ujjain",
    subtitle: "Mahakaleshwar Jyotirlinga",
    dist: "55 km",
    fare: "₹800–₹1,200",
    emoji: "🛕",
  },
  {
    id: "omkareshwar",
    name: "Omkareshwar",
    subtitle: "Jyotirlinga on Narmada",
    dist: "77 km",
    fare: "₹1,000–₹1,500",
    emoji: "🙏",
  },
  {
    id: "maheshwar",
    name: "Maheshwar",
    subtitle: "Ahilya Fort & Ghats",
    dist: "91 km",
    fare: "₹1,200–₹1,800",
    emoji: "⛵",
  },
  {
    id: "orchha",
    name: "Orchha",
    subtitle: "Ram Raja Temple",
    dist: "320 km",
    fare: "₹3,500–₹5,000",
    emoji: "🏯",
  },
];
```

**Tap flow:** navigate(`/ride/select-location`, { state: { isSpiritualTrip: true, destination: dest.name, drop: dest.name } })

**Layout (top → bottom):**

- Header: back arrow, "Spiritual Trips" title, "Guided Tours" badge (purple)
- Intro card: temple image, tagline "Sacred journeys from Indore"
- 2-column destination grid of `DestinationCard` components
- Each card: emoji icon, name, subtitle, distance, fare range, "Book" arrow

**Entry point:** `CabHome.jsx` spiritual service path updated to `/cab/spiritual`

---

### 12. IntercityConfirm (`/intercity/confirm`)

**Component:** `IntercityConfirm.jsx`

**Props from location.state:** `{ fromCity, toCity, tripType, date, passengers, vehicle, estimatedFare }`

**Booking ID generation:**

```js
const bookingId = "IC-" + Math.random().toString(36).toUpperCase().slice(2, 8);
```

**Share handler:**

```js
const summary = `Intercity booking confirmed!\nID: ${bookingId}\n${fromCity} → ${toCity}\nDate: ${date}\nVehicle: ${vehicle.name}\nFare: ₹${estimatedFare}`;
navigator.share
  ? navigator.share({ text: summary })
  : navigator.clipboard.writeText(summary);
```

**Layout (top → bottom):**

- Full-screen gradient background (slate-900 → slate-800)
- Animated checkmark (scale-in, `motion.div`)
- "Booking Confirmed!" heading (white)
- Booking ID pill (yellow, monospace)
- Details card: from/to cities, date, vehicle, passengers, fare
- "Share Booking" button (outline white)
- "Back to Home" button (yellow fill) → navigate(`/`)

**Entry point:** `IntercityHome.jsx` Book CTA updated to navigate(`/intercity/confirm`, { state: bookingDetails })

---

## Phase 5 — Onboarding

### 13. Onboarding (`/onboarding`)

**Component:** `Onboarding.jsx`

**SLIDES (fallback seed):**

```js
[
  {
    id: 1,
    title: "Fast & Affordable Rides",
    body: "Bike, auto, and cab rides at the best prices in Indore.",
    image: "/1_Bike.png",
    accent: "from-orange-400 to-orange-600",
  },
  {
    id: 2,
    title: "Your Safety, Our Priority",
    body: "SOS contacts, live tracking, and verified drivers on every trip.",
    image: "/Everyones Safety Matters.jpg",
    accent: "from-blue-500 to-blue-700",
  },
  {
    id: 3,
    title: "Earn with Every Referral",
    body: "Share your code and earn ₹50 for every friend who joins.",
    image: "/man.png",
    accent: "from-emerald-500 to-emerald-700",
  },
];
```

**State:**

```js
const [slides, setSlides] = useState(FALLBACK_SLIDES);
const [current, setCurrent] = useState(0);
```

**localStorage guard (useEffect on mount):**

```js
if (localStorage.getItem("onboarding_complete"))
  navigate("/", { replace: true });
```

**API fetch (useEffect on mount):**

```js
fetch("/api/v1/on-boarding")
  .then((r) => r.json())
  .then((data) => {
    if (data?.slides?.length) setSlides(data.slides);
  })
  .catch(() => {}); // silent fallback
```

**Next handler:**

```js
if (current < slides.length - 1) setCurrent((c) => c + 1);
```

**Get Started handler:**

```js
localStorage.setItem("onboarding_complete", "1");
navigate("/login");
```

**Skip handler:** same as Get Started

**Layout (full-screen):**

- Gradient background (per slide accent)
- Large slide image (centered, drop-shadow)
- Title (white, font-black, text-[28px])
- Body text (white/80, text-[14px])
- Dot indicator row (active dot: orange, w-4; inactive: white/40, w-2)
- Bottom row: "Skip" (ghost left) + "Next" / "Get Started" (filled right)

**Animations:**

- Slide image: `AnimatePresence` + `motion.img` with `initial={{ x: 60, opacity: 0 }}` / `exit={{ x: -60, opacity: 0 }}`
- Dot: `layoutId="onboarding-dot"` for smooth transition

**Entry point:** `App.jsx` — on first load if no `onboarding_complete` flag, redirect `/login` → `/onboarding`

---

## Shared Patterns

### Toast component (inline, no new file)

All pages use the same pattern:

```jsx
{
  toast && (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-5 py-3 rounded-2xl text-[12px] font-black shadow-2xl z-50 whitespace-nowrap">
      {toast}
    </motion.div>
  );
}
```

Auto-dismiss via `setTimeout(() => setToast(null), 2500)`.

### Skeleton card (inline)

```jsx
<div className="animate-pulse rounded-[20px] bg-white/60 h-20 w-full" />
```

### Page header pattern (reused across all new pages)

```jsx
<header className="bg-white/90 backdrop-blur-md px-5 pt-10 pb-4 sticky top-0 z-20 border-b border-white/80 shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
  <div className="flex items-center gap-3">
    <button
      onClick={() => navigate(-1)}
      className="w-9 h-9 rounded-[12px] border border-white/80 bg-white/90 flex items-center justify-center shadow-sm">
      <ArrowLeft size={18} className="text-slate-900" strokeWidth={2.5} />
    </button>
    <div>
      <p className="text-[9px] font-black uppercase tracking-[0.26em] text-slate-400">
        {subtitle}
      </p>
      <h1 className="text-[19px] font-black tracking-tight text-slate-900">
        {title}
      </h1>
    </div>
  </div>
</header>
```

### Confirm modal pattern (reused for cancel/delete)

```jsx
<motion.div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[82%] max-w-sm bg-white rounded-[28px] p-7 z-[101] shadow-2xl text-center">
  <div className="w-14 h-14 bg-red-50 rounded-[18px] flex items-center justify-center mx-auto mb-4">
    <AlertTriangle size={26} className="text-red-400" />
  </div>
  <h3 className="text-[18px] font-black text-slate-900 mb-1.5">{title}</h3>
  <p className="text-[13px] font-bold text-slate-400 mb-6">{body}</p>
  <button
    onClick={onConfirm}
    className="w-full bg-slate-900 text-white py-3.5 rounded-[16px] text-[13px] font-black uppercase tracking-widest mb-2">
    {confirmLabel}
  </button>
  <button
    onClick={onCancel}
    className="w-full py-3.5 text-[13px] font-black text-slate-400 uppercase tracking-widest">
    {cancelLabel}
  </button>
</motion.div>
```
