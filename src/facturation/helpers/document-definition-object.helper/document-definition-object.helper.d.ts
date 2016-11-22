export declare class DocumentDefinitionObjectHelper {
    static getDDO(templateName: string): {
        content: ({
            stack: (string | {
                text: string;
                style: string;
            })[];
            style: string;
        } | {
            text: string[];
        } | {
            text: string;
            margin: number[];
        } | {
            stack: ({
                text: (string | {
                    text: string;
                    italics: boolean;
                })[];
            } | string)[];
            style: string;
        } | {
            stack: (string | {
                fontSize: number;
                text: (string | {
                    text: string;
                    margin: number;
                })[];
            })[];
            margin: number[];
            alignment: string;
        })[];
        styles: {
            header: {
                fontSize: number;
                bold: boolean;
                alignment: string;
                margin: number[];
            };
            subheader: {
                fontSize: number;
            };
            superMargin: {
                margin: number[];
                fontSize: number;
            };
        };
    };
    static getStylesTest(): {
        header: {
            fontSize: number;
            bold: boolean;
            alignment: string;
            margin: number[];
        };
        subheader: {
            fontSize: number;
        };
        superMargin: {
            margin: number[];
            fontSize: number;
        };
    };
    static getContentTest(): ({
        stack: (string | {
            text: string;
            style: string;
        })[];
        style: string;
    } | {
        text: string[];
    } | {
        text: string;
        margin: number[];
    } | {
        stack: ({
            text: (string | {
                text: string;
                italics: boolean;
            })[];
        } | string)[];
        style: string;
    } | {
        stack: (string | {
            fontSize: number;
            text: (string | {
                text: string;
                margin: number;
            })[];
        })[];
        margin: number[];
        alignment: string;
    })[];
    constructor();
}
