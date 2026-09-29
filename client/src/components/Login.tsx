import React from 'react'
import './Login.css'
import {getApiUrl} from '../game/server'

interface LoginProps {
    onLogin: (playerInfo: any) => void
}

interface LoginState {
    name: string
    error: string
    loading: boolean
}

// 简单的 fetch 封装 (走 CRA dev proxy 或同源)
const post = function (url: string, data: any) {
    return fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    }).then(response => {
        return response.json().then(body => {
            if (!response.ok) {
                throw new Error(body.detail || '请求失败')
            }
            return body
        })
    })
}


// 登录页: 仅需输入昵称, POST /login {name}
// 服务端会自动创建账号并返回 {uid, name, token, room, rooms}
// 将 playerInfo + token 写入 localStorage, 供 GameScene 使用
class Login extends React.Component<LoginProps, LoginState> {

    constructor(props: LoginProps) {
        super(props)
        this.state = {
            name: '',
            error: '',
            loading: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({name: event.target.value, error: ''})
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const name = this.state.name.trim()
        if (!name) {
            this.setState({error: '请输入用户名'})
            return
        }
        this.setState({loading: true, error: ''})
        post(getApiUrl('/login'), {name})
            .then(response => {
                // 持久化登录态
                localStorage.setItem('token', response.token || '')
                localStorage.setItem('playerInfo', JSON.stringify({
                    uid: response.uid,
                    name: response.name,
                    sex: response.sex,
                    avatar: response.avatar,
                    point: response.point,
                }))
                window.playerInfo = response
                this.props.onLogin(response)
            })
            .catch(err => {
                this.setState({error: err.message || '登录失败', loading: false})
            })
    }

    render() {
        const {name, error, loading} = this.state
        return (
            <div className="content login-card">
                <div className="login-emblem">牌</div>
                <p className="login-eyebrow">YOUR TABLE IS READY</p>
                <h1 className="login-head">欢迎来到牌友会</h1>
                <p className="login-subtitle">输入一个昵称，立刻加入牌局。</p>
                <form className="login-form" onSubmit={this.handleSubmit}>
                    <label htmlFor="guest-name">你的牌桌昵称</label>
                    <input
                        id="guest-name"
                        type="text"
                        name="name"
                        value={name}
                        onChange={this.handleChange}
                        placeholder="例如：小明"
                        disabled={loading}
                        required
                        autoFocus
                    />
                    {error && <div className="login-error" role="alert">{error}</div>}
                    <input
                        type="submit"
                        className="submit"
                        value={loading ? '正在进入…' : '游客登录 · 进入大厅'}
                        disabled={loading}
                    />
                </form>
                <p className="guest-note">游客模式 · 无需注册，昵称仅用于牌桌显示</p>
            </div>
        )
    }

}

export default Login
export {Login}
