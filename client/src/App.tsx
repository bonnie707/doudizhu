import React from 'react'
import Login from './components/Login'
import Lobby from './components/Lobby'
import Game from './game/Index'
import './flow.css'

type Page = 'splash' | 'login' | 'lobby' | 'game'

interface AppState { page: Page }

class App extends React.Component<{}, AppState> {
    private splashTimer: number | undefined

    constructor(props: {}) {
        super(props)
        const playerInfo = this.loadPlayerInfo()
        if (playerInfo) window.playerInfo = playerInfo
        this.state = {page: 'splash'}
    }

    componentDidMount() {
        this.splashTimer = window.setTimeout(() => {
            this.setState({page: localStorage.getItem('token') ? 'lobby' : 'login'})
        }, 1500)
    }

    componentWillUnmount() {
        if (this.splashTimer) window.clearTimeout(this.splashTimer)
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
        return <div className="app-root">{pageView}</div>
    }
}

export default App
