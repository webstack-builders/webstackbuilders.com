"use strict";
exports.__esModule = true;
exports["default"] = {
    name: 'authorReference',
    title: 'Author reference',
    type: 'object',
    fields: [
        {
            name: 'author',
            type: 'reference',
            to: [
                {
                    type: 'author'
                },
            ]
        },
    ],
    preview: {
        select: {
            title: 'author.name',
            media: 'author.image.asset'
        }
    }
};
//# sourceMappingURL=authorReference.js.map