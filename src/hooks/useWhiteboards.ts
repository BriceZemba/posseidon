
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert } from '@/integrations/supabase/types';
import { toast } from 'sonner';

type Whiteboard = Tables<'whiteboards'>;
type WhiteboardInsert = TablesInsert<'whiteboards'>;

export const useWhiteboards = (organizationId?: string) => {
  const { user } = useUser();
  const [whiteboards, setWhiteboards] = useState<Whiteboard[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWhiteboards = async () => {
    if (!user || !organizationId) {
      setWhiteboards([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('whiteboards')
        .select('*')
        .eq('organization_id', organizationId)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setWhiteboards(data || []);
    } catch (error) {
      console.error('Error fetching whiteboards:', error);
      toast.error('Failed to load whiteboards');
      setWhiteboards([]);
    } finally {
      setLoading(false);
    }
  };

  const createWhiteboard = async (title: string = 'Untitled Board'): Promise<string | null> => {
    if (!user || !organizationId) {
      toast.error('Authentication required');
      return null;
    }

    try {
      const whiteboardData: WhiteboardInsert = {
        title,
        organization_id: organizationId,
        created_by: user.id,
      };

      const { data, error } = await supabase
        .from('whiteboards')
        .insert([whiteboardData])
        .select()
        .single();

      if (error) throw error;

      toast.success('Whiteboard created successfully');
      await fetchWhiteboards();
      return data.id;
    } catch (error) {
      console.error('Error creating whiteboard:', error);
      toast.error('Failed to create whiteboard');
      return null;
    }
  };

  const deleteWhiteboard = async (id: string) => {
    if (!user) {
      toast.error('Authentication required');
      return;
    }

    try {
      const { error } = await supabase
        .from('whiteboards')
        .delete()
        .eq('id', id)
        .eq('created_by', user.id);

      if (error) throw error;

      toast.success('Whiteboard deleted successfully');
      await fetchWhiteboards();
    } catch (error) {
      console.error('Error deleting whiteboard:', error);
      toast.error('Failed to delete whiteboard');
    }
  };

  useEffect(() => {
    fetchWhiteboards();
  }, [user, organizationId]);

  return {
    whiteboards,
    loading,
    createWhiteboard,
    deleteWhiteboard,
    refetch: fetchWhiteboards,
  };
};
