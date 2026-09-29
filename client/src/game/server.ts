const configuredServerUrl = process.env.REACT_APP_GAME_SERVER_URL?.trim().replace(/\/+$/, '')

export const gameServerUrl = configuredServerUrl || (
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:8080'
        : window.location.origin
)

export function getApiUrl(path: string) {
    return `${gameServerUrl}${path.startsWith('/') ? path : `/${path}`}`
}

export function getWebSocketUrl(path: string) {
    const server = new URL(gameServerUrl)
    const protocol = server.protocol === 'https:' ? 'wss:' : 'ws:'
    return `${protocol}//${server.host}${path.startsWith('/') ? path : `/${path}`}`
}
