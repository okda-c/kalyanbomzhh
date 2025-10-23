import { createSignal, onMount, onCleanup, For } from 'solid-js'
import './Profile.css'
import pauk from '../../assets/pauk.png'

interface Props {
    name: string
    age: number
    hobby: string
    isOnline: boolean
    respects: number
}

type Spider = {
    id: number
    left: number      // % от ширины экрана
    size: number      // px ширина картинки
    duration: number  // сек, длительность анимации
    delay: number     // сек, задержка старта
    opacity: number
}

function Profile(props: Props) {
    const [name, ] = createSignal(props.name)
    const [age, ] = createSignal(props.age)
    const [hobby, ] = createSignal(props.hobby)
    const [respects, setRespects] = createSignal(props.respects)

    const getStatusInfo = () => {
        if (props.isOnline === true) {
            return { icon: '🟢', text: 'В сети', class: 'online' }
        } else {
            return { icon: '🔴', text: 'Не в сети', class: 'offline' }
        }
    }

    const status = getStatusInfo()

    // ---- СПАЙДЕРЫ ----
    const [spiders, setSpiders] = createSignal<Spider[]>([])
    let timer: number | undefined
    let idCounter = 0

    const spawn = () => {
        // за один тик спавним 1–3 паука
        const count = Math.floor(Math.random() * 3) + 1
        const batch: Spider[] = Array.from({ length: count }).map(() => {
            const id = ++idCounter
            return {
                id,
                left: Math.random() * 100,                        // 0–100%
                size: 24 + Math.round(Math.random() * 56),        // 24–80px
                duration: 4 + Math.random() * 7,                  // 4–11s
                delay: Math.random() * 1.2,                       // 0–1.2s
                opacity: 0.7 + Math.random() * 0.3                // 0.7–1
            }
        })
        setSpiders(prev => [...prev, ...batch])

        // авточистка после завершения анимации каждого
        batch.forEach(s => {
            const life = (s.duration + s.delay) * 1000 + 300
            setTimeout(() => setSpiders(prev => prev.filter(p => p.id !== s.id)), life)
        })
    }

    onMount(() => {
        const tick = () => {
            spawn()
            // следующий спавн через 0.5–1.7с
            timer = window.setTimeout(tick, 500 + Math.random() * 1200)
        }
        tick()
    })

    onCleanup(() => {
        if (timer) clearTimeout(timer)
    })

    return (
        <div class='my-pf'>
            {/* ПОЛЕ ДЛЯ ПАУКОВ (оверлей поверх всего) */}
            <div class='spider-field'>
                <For each={spiders()}>
                    {(s) => (
                        <img
                            src={pauk}
                            alt=""
                            class="spider"
                            style={{
                                left: `${s.left}%`,
                                width: `${s.size}px`,
                                opacity: s.opacity.toString(),
                                'animation-duration': `${s.duration}s`,
                                'animation-delay': `${s.delay}s`
                            }}
                        />
                    )}
                </For>
            </div>

            <div class='profile-container'>
                <div class='kalyan bg-image'></div>
                <div class='profile'>
                    <h2 class='profile-title'>🚷Профиль🚷</h2>
                    <h2 class='profile-title2'>🚷пользователя🚷</h2>
                    <hr/>
                    <img class='profile-icon' src={pauk}/>
                    <p class='profile-text'>👾 <strong>Имя:</strong> {name()}</p>
                    <p class='profile-text'>🦈 <strong>Возраст:</strong> {age()}</p>
                    <p class='profile-text'>🕸️ <strong>Хобби:</strong> {hobby()}</p>

                    <div class='respect-sect'>
                        <div class='rs-count'>🕸️респекты: {respects()}</div>
                        <input
                            type='button'
                            onClick={() => setRespects(respects() + 1)}
                            value={'🖤кинуть респект'}
                            class='rs-btn'
                        />
                    </div>

                    <div class={status.class}>
                        <span class='status-icon' style='margin-right: 5px'>{status.icon}</span>
                        <span class='status-text'>{status.text}</span>
                    </div>
                </div>
                <div class='bomzh bg-image'></div>
            </div>
        </div>
    )
}

export default Profile
