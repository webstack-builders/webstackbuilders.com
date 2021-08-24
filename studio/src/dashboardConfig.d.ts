declare const _default: {
    widgets: ({
        name: string;
        options?: undefined;
        layout?: undefined;
    } | {
        name: string;
        options: {
            __experimental_before: {
                name: string;
                options: {
                    description: string;
                    sites: {
                        buildHookId: string;
                        title: string;
                        name: string;
                        apiId: string;
                    }[];
                };
            }[];
            data: {
                title: string;
                value: string;
                category: string;
            }[];
            title?: undefined;
            order?: undefined;
            types?: undefined;
        };
        layout?: undefined;
    } | {
        name: string;
        layout: {
            height: string;
            width?: undefined;
        };
        options?: undefined;
    } | {
        name: string;
        options: {
            title: string;
            order: string;
            types: string[];
            __experimental_before?: undefined;
            data?: undefined;
        };
        layout: {
            width: string;
            height?: undefined;
        };
    })[];
};
export default _default;
//# sourceMappingURL=dashboardConfig.d.ts.map