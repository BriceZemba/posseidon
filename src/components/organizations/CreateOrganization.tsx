
import { CreateOrganization as ClerkCreateOrganization } from '@clerk/clerk-react';

export const CreateOrganization = () => {
  return (
    <ClerkCreateOrganization
      appearance={{
        elements: {
          card: "bg-neutral-900 border-neutral-800",
          headerTitle: "text-neutral-100",
          headerSubtitle: "text-neutral-400",
          formButtonPrimary: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500",
          formFieldLabel: "text-neutral-300",
          formFieldInput: "bg-neutral-800 border-neutral-700 text-neutral-100",
          footerActionText: "text-neutral-400",
          footerActionLink: "text-blue-400 hover:text-blue-300",
        }
      }}
      routing="modal"
      afterCreateOrganizationUrl="/dashboard"
    />
  );
};
