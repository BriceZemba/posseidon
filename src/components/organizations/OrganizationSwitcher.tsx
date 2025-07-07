
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
          organizationSwitcherPopoverActionButton: "text-neutral-300 hover:text-white hover:bg-neutral-800",
          organizationSwitcherPopoverActionButtonText: "text-neutral-300",
          organizationSwitcherPopoverActionButtonIcon: "text-neutral-400",
          formButtonPrimary: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500",
        }
      }}
      createOrganizationMode="modal"
      organizationProfileMode="modal"
      afterCreateOrganizationUrl="/dashboard"
      afterSelectOrganizationUrl="/dashboard"
      hidePersonal={false}
    />
  );
};
