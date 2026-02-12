export interface DocumentableFunction {
    name: string;
    params: string[];
    returnType?: string;
    bodyText: string;
    language: "ts" | "js" | "php";
    node: unknown; // AST node specifico del linguaggio
    sourceFilePath: string;
}