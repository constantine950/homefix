# HomeFix

React Native (Expo Router + NativeWind) app connecting customers with home service providers.

## Setup

npm install
npx expo start

## Structure

- app/(onboarding) — splash + intro carousel
- app/(auth) — login, signup, OTP, password reset
- app/(customer) — customer-facing tabs and screens
- app/(provider) — provider-facing tabs and screens
- components/ui — reusable primitives (Button, Input, Chip, TabBar)
- lib/api — API client and endpoint functions
- lib/context — AuthContext (holds user + role)
- lib/types — shared TypeScript types
