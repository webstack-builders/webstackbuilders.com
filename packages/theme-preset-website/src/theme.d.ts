declare const baseThemeTemplate: {
    space: number[];
    fonts: {
        body: string;
        heading: string;
        monospace: string;
    };
    fontSizes: number[];
    fontWeights: {
        body: number;
        heading: number;
        bold: number;
    };
    lineHeights: {
        body: number;
        heading: number;
    };
    colors: {
        text: string;
        heading: string;
        background: string;
        primary: string;
        secondary: string;
        muted: string;
    };
    styles: {
        root: {
            fontFamily: string;
            lineHeight: string;
            fontWeight: string;
        };
        h1: {
            fontSize: number;
            color: string;
            fontFamily: string;
            lineHeight: string;
            fontWeight: string;
        };
        h2: {
            fontSize: number;
            color: string;
            fontFamily: string;
            lineHeight: string;
            fontWeight: string;
        };
        h3: {
            fontSize: number;
            color: string;
            fontFamily: string;
            lineHeight: string;
            fontWeight: string;
        };
        h4: {
            fontSize: number;
            color: string;
            fontFamily: string;
            lineHeight: string;
            fontWeight: string;
        };
        h5: {
            fontSize: number;
            color: string;
            fontFamily: string;
            lineHeight: string;
            fontWeight: string;
        };
        h6: {
            fontSize: number;
            color: string;
            fontFamily: string;
            lineHeight: string;
            fontWeight: string;
        };
        p: {
            color: string;
            fontFamily: string;
            fontWeight: string;
            lineHeight: string;
        };
        a: {
            color: string;
        };
        pre: {
            fontFamily: string;
            overflowX: string;
            code: {
                color: string;
            };
        };
        code: {
            color: string;
            backgroundColor: string;
            ".prolog": {
                color: string;
            };
            ".comment": {
                color: string;
            };
            ".builtin,.changed,.keyword": {
                color: string;
            };
            ".number,.inserted": {
                color: string;
            };
            ".constant": {
                color: string;
            };
            ".attr-name,.variable": {
                color: string;
            };
            ".deleted,.string,.attr-value": {
                color: string;
            };
            ".selector": {
                color: string;
            };
            ".tag": {
                color: string;
            };
            ".punctuation,.operator": {
                color: string;
            };
            ".punctuation": {
                color: string;
            };
            ".function": {
                color: string;
            };
            ".class-name": {
                color: string;
            };
            ".char": {
                color: string;
            };
            ".highlight": {
                background: string;
            };
        };
        table: {
            width: string;
            borderCollapse: string;
            borderSpacing: number;
        };
        th: {
            textAlign: string;
            borderBottomStyle: string;
        };
        td: {
            textAlign: string;
            borderBottomStyle: string;
        };
        img: {
            maxWidth: string;
        };
    };
};
export = baseThemeTemplate;
//# sourceMappingURL=theme.d.ts.map