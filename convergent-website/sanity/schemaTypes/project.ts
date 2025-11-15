import { defineType, defineField } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
    }),
    defineField({
      name: 'process',
      title: 'Process',
      type: 'string',
      options: {
        list: [
          { title: 'Heat Blanket', value: 'heat-blanket' },
          { title: 'Autoclave', value: 'autoclave' },
          { title: 'Closed Mold', value: 'closed-mold' },
          { title: 'AFP', value: 'afp' },
          { title: 'Infusion', value: 'infusion' },
          { title: 'Bonding', value: 'bonding' },
        ],
      },
    }),
    defineField({
      name: 'completedDate',
      title: 'Completed Date',
      type: 'date',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Order for displaying projects (lower numbers appear first)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      client: 'client',
      media: 'mainImage',
    },
    prepare(selection) {
      const { title, client } = selection;
      return {
        ...selection,
        subtitle: client ? `Client: ${client}` : 'No client specified',
      };
    },
  },
});
