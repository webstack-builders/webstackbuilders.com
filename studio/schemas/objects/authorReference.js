export default {
  name: 'authorReference',
  title: 'Author reference',
  type: 'object',
  fields: [
    {
      name: 'author',
      type: 'reference',
      to: [
        {
          type: 'author',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'author.name',
      media: 'author.image.asset',
    },
  },
}
