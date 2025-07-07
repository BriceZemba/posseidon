
import { useOrganization as useClerkOrganization, useUser } from '@clerk/clerk-react';

export const useOrganization = () => {
  const { organization, isLoaded } = useClerkOrganization();
  const { user } = useUser();
  
  return {
    organization,
    isLoaded,
    organizationId: organization?.id || `user_${user?.id}`,
    organizationName: organization?.name || 'Personal Workspace'
  };
};
