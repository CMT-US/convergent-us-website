import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { PortableTextBlock } from 'next-sanity';

export interface Project {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  customer?: string;
  description?: string;
  mainImage?: SanityImageSource;
  gallery?: SanityImageSource[];
  industry?: string;
  material?: Array<'thermoset' | 'thermoplastic' | 'bmi' | 'carbon-carbon' | 'polyimide'>;
  process?: 'heat-blanket' | 'autoclave' | 'closed-mold' | 'afp' | 'infusion' | 'bonding';
  status?: 'completed' | 'in-progress';
  completedDate?: string;
  manufacturingChallenges?: Array<
    | 'thermal-compliance'
    | 'distortion'
    | 'offgassing'
    | 'part-thickness'
    | 'porosity'
    | 'wrinkling'
    | 'tool-compensation'
  >;
  content?: PortableTextBlock[];
  featured?: boolean;
  order?: number;
}

export interface ContactSubmission {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  submittedAt?: string;
  status?: 'new' | 'read' | 'responded' | 'archived';
  notes?: string;
}
