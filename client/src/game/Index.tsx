import React from 'react'
import Phaser from 'phaser'
import {BootScene} from './boot'
import GameScene from './game'
import './Game.css'

interface GameProps { onLogout?: () => void }
interface GameResult { won: boolean; point: number; multiple: number; spring: number; antispring: number }
interface GameState { result: GameResult | null }

class Game extends React.Component<GameProps, GameState> {
    private containerRef: React.RefObject<HTMLDivElement>
    private game: Phaser.Game | null

    constructor(props: GameProps) {
        super(props)
        this.containerRef = React.createRef()
        this.game = null
        this.state = {result: null}
    }

    componentDidMount() {
        if (this.game) return
        const config = {
            type: Phaser.AUTO,
            parent: this.containerRef.current,
            backgroundColor: '#182d3b',
            scale: {parent: this.containerRef.current, mode: Phaser.Scale.FIT, width: 960, height: 540},
            scene: [BootScene, GameScene],
        }
        this.game = new Phaser.Game(config)
        this.game.events.on('ddz-game-over', this.handleGameOver)
    }

    componentWillUnmount() {
        if (this.game) {
            this.game.events.off('ddz-game-over', this.handleGameOver)
            this.game.destroy(true)
            this.game = null
        }
    }

    handleGameOver = (result: GameResult) => this.setState({result})

    render() {
        const {result} = this.state
        return (
            <div className="game-shell">
                <div ref={this.containerRef} className="game-container" />
                <button className="table-back" onClick={this.props.onLogout}>‹ <span>大厅</span></button>
                {result && <div className="result-shade" role="dialog" aria-modal="true" aria-label="本局结算">
                    <div className="result-card">
                        <div className={`result-seal ${result.won ? 'win' : 'loss'}`}>{result.won ? '胜' : '惜'}</div>
                        <p className="result-kicker">本局结算</p>
                        <h2>{result.won ? '漂亮的一局！' : '再来一局？'}</h2>
                        <p className="result-points">{result.point > 0 ? '+' : ''}{result.point}<small> 积分</small></p>
                        <div className="result-details"><span>本局倍数 <b>×{result.multiple || 1}</b></span>{Boolean(result.spring || result.antispring) && <span>{result.spring ? '春天' : '反春天'}</span>}</div>
                        <p className="result-hint">牌桌已准备好，点击准备即可继续。</p>
                        <button className="result-primary" onClick={() => this.setState({result: null})}>再来一局</button>
                        <button className="result-secondary" onClick={this.props.onLogout}>返回大厅</button>
                    </div>
                </div>}
                <div className="rotate-notice" role="status"><div><strong>请横屏体验</strong><span>旋转手机，让牌桌完整显示</span></div></div>
            </div>
        )
    }
}

export default Game
