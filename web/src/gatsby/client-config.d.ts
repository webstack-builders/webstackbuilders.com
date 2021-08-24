/**
 * Sanity client variables from environmental file
 *
 * Used in client-side React components fetching image data from Sanity CMS
 */
declare const clientConfig: {
    sanity: {
        token?: string | undefined;
        dataset: string | undefined;
        projectId: string | undefined;
    };
};
export default clientConfig;
//# sourceMappingURL=client-config.d.ts.map