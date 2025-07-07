
import { OrganizationSwitcher as ClerkOrgSwitcher } from '@clerk/clerk-react';

export const OrganizationSwitcher = () => {
  return (
    <ClerkOrgSwitcher
      appearance={{
        elements: {
          organizationSwitcherTrigger: "text-neutral-300 hover:text-white",
          organizationSwitcherPopoverCard: "bg-neutral-900 border-neutral-800",
          organizationSwitcherPopoverFooter: "bg-neutral-900",
          organizationPreviewMainIdentifier: "text-neutral-100",
          organizationPreviewSecondaryIdentifier: "text-neutral-400",
        }
      }}
      createOrganizationMode="modal"
      organizationProfileMode="modal"
    />
  );
};
