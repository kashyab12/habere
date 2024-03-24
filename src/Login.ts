
export const getBackendCorsHeaders = () => {
    const corsHeaders = new Headers()
    corsHeaders.append("Access-Control-Allow-Origin", "*")
    return corsHeaders
}