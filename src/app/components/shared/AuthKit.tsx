"use client";

// Particle imports
import { bscTestnet, kakarotSepolia } from "@particle-network/authkit/chains"; // Chains are imported here
import { AuthType } from "@particle-network/auth-core";
import {
  AuthCoreContextProvider,
  PromptSettingType,
} from "@particle-network/authkit";
import { EntryPosition } from "@particle-network/wallet";

export const ParticleAuthkit = ({ children }: React.PropsWithChildren) => {
  return (
    <AuthCoreContextProvider
      options={{
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
        clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY!,
        appId: process.env.NEXT_PUBLIC_APP_ID!,
        authTypes: [
          AuthType.email,
          AuthType.google,
          AuthType.twitter,
          AuthType.github,
          AuthType.discord,
        ],
        themeType: "dark",

        // List the chains you want to include
        chains: [bscTestnet, kakarotSepolia],

        // Optionally, switches the embedded wallet modal to reflect a smart account
        erc4337: {
          name: "SIMPLE",
          version: "2.0.0",
        },

        // You can prompt the user to set up extra security measures upon login or other interactions
        promptSettingConfig: {
          promptPaymentPasswordSettingWhenSign: PromptSettingType.first,
          promptMasterPasswordSettingWhenLogin: PromptSettingType.first,
        },

        wallet: {
          themeType: "dark", // Wallet modal theme
          entryPosition: EntryPosition.TR,

          // Set to false to remove the embedded wallet modal
          visible: true,
          customStyle: {
            supportUIModeSwitch: true,
            supportLanguageSwitch: false,
          },
        },
      }}
    >
      {children}
    </AuthCoreContextProvider>
  );
};
