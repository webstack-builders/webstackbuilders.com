/// <reference types="react" />
import PropTypes from 'prop-types';
declare function SEO({ description, lang, meta, keywords, title, image }: {
    description: any;
    lang: any;
    meta: any;
    keywords: any;
    title: any;
    image: any;
}): JSX.Element;
declare namespace SEO {
    var defaultProps: {
        lang: string;
        meta: never[];
        keywords: never[];
    };
    var propTypes: {
        description: PropTypes.Requireable<string>;
        image: PropTypes.Requireable<string>;
        lang: PropTypes.Requireable<string>;
        meta: PropTypes.Requireable<any[]>;
        keywords: PropTypes.Requireable<(string | null | undefined)[]>;
        title: PropTypes.Validator<string>;
    };
}
export default SEO;
//# sourceMappingURL=seo.d.ts.map