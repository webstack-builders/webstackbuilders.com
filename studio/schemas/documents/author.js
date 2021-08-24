"use strict";
exports.__esModule = true;
exports["default"] = {
    name: 'author',
    type: 'document',
    title: 'Author',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string'
        },
        {
            name: 'slug',
            title: 'Slug',
            description: 'Some frontends will require a slug to be set to be able to show the person',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96
            }
        },
        {
            name: 'image',
            title: 'Image',
            type: 'mainImage'
        },
        {
            name: 'bio',
            title: 'Biography',
            type: 'bioPortableText'
        },
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'slug.current',
            media: 'image'
        }
    }
};
//# sourceMappingURL=author.js.map