import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from './client';

export function urlFor(source: SanityImageSource) {
  if (!client) {
    throw new Error('Sanity client is not configured.');
  }

  return imageUrlBuilder(client).image(source);
}
