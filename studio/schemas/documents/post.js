"use strict";
exports.__esModule = true;
var date_fns_1 = require("date-fns");
exports["default"] = {
    name: 'post',
    title: 'Blog Post',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            description: 'Titles should be catchy, descriptive, and not too long',
            type: 'string'
        },
        {
            name: 'slug',
            title: 'Slug',
            description: 'Some frontends will require a slug to be set to be able to show the post',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96
            }
        },
        {
            name: 'publishedAt',
            title: 'Published at',
            description: 'This can be used to schedule post for publishing',
            type: 'datetime'
        },
        {
            name: 'mainImage',
            title: 'Main image',
            type: 'mainImage'
        },
        {
            name: 'excerpt',
            title: 'Excerpt',
            description: 'This ends up on summary pages, on Google, when people share your post in social media.',
            type: 'excerptPortableText'
        },
        {
            name: 'authors',
            title: 'Authors',
            type: 'array',
            of: [
                {
                    type: 'authorReference'
                },
            ]
        },
        {
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: {
                        type: 'category'
                    }
                },
            ]
        },
        {
            name: 'body',
            title: 'Body',
            type: 'bodyPortableText'
        },
    ],
    orderings: [
        {
            name: 'publishingDateAsc',
            title: 'Publishing date new–>old',
            by: [
                {
                    field: 'publishedAt',
                    direction: 'asc'
                },
                {
                    field: 'title',
                    direction: 'asc'
                },
            ]
        },
        {
            name: 'publishingDateDesc',
            title: 'Publishing date old->new',
            by: [
                {
                    field: 'publishedAt',
                    direction: 'desc'
                },
                {
                    field: 'title',
                    direction: 'asc'
                },
            ]
        },
    ],
    preview: {
        select: {
            title: 'title',
            publishedAt: 'publishedAt',
            slug: 'slug',
            media: 'mainImage'
        },
        prepare: function (_a) {
            var _b = _a.title, title = _b === void 0 ? 'No title' : _b, publishedAt = _a.publishedAt, _c = _a.slug, slug = _c === void 0 ? {} : _c, media = _a.media;
            var dateSegment = date_fns_1.format(new Date(publishedAt), 'yyyy/MM');
            var path = "/" + dateSegment + "/" + slug.current + "/";
            return {
                title: title,
                media: media,
                subtitle: publishedAt ? path : 'Missing publishing date'
            };
        }
    }
};
//# sourceMappingURL=post.js.map