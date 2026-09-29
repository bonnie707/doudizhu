import React from 'react'
import landlordArt from '../assets/room-landlord.webp'
import mahjongArt from '../assets/room-mahjong.webp'
import pokerAArt from '../assets/room-poker-a.webp'
import pokerBArt from '../assets/room-poker-b.webp'
import fishingArt from '../assets/room-fishing.webp'
import puzzleArt from '../assets/room-puzzle.webp'
import tournamentArt from '../assets/room-tournament.webp'
import hunterArt from '../assets/room-hunter.webp'

interface LobbyProps { playerInfo: any; onStart: () => void; onLogout: () => void }

const rooms = [
    {name: '斗地主', subtitle: '经典三人牌局', icon: '🃏', theme: 'landlord', badge: '热门', playable: true},
    {name: '麻将馆', subtitle: '好友同桌 · 休闲搓麻', icon: '🀄', theme: 'mahjong', badge: '即将开放'},
    {name: '扑克馆 A', subtitle: '德州扑克 · 好友竞技', icon: '♠️', theme: 'poker-a', badge: '即将开放'},
    {name: '扑克馆 B', subtitle: '锦标赛 · 等你挑战', icon: '♦️', theme: 'poker-b', badge: '即将开放'},
    {name: '捕鱼馆', subtitle: '海底寻宝 · 欢乐捕鱼', icon: '🐠', theme: 'fishing', badge: '即将开放'},
    {name: '益智馆', subtitle: '经典桌游 · 动脑过关', icon: '🎱', theme: 'puzzle', badge: '即将开放'},
    {name: '比赛馆', subtitle: '积分赛 · 挑战高手', icon: '🏆', theme: 'tournament', badge: '即将开放'},
    {name: '猎人馆', subtitle: '组队闯关 · 极限挑战', icon: '🏹', theme: 'hunter', badge: '即将开放'},
]

const roomImages: Record<string, string> = {
    landlord: landlordArt, mahjong: mahjongArt, 'poker-a': pokerAArt, 'poker-b': pokerBArt,
    fishing: fishingArt, puzzle: puzzleArt, tournament: tournamentArt, hunter: hunterArt,
}

const quickActions = [
    {icon: '🎁', label: '每日福利'},
    {icon: '🪙', label: '牌友商城'},
    {icon: '📩', label: '消息中心'},
    {icon: '💬', label: '在线客服'},
]

const Lobby: React.FC<LobbyProps> = ({playerInfo, onStart, onLogout}) => (
    <main className="classic-lobby">
        <div className="lobby-frame">
            <header className="classic-topbar">
                <div className="classic-brand">
                    <span className="classic-brand-seal">牌</span>
                    <span className="classic-brand-copy"><strong>牌友会</strong><small>POKER · CARD · CLUB</small></span>
                </div>
                <div className="classic-header-actions">
                    <button aria-label="在线客服"><span>♧</span><small>客服</small></button>
                    <button aria-label="消息中心"><span>✉</span><small>消息</small><i/></button>
                </div>
            </header>

            <section className="classic-player-panel" aria-label="玩家资料">
                <div className="classic-avatar"><span>{(playerInfo?.name || '友').slice(0, 1)}</span><i>♛</i></div>
                <div className="classic-player-name"><strong>{playerInfo?.name || '牌友'}</strong><small>牌桌新秀 <b>LV.1</b></small><span className="classic-exp"><i/></span></div>
                <div className="classic-wallet">
                    <div><span className="wallet-coin">金</span><b>{Number(playerInfo?.point ?? 1280).toLocaleString()}</b><button aria-label="充值金币">＋</button></div>
                    <div><span className="wallet-token">D</span><b>0</b><button aria-label="购买牌友币">＋</button></div>
                </div>
                <button className="classic-profile-more" onClick={onLogout} aria-label="退出登录">⋮</button>
            </section>

            <nav className="classic-quick-actions" aria-label="快捷功能">
                {quickActions.map(action => <button key={action.label}><span>{action.icon}</span><small>{action.label}</small></button>)}
            </nav>

            <aside className="classic-announcement">
                <span className="announcement-megaphone">📢</span><strong>大厅公告</strong>
                <span className="announcement-copy">欢迎来到牌友会，经典牌局等你开场。</span>
                <b className="announcement-new">NEW</b>
            </aside>

            <section className="classic-room-section">
                <div className="classic-section-heading">
                    <div><small>CHOOSE YOUR GAME</small><h1>热门游戏</h1></div>
                    <span className="online-count"><i/> 牌友在线</span>
                </div>
                <div className="classic-room-grid">
                    {rooms.map((room, index) => <button
                        key={room.name}
                        className={`classic-room-tile theme-${room.theme}${room.playable ? ' is-playable' : ''}`}
                        style={{backgroundImage: `url(${roomImages[room.theme]})`}}
                        onClick={room.playable ? onStart : undefined}
                        disabled={!room.playable}
                        aria-label={`${room.name}，${room.playable ? '进入游戏' : '即将开放'}`}
                    >
                        <span className="room-tile-top"><i>{room.playable ? '●' : '✦'}</i>{room.badge}<small>0{index + 1}</small></span>
                        <span className="room-tile-copy"><strong>{room.name}</strong><small>{room.subtitle}</small></span>
                        {room.playable && <span className="room-tile-enter">立即进入 <b>›</b></span>}
                    </button>)}
                </div>
            </section>

            <section className="classic-event-banner">
                <div className="event-copy"><small>牌友会 · 活动预告</small><strong>巅峰牌手挑战赛</strong><span>赛事玩法即将开放 · 敬请期待</span><b>活动预告　›</b></div>
                <div className="event-art" aria-hidden="true"><span>🏆</span><i>✦</i><b>♠</b></div>
                <span className="event-ribbon">即将开放</span>
            </section>

            <footer className="classic-footer"><span>牌友会休闲游戏平台</span><i/>公平对局 · 欢乐相聚</footer>
        </div>

        <nav className="classic-bottom-nav" aria-label="主导航">
            <button className="selected"><span>⌂</span><small>大厅</small></button>
            <button><span>🎁</span><small>福利</small></button>
            <button><span>🏆</span><small>排行</small></button>
            <button onClick={onLogout}><span>♙</span><small>我的</small></button>
        </nav>
    </main>
)

export default Lobby
