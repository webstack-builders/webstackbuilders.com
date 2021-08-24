declare const _default: {
    name: string;
    title: string;
    type: string;
    options: {
        hotspot: boolean;
    };
    fields: ({
        name: string;
        title: string;
        type: string;
        options: {
            isHighlighted: boolean;
        };
        description?: undefined;
        validation?: undefined;
    } | {
        name: string;
        title: string;
        description: string;
        type: string;
        validation: (Rule: any) => any;
        options: {
            isHighlighted: boolean;
        };
    })[];
    preview: {
        select: {
            imageUrl: string;
            title: string;
        };
    };
};
export default _default;
//# sourceMappingURL=mainImage.d.ts.map