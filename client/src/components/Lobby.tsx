import React from 'react'

interface LobbyProps { playerInfo: any; onStart: () => void; onLogout: () => void }

const Lobby: React.FC<LobbyProps> = ({playerInfo, onStart, onLogout}) => (
    <main className="lobby-page">
        <header className="lobby-topbar">
            <div className="lobby-brand"><span className="brand-seal">牌</span><span className="brand-wordmark"><strong>牌友会</strong><small>好友同桌 · 欢乐开局</small></span></div>
            <div className="hall-label"><i/> 游戏大厅</div>
            <button className="player-pill" onClick={onLogout} aria-label="退出登录">
                <span className="player-avatar">{(playerInfo?.name || '友').slice(0, 1)}</span>
                <span className="player-meta"><strong>{playerInfo?.name || '牌友'}</strong><small>游客牌友</small></span>
                <span className="player-chevron">⌄</span>
            </button>
        </header>

        <section className="lobby-intro">
            <div><p className="lobby-overline">GOOD EVENING, {(playerInfo?.name || 'FRIEND').toUpperCase()}</p><h1>好牌，等你开场</h1><p className="lobby-subline">挑一间喜欢的牌室，和牌友来一局。</p></div>
            <div className="hall-stamp"><span>♧</span><div><strong>牌友雅集</strong><small>每一局都值得期待</small></div></div>
        </section>

        <section className="lobby-rooms" aria-label="选择游戏房间">
            <button className="room-card room-card-ddz" onClick={onStart}>
                <span className="room-ribbon"><i/> 正在营业</span>
                <span className="room-art room-art-cards" aria-hidden="true"><i className="playing-card card-back">♠</i><i className="playing-card card-red">♥</i><i className="playing-card card-front">♣</i></span>
                <span className="room-card-text"><strong>斗地主</strong><small>经典三人牌局 · 真人对战</small></span>
                <span className="room-enter">进入牌室 <b>↗</b></span>
                <span className="room-corner">01</span>
            </button>

            <div className="room-card room-card-soon" aria-label="麻将房间即将开放">
                <span className="room-ribbon soon-ribbon">即将开放</span>
                <span className="room-art"><i className="mahjong-tile">中</i></span>
                <span className="room-card-text"><strong>麻将</strong><small>约上牌友，搓一局</small></span>
                <span className="room-enter soon-enter">敬请期待</span><span className="room-corner">02</span>
            </div>

            <div className="room-card room-card-soon" aria-label="牛牛房间即将开放">
                <span className="room-ribbon soon-ribbon">即将开放</span>
                <span className="room-art"><i className="bull-token">牛</i></span>
                <span className="room-card-text"><strong>牛牛</strong><small>手气与运气的较量</small></span>
                <span className="room-enter soon-enter">敬请期待</span><span className="room-corner">03</span>
            </div>

            <div className="room-card room-card-soon" aria-label="德州扑克房间即将开放">
                <span className="room-ribbon soon-ribbon">即将开放</span>
                <span className="room-art"><i className="poker-chip">♠</i></span>
                <span className="room-card-text"><strong>德州扑克</strong><small>读牌、下注、见真章</small></span>
                <span className="room-enter soon-enter">敬请期待</span><span className="room-corner">04</span>
            </div>
        </section>

        <footer className="lobby-footer"><span className="footer-gem">✦</span><span>牌桌已备好</span><i/> <span>选择斗地主，即刻开局</span><span className="footer-version">牌友会 · 休闲牌室</span></footer>
    </main>
)

export default Lobby
