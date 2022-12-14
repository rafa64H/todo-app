export {toDoListItemsMaker}

import { changeTheme} from "./dark-theme.js"
import { ListItemsMaker } from "./class.js"

const changeThemeButton = document.querySelector('.change-theme-btn')

changeThemeButton.addEventListener('click', () =>{
    changeTheme(changeThemeButton)
})


/*>>Creating list from class */
const toDoList = document.querySelector('.todo-list')
const textWhenThereIsNoItems = toDoList.querySelector('.list-item--empty')

const toDoListItemsMaker = new ListItemsMaker(toDoList, textWhenThereIsNoItems)
/*Creating list from class<<*/


/*>>Programming the input of text*/
const listInputTag = document.querySelector('.list-input__tag')

listInputTag.addEventListener('keypress', (e) => {
    if(e.key === 'Enter'){

        if(listInputTag.value === null || listInputTag.value === undefined || listInputTag.value === ''){
            
        }else{
            toDoListItemsMaker.createListItem(listInputTag.value)

            listInputTag.value = null

        }
    }
})
/*Programming the input of text<<*/


/*>>The remove button*/
toDoList.addEventListener('click', (e) => {
    let target = e.target

    if(target.matches('.list-item__remove-btn')){
        let otherItemsInTheLi = [...target.closest('li').children]
        let targetListItem = target.closest('li')
        let targetCheckButton = otherItemsInTheLi[0]
        let targetText = otherItemsInTheLi[1]
        let targetRemoveButton = otherItemsInTheLi[2]
        toDoListItemsMaker.removeListItem(targetCheckButton, targetText, targetRemoveButton,targetListItem)

    }
})
/*The remove button<<*/


/*>>Check button*/
toDoList.addEventListener('click', (e) => {

    let target = e.target

    let otherItemsInTheLi = [...target.closest('li').children]

    let targetListItem = target.closest('li')
    let targetCheckButton = otherItemsInTheLi[0]
    let targetText = otherItemsInTheLi[1]


    let targetLiIsNotTheEmptyText = !target.closest('li').classList.contains('list-item--empty')

    if(targetLiIsNotTheEmptyText){

        if(targetCheckButton.dataset.btnCompleted){
            toDoListItemsMaker.unCheckListItem(targetListItem, targetCheckButton, targetText)
            
        }else{
            toDoListItemsMaker.checkListItem(targetListItem, targetCheckButton, targetText)
        }
    }
})
/*Check button<<*/


/*>>Programming the filter buttons*/
const filterBtns = document.querySelectorAll('.filter-btns')

filterBtns.forEach(filterBtn => {
    filterBtn.addEventListener('click', (e) =>{
        let target = e.target

        if(target.matches('.filter-btns--all')){
            toDoListItemsMaker.showAllListItems(filterBtns[0], filterBtns[3])
        }
        
        else if(target.matches('.filter-btns--active')){   
            toDoListItemsMaker.showActiveListItems(filterBtns[1], filterBtns[4])
        }

        else if(target.matches('.filter-btns--completed')){
            toDoListItemsMaker.showCompletedListItems(filterBtns[2], filterBtns[5])
        }
    })
});
/*>>Programming the filter buttons<<*/


/*>>The clear completed button*/
const clearCompletedBtn = document.querySelector('.clear-completed')

clearCompletedBtn.addEventListener('click', () => {
    toDoListItemsMaker.clearCompleted()
})
/*The clear completed button<<*/