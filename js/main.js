export {toDoListItemsMaker}

import { changeTheme, verifyTheme} from "./dark-theme.js"
import { ListItemsMaker } from "./class.js"

const changeThemeButton = document.querySelector('.change-theme-btn')

changeThemeButton.addEventListener('click', () =>{
    changeTheme(changeThemeButton)
})


/*>>Creating list from class */
const toDoList = document.querySelector('.todo-list')
const textWhenThereIsNoItems = document.querySelector('.list-item--empty')

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


/*>>Hovering on list items*/

let mq = window.matchMedia('(min-width: 50em)')

if(mq.matches){

    toDoList.addEventListener('mouseover', (e) => {

        let target = e.target

        if(target.matches('.list-item:not(.list-item--empty)')){
            let otherItemsInTheLi = [...target.children]
            let targetCheckButton = otherItemsInTheLi[0]
            let targetRemoveButton = otherItemsInTheLi[2]

            targetCheckButton.dataset.btnHovering = true
            targetRemoveButton.dataset.removeBtnHover = true
        }
    })

    toDoList.addEventListener('mouseout', (e) => {
        let target = e.target
        let relatedTarget = e.relatedTarget

        let mouseOutTheLiAndEntersBody = 
        target.matches('.list-item:not(.list-item--empty)') && relatedTarget.matches('body')

        let mouseOutTheLiAndEntersHeader = 
        target.matches('.list-item:not(.list-item--empty)') && relatedTarget.matches('header')

        let mouseOutTheLiAndEntersAnotherLi = 
        target.matches('.list-item:not(.list-item--empty)') && relatedTarget.matches('.list-item:not(.list-item--empty)')

        let mouseOutTheLiAndEntersListBottom =
        target.matches('.list-item:not(.list-item--empty)') && relatedTarget.matches('.list-container-bottom')

        if(mouseOutTheLiAndEntersBody || mouseOutTheLiAndEntersHeader || 
           mouseOutTheLiAndEntersAnotherLi || mouseOutTheLiAndEntersListBottom) {
            let otherItemsInTheLi = [...target.children]
            let targetCheckButton = otherItemsInTheLi[0]
            let targetRemoveButton = otherItemsInTheLi[2]

            delete targetCheckButton.dataset.btnHovering
            delete targetRemoveButton.dataset.removeBtnHover

        }
    })

}


toDoList.addEventListener('click', (e) => {

    let target = e.target

    let otherItemsInTheLi = [...target.closest('li').children]
    let targetListItem = target.closest('li')
    let targetCheckButton = otherItemsInTheLi[0]
    let targetText = otherItemsInTheLi[1]

    let targetMatchesLi = target.matches('.list-item:not(.list-item--empty')
    let targetMatchesCheckButton = target.matches('.circle-shape--li')
    let targetMatchesText = target.matches('.list-item__text')
    let targetLiIsNotTheEmptyText = !target.closest('li').classList.contains('list-item--empty')

    if(targetMatchesLi || ((targetMatchesCheckButton || targetMatchesText) & targetLiIsNotTheEmptyText)){

        if(targetCheckButton.dataset.btnCompleted){
            toDoListItemsMaker.unCheckListItem(targetListItem, targetCheckButton, targetText)
            
        }else{
            toDoListItemsMaker.checkListItem(targetListItem, targetCheckButton, targetText)
        }
    }
})

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

const clearCompletedBtn = document.querySelector('.clear-completed')

clearCompletedBtn.addEventListener('click', () => {
    toDoListItemsMaker.clearCompleted()
})