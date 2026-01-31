export function serializeFunction(fn: any) {
    return {
        name: fn.getName(),
        params: fn.getParameters().map((p: any) => p.getText()),
        returnType: fn.getReturnType().getText(),
        isAsync: fn.isAsync(),
        bodyText: fn.getBodyText() || "",
    }
}