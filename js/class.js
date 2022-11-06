export {ListItemsMaker}

import { verifyTheme } from "./dark-theme.js"

class ListItemsMaker {
    constructor(ulElement, emptyText){
        this.list = ulElement
        this._listItems = this.list.querySelectorAll('.list-item:not(.list-item--empty)')
        this._checkButtons = this.list.querySelectorAll('.circle-shape--li')
        this._listItemsText = this.list.querySelectorAll('.list-item__text')
        this._removeButtons = this.list.querySelectorAll('.list-item__remove-btn')

        this._listItemsCompleted = this.list.querySelectorAll('[data-completed]')
        this._listItemsActive = this.list.querySelectorAll('.list-item:not(.list-item--empty):not([data-completed])')

        this._listItemsTextCompleted = this.list.querySelectorAll('[data-text-completed]')
        this._listItemsTextCompletedDarkTheme = this.list.querySelectorAll('[data-text-completed-dark-theme]')


        this.noItemsText = emptyText
    }

    hideEmptyText = () =>{
        if(this._listItems.length === 0){
            this.noItemsText.style.display = 'block'
        }else{
            this.noItemsText.style.display = 'none'
        }
    }

    createListItem(text){
        const li = document.createElement('li')
        li.classList.add('list-item')

        const buttonCheck = document.createElement('button')
        buttonCheck.classList.add('circle-shape', 'circle-shape--li')

        const listText = document.createElement('p')
        listText.classList.add('list-item__text')
        listText.textContent = text

        const buttonRemove = document.createElement('button')
        buttonRemove.classList.add('list-item__remove-btn')

        this.list.appendChild(li)

        li.appendChild(buttonCheck)
        li.appendChild(listText)
        li.appendChild(buttonRemove)

        /*This kind of code is to update the variables*/
        this._listItems = this.list.querySelectorAll('.list-item:not(.list-item--empty)')
        this._listItemsActive = this.list.querySelectorAll('.list-item:not(.list-item--empty):not([data-completed])')
        this._checkButtons = this.list.querySelectorAll('.circle-shape--li')
        this._listItemsText = this.list.querySelectorAll('.list-item__text')
        this._removeButtons = this.list.querySelectorAll('.list-item__remove-btn')

        this.hideEmptyText()

        if(verifyTheme === 'dark'){
            this.setDarkTheme()
        }

        this.updateItemsLeftMessage()
    }

    removeListItem(buttonRemove){

        buttonRemove.closest('.list-item').remove()

        this._listItems = this.list.querySelectorAll('.list-item:not(.list-item--empty)')
        this._listItemsActive = this.list.querySelectorAll('.list-item:not(.list-item--empty):not([data-completed])')
        this._checkButtons = this.list.querySelectorAll('.circle-shape--li')
        this._listItemsText = this.list.querySelectorAll('.list-item__text')
        this._removeButtons = this.list.querySelectorAll('.list-item__remove-btn')

        this._listItemsCompleted = this.list.querySelectorAll('[data-completed]')
        this._listItemsActive = this.list.querySelectorAll('.list-item:not(.list-item--empty):not([data-completed])')

        this._listItemsTextCompleted = this.list.querySelectorAll('[data-text-completed]')
        this._listItemsTextCompletedDarkTheme = this.list.querySelectorAll('[data-text-completed-dark-theme]')

        this.hideEmptyText()
        this.updateItemsLeftMessage()
    }

    setDarkTheme(){

        this.noItemsText.dataset.listItemDarkTheme = true

        this._listItems.forEach(listItem => {
            listItem.dataset.listItemDarkTheme  = true
        });

        this._checkButtons.forEach(checkButton => {
            checkButton.dataset.circleShapeDarkTheme = true
        });

        this._listItemsText.forEach(listItemText => {
            listItemText.dataset.listItemTextDarkTheme = true
        });

        this._listItemsTextCompleted.forEach(listItemTextCompleted =>{
            delete listItemTextCompleted.dataset.textCompleted
            listItemTextCompleted.dataset.textCompletedDarkTheme = true
        })
    }

    setLightTheme(){

        delete this.noItemsText.dataset.listItemDarkTheme

        this._listItems.forEach(listItem => {
            delete listItem.dataset.listItemDarkTheme
        });

        this._checkButtons.forEach(checkButton => {
            delete checkButton.dataset.circleShapeDarkTheme
        });

        this._listItemsText.forEach(listItemText => {
            delete listItemText.dataset.listItemTextDarkTheme
        });
        
        this._listItemsTextCompletedDarkTheme.forEach(listItemTextCompletedDarkTheme =>{
            delete listItemTextCompletedDarkTheme.dataset.textCompletedDarkTheme
            listItemTextCompletedDarkTheme.dataset.textCompleted =true
        })

    }

    checkListItem(listItem, checkButton, listItemText){
        checkButton.dataset.btnCompleted = true
        listItem.dataset.completed = true
        
        this._listItemsCompleted = this.list.querySelectorAll('[data-completed]')
        this._listItemsActive = this.list.querySelectorAll('.list-item:not(.list-item--empty):not([data-completed])')

        if(verifyTheme=== 'dark'){
            listItemText.dataset.textCompletedDarkTheme = true
        }else{
            listItemText.dataset.textCompleted = true
        }

        this._listItemsTextCompleted = this.list.querySelectorAll('[data-text-completed]')
        this._listItemsTextCompletedDarkTheme = this.list.querySelectorAll('[data-text-completed-dark-theme]')

        this.updateItemsLeftMessage()
    }

    unCheckListItem(listItem, checkButton, listItemText){
        delete checkButton.dataset.btnCompleted
        delete listItem.dataset.completed

        this._listItemsCompleted = this.list.querySelectorAll('[data-completed]')
        this._listItemsActive = this.list.querySelectorAll('.list-item:not(.list-item--empty):not([data-completed])')

        if(verifyTheme=== 'dark'){
            delete listItemText.dataset.textCompletedDarkTheme
        }else{
            delete listItemText.dataset.textCompleted
        }

        this._listItemsTextCompleted = this.list.querySelectorAll('[data-text-completed]')
        this._listItemsTextCompletedDarkTheme = this.list.querySelectorAll('[data-text-completed-dark-theme]')

        this.updateItemsLeftMessage()
    }

    showAllListItems(filterBtnAll1, filterBtnAll2){

        this.hideEmptyText()

        this._listItems.forEach(listItem => {
            listItem.style.display = 'flex'
        });

        let currentActiveBtns= document.querySelectorAll('[data-filter-active]')

        currentActiveBtns.forEach(currentActiveBtn => {
            delete currentActiveBtn.dataset.filterActive
        });

        filterBtnAll1.dataset.filterActive = true
        filterBtnAll2.dataset.filterActive = true
    }

    showActiveListItems(filterBtnActive1, filterBtnActive2){

        this.noItemsText.style.display = 'none'

        this._listItemsCompleted.forEach(listItemCompleted => {
            listItemCompleted.style.display = 'none'
        });

        this._listItemsActive.forEach(listItemActive => {
            listItemActive.style.display = 'flex'
        });

        if(this._listItemsActive.length === 0){
            this.noItemsText.style.display = 'block'
        }

        let currentActiveBtns= document.querySelectorAll('[data-filter-active]')

        currentActiveBtns.forEach(currentActiveBtn => {
            delete currentActiveBtn.dataset.filterActive
        });

        filterBtnActive1.dataset.filterActive = true
        filterBtnActive2.dataset.filterActive = true
    }

    showCompletedListItems(filterBtnCompleted1, filterBtnCompleted2){

        this.noItemsText.style.display = 'none'

        this._listItemsActive.forEach(listItemActive => {
            listItemActive.style.display = 'none'
        });

        this._listItemsCompleted.forEach(listItemCompleted => {
            listItemCompleted.style.display = 'flex'
        });

        if(this._listItemsCompleted.length === 0){
            this.noItemsText.style.display = 'block'
        }

        let currentActiveBtns= document.querySelectorAll('[data-filter-active]')

        currentActiveBtns.forEach(currentActiveBtn => {
            delete currentActiveBtn.dataset.filterActive
        });

        filterBtnCompleted1.dataset.filterActive = true
        filterBtnCompleted2.dataset.filterActive = true
    }

    clearCompleted(){
        this._listItemsCompleted.forEach(listItemCompleted =>{
            listItemCompleted.remove()
        })

        this._listItems = this.list.querySelectorAll('.list-item:not(.list-item--empty)')
        this._checkButtons = this.list.querySelectorAll('.circle-shape--li')
        this._listItemsText = this.list.querySelectorAll('.list-item__text')
        this._removeButtons = this.list.querySelectorAll('.list-item__remove-btn')

        this._listItemsCompleted = this.list.querySelectorAll('[data-completed]')
        this._listItemsActive = this.list.querySelectorAll('.list-item:not(.list-item--empty):not([data-completed])')

        this._listItemsTextCompleted = this.list.querySelectorAll('[data-text-completed]')
        this._listItemsTextCompletedDarkTheme = this.list.querySelectorAll('[data-text-completed-dark-theme]')

        this.hideEmptyText()
    }

    updateItemsLeftMessage(){

        const listItemsLeftParagraph = document.querySelector('.list-bottom-li-left')

        listItemsLeftParagraph.textContent = this._listItemsActive.length + ' items left'

    }

}