# RentWise v2 — Next.js 15

**Smart renting. Peaceful living.**

## What's New in v2

- **NIN Verification** — Users must enter a valid National ID Number. The name from the NIN database is used as their display name throughout the app. No NIN = no access.
- **Avatar Upload** — Users upload a profile photo during sign-up. It appears in the top-left avatar on every dashboard screen.
- **Side Drawer** — Clicking the avatar slides in a half-screen panel from the left showing: name, masked NIN, verified status, role-specific info (tenant unit or landlord property count), and a **Log Out** button.
- **Auth Guard** — All protected pages redirect to `/role` if the user isn't logged in.
- **Landlord Dashboard** — Separate dashboard for landlords with stats, alerts, and property list.
- **New pages** — `/profile`, `/rights`, `/landlord`
- **Dark-first design** — All screens redesigned to match the v2 dark mode specs exactly.

## Routes

| Screen | Route | Auth? |
|---|---|---|
| Splash | `/` | No |
| Onboarding | `/onboarding` | No |
| Role Selection | `/role` | No |
| Sign Up + NIN Verify | `/signup?role=tenant` | No |
| Tenant Dashboard | `/dashboard` | ✅ |
| Landlord Dashboard | `/landlord` | ✅ |
| Property Search | `/search` | ✅ |
| Repair Tracker | `/repairs` | ✅ |
| Verified Services | `/services` | ✅ |
| Community | `/community` | ✅ |
| Emergency SOS | `/emergency` | ✅ |
| Profile & Security | `/profile` | ✅ |
| Rights & Guide | `/rights` | ✅ |

## NIN Test Values (Mock)

| NIN | Name |
|---|---|
| `123456789012` | John Mwangi |
| `111111111111` | Amara Kone |
| `444444444444` | Alex Johnson |
| `999999999999` | Demo User |
| Any 11-12 digit number | Verified User |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## How Auth Works

1. User selects role → goes to `/signup?role=tenant` or `/signup?role=landlord`
2. Enters NIN + optional avatar photo
3. App calls `verifyNIN()` (mock — replace with real NIMC API)
4. On success: user saved to `localStorage`, redirected to their dashboard
5. Clicking avatar → side drawer slides in with profile info + logout
6. Logout clears localStorage and redirects to `/role`

> Replace the `NIN_DATABASE` map and `verifyNIN()` function in `lib/AuthContext.tsx` with a real identity verification API call.
