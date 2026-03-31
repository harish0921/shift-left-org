type ErrorWithMessage = {
    message: string
}

const isErrorWithMessage = (error: unknown): error is ErrorWithMessage => {
    return (
        typeof error === 'object' && error !== null && 'message' in error && typeof (error as Record<string, unknown>).message === 'string'
    )
}

const toErrorWithMessage = (maybeError: unknown): ErrorWithMessage => {
    if (isErrorWithMessage(maybeError)) return maybeError

    try {
        return new Error(JSON.stringify(maybeError))
    } catch {
        // fallback in case there's an error stringifying the maybeError
        // like with circular references for example.
        return new Error(String(maybeError))
    }
}

export const getErrorMessage = (error: unknown) => {
    return toErrorWithMessage(error).message
}

export const getActionableLLMErrorMessage = (error: unknown) => {
    const message = getErrorMessage(error)
    const normalized = message.toLowerCase()

    const isQuotaError =
        normalized.includes('quota exceeded') ||
        normalized.includes('too many requests') ||
        normalized.includes('rate limit') ||
        normalized.includes('[429') ||
        normalized.includes('status: 429')

    if (isQuotaError) {
        return `${message}

LLM provider quota/rate limit reached. Update billing/quota for this provider key, or switch to another provider/model with available quota and retry.`
    }

    const isAuthError =
        normalized.includes('unauthorized') ||
        normalized.includes('invalid api key') ||
        normalized.includes('incorrect api key') ||
        normalized.includes('api key not valid') ||
        normalized.includes('status: 401') ||
        normalized.includes('[401')

    if (isAuthError) {
        return `${message}

LLM provider authentication failed. Verify the API key/credential configured for this model and retry.`
    }

    return message
}
