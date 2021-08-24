"use strict";
exports.__esModule = true;
exports["default"] = {
    name: 'mainImage',
    title: 'Image',
    type: 'image',
    options: {
        hotspot: true
    },
    fields: [
        {
            name: 'caption',
            title: 'Caption',
            type: 'string',
            options: {
                isHighlighted: true
            }
        },
        {
            name: 'alt',
            title: 'Alternative text',
            description: 'Important for SEO and accessibility.',
            type: 'string',
            validation: function (Rule) {
                return Rule.error('You have to fill out the alternative text.').required();
            },
            options: {
                isHighlighted: true
            }
        },
    ],
    preview: {
        select: {
            imageUrl: 'asset.url',
            title: 'caption'
        }
    }
};
//# sourceMappingURL=mainImage.js.map