import {
    FunctionDeclaration,
    MethodDeclaration,
    ArrowFunction,
} from "ts-morph";

export type DocumentableFunction =
    | FunctionDeclaration
    | MethodDeclaration
    | ArrowFunction;