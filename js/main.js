export {toDoListItemsMaker}

import { changeTheme } from "./dark-theme.js"
import { ListItemsMaker } from "./class.js"

const changeThemeButton = document.querySelector('.change-theme-btn')

changeThemeButton.addEventListener('click', () =>{
    changeTheme(changeThemeButton)
})


/*>>Creating list from class */
const toDoList = document.querySelector('.todo-list')
const textWhenThereIsNoItems = document.querySelector('.list-item--empty')
const toDoListLiChildren = document.querySelectorAll('.list-item:not(.list-item--empty)')

const toDoListItemsMaker = new ListItemsMaker(toDoList, textWhenThereIsNoItems, toDoListLiChildren)
/*Creating list from class<<*/


/*>>Programming the input of text*/
const listInputTag = document.querySelector('.list-input__tag')
let removeListItemsButtons = toDoListItemsMaker.getTheRemoveButtons


listInputTag.addEventListener('keypress', (e) => {
    if(e.key === 'Enter'){

        if(listInputTag.value === null || listInputTag.value === undefined || listInputTag.value === ''){
            
        }else{
            toDoListItemsMaker.createListItem(listInputTag.value)

            listInputTag.value = null

            removeListItemsButtons = toDoListItemsMaker.getTheRemoveButtons
            removeListItemsButtons.forEach(removeListItemsButton => {
    
                removeListItemsButton.addEventListener('click', (e) =>{
                    toDoListItemsMaker.removeListItem(e.target)
                })
            
            });
        }

        
    }
})
/*Programming the input of text<<*/


