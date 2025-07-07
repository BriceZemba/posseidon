
import { OrganizationList as ClerkOrganizationList } from '@clerk/clerk-react';

export const OrganizationList = () => {
  return (
    <ClerkOrganizationList
      appearance={{
        elements: {
          card: "bg-neutral-900 border-neutral-800",
          headerTitle: "text-neutral-100",
          headerSubtitle: "text-neutral-400",
          organizationSwitcherTrigger: "text-neutral-300 hover:text-white",
          organizationPreviewMainIdentifier: "text-neutral-100",
          organizationPreviewSecondaryIdentifier: "text-neutral-400",
          formButtonPrimary: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500",
        }
      }}
      hidePersonal={false}
      afterSelectOrganizationUrl="/dashboard"
      afterCreateOrganizationUrl="/dashboard"
    />
  );
};
