declare const _default: {
    name: string;
    title: string;
    type: string;
    fields: ({
        name: string;
        title: string;
        description: string;
        type: string;
        options?: undefined;
        of?: undefined;
    } | {
        name: string;
        title: string;
        description: string;
        type: string;
        options: {
            source: string;
            maxLength: number;
        };
        of?: undefined;
    } | {
        name: string;
        title: string;
        type: string;
        description?: undefined;
        options?: undefined;
        of?: undefined;
    } | {
        name: string;
        title: string;
        type: string;
        of: {
            type: string;
        }[];
        description?: undefined;
        options?: undefined;
    } | {
        name: string;
        title: string;
        type: string;
        of: {
            type: string;
            to: {
                type: string;
            };
        }[];
        description?: undefined;
        options?: undefined;
    })[];
    orderings: {
        name: string;
        title: string;
        by: {
            field: string;
            direction: string;
        }[];
    }[];
    preview: {
        select: {
            title: string;
            publishedAt: string;
            slug: string;
            media: string;
        };
        prepare({ title, publishedAt, slug, media }: {
            title?: string | undefined;
            publishedAt: any;
            slug?: {} | undefined;
            media: any;
        }): {
            title: string;
            media: any;
            subtitle: string;
        };
    };
};
export default _default;
//# sourceMappingURL=post.d.ts.map