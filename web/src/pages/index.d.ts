import { PageProps } from 'gatsby';
export declare const query: void;
interface IndexPageProps extends PageProps {
    errors?: any;
    data: {
        site: {
            siteMetadata: {
                siteName: string;
            };
        };
    };
}
declare const IndexPage: (props: IndexPageProps) => JSX.Element;
export default IndexPage;
//# sourceMappingURL=index.d.ts.map