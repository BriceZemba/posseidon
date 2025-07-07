
import { useState, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/clerk-react';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert } from '@/integrations/supabase/types';
import { toast } from 'sonner';

type WhiteboardData = Tables<'whiteboard_data'>;
type WhiteboardDataInsert = TablesInsert<'whiteboard_data'>;

export const useWhiteboardData = (whiteboardId: string) => {
  const { user } = useUser();
  const [canvasData, setCanvasData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [version, setVersion] = useState(1);

  const fetchCanvasData = useCallback(async () => {
    if (!whiteboardId) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('whiteboard_data')
        .select('*')
        .eq('whiteboard_id', whiteboardId)
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        setCanvasData(data.canvas_data || {});
        setVersion(data.version);
      } else {
        setCanvasData({});
        setVersion(1);
      }
    } catch (error) {
      console.error('Error fetching canvas data:', error);
      toast.error('Failed to load whiteboard data');
    } finally {
      setLoading(false);
    }
  }, [whiteboardId]);

  const saveCanvasData = useCallback(async (data: any) => {
    if (!user || !whiteboardId) {
      toast.error('Authentication required');
      return;
    }

    try {
      const whiteboardDataInsert: WhiteboardDataInsert = {
        whiteboard_id: whiteboardId,
        canvas_data: data,
        version: version + 1,
        updated_by: user.id,
      };

      const { error } = await supabase
        .from('whiteboard_data')
        .insert([whiteboardDataInsert]);

      if (error) throw error;

      setVersion(prev => prev + 1);
      console.log('Canvas data saved successfully');
    } catch (error) {
      console.error('Error saving canvas data:', error);
      toast.error('Failed to save whiteboard changes');
    }
  }, [user, whiteboardId, version]);

  // Set up real-time subscription
  useEffect(() => {
    if (!whiteboardId) return;

    const channel = supabase
      .channel(`whiteboard_data_${whiteboardId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'whiteboard_data',
          filter: `whiteboard_id=eq.${whiteboardId}`,
        },
        (payload) => {
          console.log('Real-time update received:', payload);
          const newData = payload.new as WhiteboardData;
          
          // Only update if this change wasn't made by the current user
          if (newData.updated_by !== user?.id) {
            setCanvasData(newData.canvas_data || {});
            setVersion(newData.version);
            toast.info('Whiteboard updated by collaborator');
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [whiteboardId, user?.id]);

  useEffect(() => {
    fetchCanvasData();
  }, [fetchCanvasData]);

  return {
    canvasData,
    loading,
    version,
    saveCanvasData,
    refetch: fetchCanvasData,
  };
};
