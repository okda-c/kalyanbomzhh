import {  onMount } from 'solid-js'


import './App.css'

import Profile from "./components/Profile/Profile.tsx";



function App() {















  // Обработчик выхода


  // Слушатели событий от Alt:V клиента
  onMount(() => {
    // @ts-ignore - Alt:V API
    if (typeof alt !== 'undefined') {
      // Получение списка персонажей после авторизации


      // Добавление нового персонажа после создания


      // Переход к созданию персонажа


      // Успешный вход в игру

    }
  })

  return (
    <div class="app">

      

          <Profile name={'Vova'} age={78} hobby={'Russia'} isOnline={true} respects={100000}/>

    </div>
  )
}

export default App