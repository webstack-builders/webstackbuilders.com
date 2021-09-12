"use strict";
exports.__esModule = true;
exports["default"] = {
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    __experimental_actions: ['update', /* 'create', 'delete', */ 'publish'],
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'description',
            title: 'Description',
            description: 'Describe your blog for search engines and social media.',
            type: 'text'
        },
        {
            name: 'keywords',
            title: 'Keywords',
            description: 'Add keywords that describes your blog.',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags'
            }
        },
        {
            name: 'author',
            title: 'Author',
            description: 'Publish an author and set a reference to them here.',
            type: 'reference',
            to: [{ type: 'author' }]
        },
    ]
};
//# sourceMappingURL=siteSettings.js.map