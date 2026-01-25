export function generateDocMock(fn: any) {
    return `
        /**
         * ${fn.name} function.
         * @returns ${fn.returnType}
         */
    `;
}