This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
https://dm-talk.vercel.app/

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.




# Particle Auth, Account Abstraction SDK, Next.js, ethers V6 

## Table of contents

 
Built using:

- **Particle Authkit**
- **Particle AA SDK**
- **ethers.js V6.x.x**
- **TypeScript**
- **Tailwind CSS**

 
## 🔑 Particle Auth

Particle Auth, a component of Particle Network's Wallet-as-a-Service, enables seamless onboarding to an application-embedded MPC-TSS/AA wallet facilitated by social login, such as Google, GitHub, email, phone number, etc.

👉 Learn more about [Particle Auth](https://developers.particle.network/docs/building-with-particle-auth).

## 🪪 Account Abstraction SDK

Particle Network natively supports and facilitates the end-to-end utilization of ERC-4337 account abstraction. This is primarily done through the account abstraction SDK, which can construct, sponsor, and send UserOperations, deploy smart accounts, retrieve fee quotes, and perform other vital functions.

> Every gasless transaction is automatically sponsored on testnet. On mainnet, you'll need to deposit USDT into Paymaster.

👉 Learn more about the [Particle AA SDK](https://developers.particle.network/docs/aa-web-quickstart).

***

👉 Learn more about [Particle Network](https://particle.network).

## 🛠️ Quickstart

### Clone this repository
```
git clone https://github.com/Particle-Network/kakarot-auth-aa-demo.git
```
 

### Set environment variables
This project requires several keys from Particle Network to be defined in `.env`. The following should be defined:
- `NEXT_PUBLIC_PROJECT_ID`, the ID of the corresponding application in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
- `NEXT_PUBLIC_CLIENT_KEY`, the ID of the corresponding project in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
-  `NEXT_PUBLIC_APP_ID`, the client key of the corresponding project in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).

### Start the project
```sh
npm run dev
```

Or

```sh
yarn dev
```
 
### Config social logins

List of available social logins:

```sh
{
  email: 'email',
  phone: 'phone',
  facebook: 'facebook',
  google: 'google',
  apple: 'apple',
  twitter: 'twitter',
  discord: 'discord',
  github: 'github',
  twitch: 'twitch',
  microsoft: 'microsoft',
  linkedin: 'linkedin',
  jwt: 'jwt'
}
```

### AA options

You can configure the smart account using the `aaOptions` object in `src/app/page.tsx`.

---

- **BICONOMY**, a [Biconomy smart account](https://www.biconomy.io/smart-accounts).
  - `version`, either `1.0.0` or `2.0.0`; both versions of Biconomy's smart account implementation are supported.
  - `chainIds`, an array of chain IDs in which the smart account is expected to be used.
- **CYBERCONNECT**, a [CyberConnect smart account](https://wallet.cyber.co/).
  - `version`, currently only `1.0.0` is supported for `CYBERCONNECT`.
  - `chainIds`, an array of chain IDs in which the smart account is expected to be used.
- **SIMPLE**, a [SimpleAccount implementation](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/samples/SimpleAccount.sol).
  - `version`, either `1.0.0` or `2.0.0` is supported for `SIMPLE`.
  - `chainIds`, an array of chain IDs in which the smart account is expected to be used.
- **LIGHT**, a [Light Account implementation by Alchemy](https://github.com/alchemyplatform/light-account).
  - `version`, currently only `1.0.2` is supported for `LIGHT`.
  - `chainIds`, an array of chain IDs in which the smart account is expected to be used.
- **XTERIO**, a [Xterio smart account](https://xter.io/build).
  - `version`, currently only `1.0.0` is supported for `XTERIO`.
  - `chainIds`, an array of chain IDs in which the smart account is expected to be used.

---
