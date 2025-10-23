import { createSignal } from "solid-js";
import "./MyAuthForm.css";

interface Props {
    message: string;
    number: number;
}

function MegaComponent(props: Props) {
    const [text, setText] = createSignal("Это сигнал");
    const myNumber: number = 42;
    const myString: string = "ппп";
    const myBool: boolean = false;

    return (
        <div class="my-div">
            <form>
                <p class="my-p"> {props.message}</p>
                <p>{props.number}</p>

                <p>{myString}</p>
                <p>{myNumber}</p>
                <p>{myBool ? "Да" : "Нет"}</p>

                <p>{text()}</p>

                <input
                    type="text"
                    onInput={(e) => setText(e.currentTarget.value)}
                    placeholder="введи текст"
                />
                <button type="button" onClick={() => setText("Сброшено")}>
                    Сбросить
                </button>
            </form>

        </div>
    );
}

export default MegaComponent;
