
-- Create whiteboards table to store whiteboard metadata
CREATE TABLE public.whiteboards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL DEFAULT 'Untitled Board',
  organization_id TEXT NOT NULL,
  created_by UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  thumbnail_url TEXT,
  is_public BOOLEAN NOT NULL DEFAULT false
);

-- Create whiteboard_data table to store the actual canvas data
CREATE TABLE public.whiteboard_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  whiteboard_id UUID REFERENCES public.whiteboards(id) ON DELETE CASCADE NOT NULL,
  canvas_data JSONB NOT NULL DEFAULT '{}',
  version INTEGER NOT NULL DEFAULT 1,
  updated_by UUID REFERENCES auth.users(id) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.whiteboards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whiteboard_data ENABLE ROW LEVEL SECURITY;

-- RLS Policies for whiteboards table
CREATE POLICY "Users can view whiteboards in their organization"
  ON public.whiteboards
  FOR SELECT
  USING (true); -- We'll handle organization filtering in the application layer

CREATE POLICY "Users can create whiteboards"
  ON public.whiteboards
  FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update whiteboards they created"
  ON public.whiteboards
  FOR UPDATE
  USING (auth.uid() = created_by);

CREATE POLICY "Users can delete whiteboards they created"
  ON public.whiteboards
  FOR DELETE
  USING (auth.uid() = created_by);

-- RLS Policies for whiteboard_data table
CREATE POLICY "Users can view whiteboard data"
  ON public.whiteboard_data
  FOR SELECT
  USING (true); -- We'll handle organization filtering through whiteboard relationship

CREATE POLICY "Users can insert whiteboard data"
  ON public.whiteboard_data
  FOR INSERT
  WITH CHECK (auth.uid() = updated_by);

CREATE POLICY "Users can update whiteboard data"
  ON public.whiteboard_data
  FOR UPDATE
  USING (auth.uid() = updated_by);

-- Enable realtime for collaborative editing
ALTER TABLE public.whiteboard_data REPLICA IDENTITY FULL;
ALTER publication supabase_realtime ADD TABLE public.whiteboard_data;
ALTER publication supabase_realtime ADD TABLE public.whiteboards;

-- Create indexes for better performance
CREATE INDEX idx_whiteboards_organization_id ON public.whiteboards(organization_id);
CREATE INDEX idx_whiteboards_created_by ON public.whiteboards(created_by);
CREATE INDEX idx_whiteboard_data_whiteboard_id ON public.whiteboard_data(whiteboard_id);
CREATE INDEX idx_whiteboard_data_updated_at ON public.whiteboard_data(updated_at DESC);
