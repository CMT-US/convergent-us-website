import { defineType, defineField } from 'sanity';

const processLabels: Record<string, string> = {
  'heat-blanket': 'Heat Blanket',
  'autoclave': 'Autoclave',
  'closed-mold': 'Closed Mold',
  'afp': 'AFP',
  'infusion': 'Infusion',
  'bonding': 'Bonding',
};

export const partFamily = defineType({
  name: 'partFamily',
  title: 'Part Family',
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
      name: 'processes',
      title: 'Processes',
      type: 'array',
      of: [{ type: 'string' }],
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
      validation: (Rule) => Rule.min(1).required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      processes: 'processes',
    },
    prepare(selection) {
      const { title, processes } = selection as {
        title?: string;
        processes?: string[];
      };
      const subtitle = processes?.length
        ? processes.map((value) => processLabels[value] || value).join(', ')
        : 'No processes';
      return {
        title,
        subtitle,
      };
    },
  },
});
