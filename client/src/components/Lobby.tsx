import React from 'react'

interface LobbyProps { playerInfo: any; onStart: () => void; onLogout: () => void }

const Lobby: React.FC<LobbyProps> = ({playerInfo, onStart, onLogout}) => (
    <div className="lobby-page">
        <header className="lobby-header">
            <div className="brand-lockup"><span className="brand-small">牌</span><div><strong>牌友会</strong><small>轻松开局，快乐同桌</small></div></div>
            <button className="profile-chip" onClick={onLogout} aria-label="退出登录"><span className="avatar">{(playerInfo?.name || '友').slice(0, 1)}</span><span className="profile-name">{playerInfo?.name || '牌友'}</span><span className="logout-mark">⌄</span></button>
        </header>
        <section className="lobby-welcome"><span className="welcome-kicker">WELCOME BACK</span><h1>今天想玩点什么？</h1><p>选一桌坐下，马上开始。</p></section>
        <section className="games-grid" aria-label="游戏列表">
            <button className="game-card game-card-featured" onClick={onStart}>
                <span className="card-status"><i/>现在可玩</span><span className="game-art poker-art"><b>♠</b><em>♥</em><strong>♣</strong></span>
                <span className="game-card-copy"><strong>斗地主</strong><small>经典三人牌局 · 真人对战</small></span><span className="game-card-action">进入牌桌 <b>↗</b></span>
            </button>
            <div className="game-card game-card-soon"><span className="card-status muted">即将开放</span><span className="game-art mahjong-art">🀄</span><span className="game-card-copy"><strong>麻将</strong><small>约上牌友，搓一局</small></span><span className="game-card-action disabled">敬请期待</span></div>
            <div className="game-card game-card-soon"><span className="card-status muted">即将开放</span><span className="game-art bull-art">牛</span><span className="game-card-copy"><strong>牛牛</strong><small>手气与运气的较量</small></span><span className="game-card-action disabled">敬请期待</span></div>
            <div className="game-card game-card-soon"><span className="card-status muted">即将开放</span><span className="game-art poker-chip-art">♠</span><span className="game-card-copy"><strong>德州扑克</strong><small>读牌、下注、见真章</small></span><span className="game-card-action disabled">敬请期待</span></div>
        </section>
        <footer className="lobby-footer"><span>♧</span> 和牌友一起，享受每一局</footer>
    </div>
)

export default Lobby
