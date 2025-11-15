import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { PortableTextBlock } from 'next-sanity';

export interface Project {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  client?: string;
  description?: string;
  mainImage?: SanityImageSource;
  gallery?: SanityImageSource[];
  industry?: string;
  process?: 'heat-blanket' | 'autoclave' | 'closed-mold' | 'afp' | 'infusion' | 'bonding';
  completedDate?: string;
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
