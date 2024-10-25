# Chain Messenger

Chain Messenger is a decentralized messaging application built on Next.js, leveraging the power of blockchain technology to provide secure and private communication channels. The application integrates **Particle Authkit** and **Particle AA SDK** to create account abstraction, enabling seamless interaction with chat members and selected blockchain networks.

## Features

- **Decentralized Messaging**: Secure and private communication channels powered by blockchain technology.
- **Account Abstraction**: Utilizes Particle Authkit and Particle AA SDK to simplify user interactions with the blockchain.
- **Multi-Chain Support**: Interact with multiple blockchain networks, including Ethereum, Polygon, and more.
- **User-Friendly Interface**: Intuitive and responsive design for both desktop and mobile users.
- **Secure Transactions**: Execute secure transactions with chat members directly within the application.
- **Customizable Channels**: Create and manage custom chat channels with specific permissions and access controls.
- **Real-Time Updates**: Real-time messaging and transaction updates for a seamless user experience.

---

## Getting Started

Chain Messenger is hosted on:  
👉 [Live Site](https://dm-talk.vercel.app/)  
👉 [YouTube Demo](https://youtu.be/GhPiWK-6MZw)

### Development Setup

To start working with Chain Messenger, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/spreadzp/dm-talk
   cd dm-talk
   ```
2. Install dependencies:
```
npm install
# or
yarn install
```
3. Run the development server:
```
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

```
4. Open http://localhost:3000 with your browser to see the result.

## Particle Auth & Account Abstraction SDK
🔑 ###Particle Auth
Particle Auth, a component of Particle Network's Wallet-as-a-Service, enables seamless onboarding to an application-embedded MPC-TSS/AA wallet facilitated by social login, such as Google, GitHub, email, phone number, etc.

👉 ### Learn more about *[Particle Auth](https://developers.particle.network/docs/building-with-particle-auth)*.

🪪 Account Abstraction SDK
Particle Network natively supports and facilitates the end-to-end utilization of ERC-4337 account abstraction. This is primarily done through the account abstraction SDK, which can construct, sponsor, and send UserOperations, deploy smart accounts, retrieve fee quotes, and perform other vital functions.

👉 Learn more about the *[Particle AA SDK](https://developers.particle.network/docs/aa-web-quickstart)*.

##  
Here is your README.md for Chain Messenger:
 
# Chain Messenger

Chain Messenger is a decentralized messaging application built on Next.js, leveraging the power of blockchain technology to provide secure and private communication channels. The application integrates **Particle Authkit** and **Particle AA SDK** to create account abstraction, enabling seamless interaction with chat members and selected blockchain networks.

## Features

- **Decentralized Messaging**: Secure and private communication channels powered by blockchain technology.
- **Account Abstraction**: Utilizes Particle Authkit and Particle AA SDK to simplify user interactions with the blockchain.
- **Multi-Chain Support**: Interact with multiple blockchain networks, including Ethereum, Polygon, and more.
- **User-Friendly Interface**: Intuitive and responsive design for both desktop and mobile users.
- **Secure Transactions**: Execute secure transactions with chat members directly within the application.
- **Customizable Channels**: Create and manage custom chat channels with specific permissions and access controls.
- **Real-Time Updates**: Real-time messaging and transaction updates for a seamless user experience.

---

## Getting Started

Chain Messenger is hosted on:  
👉 [Live Site](https://dm-talk.vercel.app/)  
👉 [YouTube Demo](https://youtu.be/GhPiWK-6MZw)
![demo.webm](https://github.com/user-attachments/assets/e3843be4-72bb-4773-82b3-41a08335af7f)

### Development Setup

To start working with Chain Messenger, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/spreadzp/dm-talk
   cd dm-talk
   ```
2. Install dependencies:
``` 
  npm install
  # or
  yarn install
```
3. Run the development server:
 ```
  npm run dev
  # or
  yarn dev
  # or
  pnpm dev
  # or
  bun dev
```

Open *http://localhost:3000* with your browser to see the result.

## Particle Auth & Account Abstraction SDK
🔑 Particle Auth
Particle Auth, a component of Particle Network's Wallet-as-a-Service, enables seamless onboarding to an application-embedded MPC-TSS/AA wallet facilitated by social login, such as Google, GitHub, email, phone number, etc.

👉 Learn more about Particle Auth.

🪪 Account Abstraction SDK
Particle Network natively supports and facilitates the end-to-end utilization of ERC-4337 account abstraction. This is primarily done through the account abstraction SDK, which can construct, sponsor, and send UserOperations, deploy smart accounts, retrieve fee quotes, and perform other vital functions.

👉 Learn more about the Particle AA SDK.

## Social Logins Setup

Particle Auth supports a wide range of social logins:
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
## Environment Variables

This project requires several keys from Particle Network to be defined in the .env file to see sample.env:

- NEXT_PUBLIC_PROJECT_ID
- NEXT_PUBLIC_CLIENT_KEY
- NEXT_PUBLIC_APP_ID

You can get these keys from your *[Particle Network Dashboard](https://dashboard.particle.network/#/applications)*.

## License
This project is licensed under the MIT License.

### Explore the project:
- [GitHub Repository](https://github.com/spreadzp/dm-talk)
- [Live Site](https://dm-talk.vercel.app/) 
- [YouTube Demo](https://youtu.be/GhPiWK-6MZw)