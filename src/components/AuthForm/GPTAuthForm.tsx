import { createSignal } from 'solid-js'

function GPTAuthForm() {
    const [login, setLogin] = createSignal('')
    const [password, setPassword] = createSignal('')
    const [error, setError] = createSignal('')
    const [isLoading, setIsLoading] = createSignal(false)

    const handleSubmit = (e:Event) => {
        e.preventDefault()

        // Простая проверка
        if (!login() || !password()) {
            setError('Заполните логин и пароль')
            console.log("что-то пошло не так")
            return
        }

        setError('')
        setIsLoading(true)

        // Имитация запроса на сервер
        setTimeout(() => {
            console.log('Вход выполнен:', {
                login: login(),
                password: password()
            })
            setIsLoading(false)
        }, 1000)
    }

    //setLogin("test")

    return (
        <form onSubmit={handleSubmit}>
            <h1>Вход</h1>

            <p>{login()}</p>
            <p>{password()}</p>
            <p>{isLoading()}</p>
            <p>{error()}</p>

            <input
                type="text"
                placeholder="Логин"
                value={login()}
                onInput={(e) => setLogin(e.currentTarget.value)}
            />

            <input
                type="password"
                placeholder="Пароль"
                value={password()}
                onInput={(e) => setPassword(e.currentTarget.value)}
            />

            {error() && <p style={{ color: 'red' }}>{error()}</p>}

            <button type="submit" disabled={isLoading()}>
                {isLoading() ? 'Входим...' : 'Войти'}
            </button>
        </form>
    )
}

export default GPTAuthForm
