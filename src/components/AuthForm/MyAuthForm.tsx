import {createSignal} from "solid-js"
import './MyAuthForm.css'

interface Props {
    message:string
}

function MyAuthForm(props: Props) {
    const [text, ] = createSignal('вход в аккаунт')
    const [email, setEmail] = createSignal('')
    const [password, setPassword] = createSignal('')
    console.log(props.message)
    return (
        <div class='my-div'>

            <form>
                <h2 class='my-p'>
                    {text()}
                </h2>
                <p>ваша почта: {email()}</p>
                <input onInput={(e) => setEmail(e.currentTarget.value)} type="email" name='email' placeholder='введите почту'/>
                <p>ваш пароль: {password()}</p>
                <input onInput={(e) => setPassword(e.currentTarget.value)} type='password' name='password' placeholder='введите пароль' />
                <input class= 'submit-btn' type="submit"/>
            </form>
        </div>
    )
}

export default MyAuthForm