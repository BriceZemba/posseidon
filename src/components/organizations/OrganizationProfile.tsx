
import { OrganizationProfile as ClerkOrganizationProfile } from '@clerk/clerk-react';

export const OrganizationProfile = () => {
  return (
    <ClerkOrganizationProfile
      appearance={{
        elements: {
          card: "bg-neutral-900 border-neutral-800",
          headerTitle: "text-neutral-100",
          headerSubtitle: "text-neutral-400",
          formButtonPrimary: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500",
          formFieldLabel: "text-neutral-300",
          formFieldInput: "bg-neutral-800 border-neutral-700 text-neutral-100",
          profileSectionTitle: "text-neutral-100",
          profileSectionContent: "text-neutral-300",
          navbar: "bg-neutral-800",
          navbarButton: "text-neutral-300 hover:text-white",
          navbarButtonActive: "text-white bg-neutral-700",
        }
      }}
      routing="modal"
    />
  );
};
