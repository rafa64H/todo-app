import { changeTheme } from "./dark-theme.js"


const changeThemeButton = document.querySelector('.change-theme-btn')

changeThemeButton.addEventListener('click', () =>{
    changeTheme(changeThemeButton)
})

