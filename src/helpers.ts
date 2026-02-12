import { SUPPORTED_LANGUAGES, type SupportedLanguage } from "./scanner.js";

export function parseLanguages(input: string): SupportedLanguage[] {
    const requested = input.split(",").map(l => l.trim());

    const valid = requested.filter(
        (l): l is SupportedLanguage =>
            SUPPORTED_LANGUAGES.includes(l as SupportedLanguage)
    );

    const invalid = requested.filter(l => !valid.includes(l as any));

    if (invalid.length) {
        console.warn(
            `⚠️ Ignored unsupported languages: ${invalid.join(", ")}`
        );
    }

    return valid;
}