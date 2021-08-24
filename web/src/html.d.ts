import { AllHTMLAttributes, FC, HTMLAttributes, ReactElement } from 'react';
import 'styles/normalize.css';
interface HtmlProps {
    htmlAttributes?: HTMLAttributes['lang'];
    headComponents?: ReactElement[];
    bodyAttributes?: AllHTMLAttributes[];
    preBodyComponents?: ReactElement[];
    body: string;
    postBodyComponents?: ReactElement[];
}
declare const HTML: FC<HtmlProps>;
export default HTML;
//# sourceMappingURL=html.d.ts.map