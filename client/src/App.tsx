import React from 'react'
import Login from './components/Login'
import Lobby from './components/Lobby'
import Game from './game/Index'
import './flow.css'

type Page = 'splash' | 'login' | 'lobby' | 'game'

interface AppState { page: Page }

function enterImmersiveLandscape() {
    const root = document.documentElement as any
    const requestFullscreen = root.requestFullscreen || root.webkitRequestFullscreen
    let fullscreenRequest: Promise<any> | undefined
    if (requestFullscreen && !document.fullscreenElement) {
        try { fullscreenRequest = Promise.resolve(requestFullscreen.call(root)) } catch (e) { fullscreenRequest = undefined }
    }

    const orientation = (window.screen as any).orientation
    const lockLandscape = () => {
        if (orientation && orientation.lock) {
            try { Promise.resolve(orientation.lock('landscape')).catch(() => undefined) } catch (e) { /* Browser does not allow orientation lock here. */ }
        }
    }
    lockLandscape()
    if (fullscreenRequest) fullscreenRequest.then(lockLandscape).catch(() => undefined)
}

class App extends React.Component<{}, AppState> {
    private splashTimer: number | undefined

    constructor(props: {}) {
        super(props)
        const playerInfo = this.loadPlayerInfo()
        if (playerInfo) window.playerInfo = playerInfo
        this.state = {page: 'splash'}
    }

    componentDidMount() {
        window.addEventListener('pointerdown', this.onFirstTouch, {once: true, capture: true})
        this.splashTimer = window.setTimeout(() => {
            this.setState({page: localStorage.getItem('token') ? 'lobby' : 'login'})
        }, 1500)
    }

    componentWillUnmount() {
        window.removeEventListener('pointerdown', this.onFirstTouch, true)
        if (this.splashTimer) window.clearTimeout(this.splashTimer)
    }

    onFirstTouch = () => {
        if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 900) enterImmersiveLandscape()
    }

    loadPlayerInfo() {
        try {
            const raw = localStorage.getItem('playerInfo')
            return raw ? JSON.parse(raw) : null
        } catch (e) { return null }
    }

    onLogin = (playerInfo: any) => {
        window.playerInfo = playerInfo
        this.setState({page: 'lobby'})
    }

    onLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('playerInfo')
        delete window.playerInfo
        this.setState({page: 'login'})
    }

    render() {
        const playerInfo = this.loadPlayerInfo() || window.playerInfo
        let pageView: React.ReactNode
        switch (this.state.page) {
            case 'splash':
                pageView = <main className="flow-screen splash-screen"><div className="brand-mark">牌</div><p className="eyebrow">CARD TABLE · ONLINE</p><h1>牌友会</h1><p className="splash-copy">好牌开局，轻松一刻</p><div className="loading-dots"><i/><i/><i/></div></main>
                break
            case 'login':
                pageView = <main className="flow-screen"><Login onLogin={this.onLogin}/></main>
                break
            case 'lobby':
                pageView = <div className="flow-screen lobby-flow"><Lobby playerInfo={playerInfo} onStart={() => this.setState({page: 'game'})} onLogout={this.onLogout}/></div>
                break
            case 'game':
            default:
                pageView = <div className="app-shell"><Game onLogout={() => this.setState({page: 'lobby'})}/></div>
        }
        return <div className="app-root">{pageView}<div className="rotation-guide"><div className="rotation-emblem">↻</div><p className="rotation-eyebrow">LANDSCAPE MODE</p><h2>请横屏进入牌室</h2><p>转动手机横向握持，画面将铺满整个屏幕。</p><button onClick={enterImmersiveLandscape}>开启横屏 · 全屏体验</button><small>若浏览器未自动旋转，请打开手机的自动旋转；添加到主屏幕后可全屏启动。</small></div></div>
    }
}

export default App
