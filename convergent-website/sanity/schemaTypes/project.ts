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
      name: 'customer',
      title: 'Customer',
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
      name: 'material',
      title: 'Material',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Thermoset', value: 'thermoset' },
          { title: 'Thermoplastic', value: 'thermoplastic' },
          { title: 'BMI', value: 'bmi' },
          { title: 'Carbon-Carbon', value: 'carbon-carbon' },
          { title: 'Polyimide', value: 'polyimide' },
        ],
        layout: 'tags',
      },
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
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Completed', value: 'completed' },
          { title: 'In Progress', value: 'in-progress' },
        ],
      },
      initialValue: 'in-progress',
    }),
    defineField({
      name: 'completedDate',
      title: 'Completed Date',
      type: 'date',
      hidden: ({ document }) => document?.status !== 'completed',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.status === 'completed' && !value) {
            return 'Completed Date is required when status is Completed.';
          }
          return true;
        }),
    }),
    defineField({
      name: 'manufacturingChallenges',
      title: 'Manufacturing Challenges',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Thermal Compliance', value: 'thermal-compliance' },
          { title: 'Distortion', value: 'distortion' },
          { title: 'Offgassing', value: 'offgassing' },
          { title: 'Part Thickness', value: 'part-thickness' },
          { title: 'Porosity', value: 'porosity' },
          { title: 'Wrinkling', value: 'wrinkling' },
          { title: 'Tool Compensation', value: 'tool-compensation' },
        ],
        layout: 'tags',
      },
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
      customer: 'customer',
      media: 'mainImage',
    },
    prepare(selection) {
      const { title, customer } = selection;
      return {
        ...selection,
        subtitle: customer ? `Customer: ${customer}` : 'No customer specified',
      };
    },
  },
});
