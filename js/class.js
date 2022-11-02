export {ListItemsMaker}

import { verifyTheme } from "./dark-theme.js"
import { toDoListItemsMaker } from "./main.js"

class ListItemsMaker {
    constructor(ulElement, emptyText, liChildren){
        this._list = ulElement
        this._listItems = []
        this._checkButtons = []
        this._listItemsText = []
        this._removeButtons = []

        this._listItemsActive = []
        this._checkButtonsActive = []
        this._listItemsTextActive = []
        this._removeButtonsActive = []

        this._listItemsCompleted = []
        this._checkButtonsCompleted = []
        this._listItemsTextCompleted = []
        this._removeButtonsCompleted = []


        this.verifyThereIsNoItems = liChildren
        this.noItemsText = emptyText
    }

    hideEmptyText = () =>{
        if(this.verifyThereIsNoItems.length === 0){
            this.noItemsText.style.display = 'block'
        }else{
            this.noItemsText.style.display = 'none'
        }
    }

    createListItem(text){
        const li = document.createElement('li')
        li.classList.add('list-item')
        this._listItems.push(li)
        this._listItemsActive.push(li)

        const buttonCheck = document.createElement('button')
        buttonCheck.classList.add('circle-shape', 'circle-shape--li')
        this._checkButtons.push(buttonCheck)
        this._checkButtonsActive.push(buttonCheck)

        const listText = document.createElement('p')
        listText.classList.add('list-item__text')
        listText.textContent = text
        this._listItemsText.push(listText)
        this._listItemsTextActive.push(listText)

        const buttonRemove = document.createElement('button')
        buttonRemove.classList.add('list-item__remove-btn')
        this._removeButtons.push(buttonRemove)
        this._removeButtonsActive.push(buttonRemove)

        if(verifyTheme === 'dark'){

            this.setDarkTheme()

            this._list.appendChild(li)

            li.appendChild(buttonCheck)
            li.appendChild(listText)
            li.appendChild(buttonRemove)
            
            this.verifyThereIsNoItems = document.querySelectorAll('.list-item:not(.list-item--empty)')
            this.hideEmptyText()

        }else{
            this._list.appendChild(li)

            li.appendChild(buttonCheck)
            li.appendChild(listText)
            li.appendChild(buttonRemove)
            
            this.verifyThereIsNoItems = document.querySelectorAll('.list-item:not(.list-item--empty)')
            this.hideEmptyText()
        }


    }

    removeListItem(checkButton, listItemText, buttonRemove, listItem){
        this._checkButtons.shift(checkButton)
        this._listItemsText.shift(listItemText)
        this._removeButtons.shift(buttonRemove)
        this._listItems.shift(listItem)

        this._checkButtonsActive.shift(checkButton)
        this._listItemsTextActive.shift(listItemText)
        this._removeButtonsActive.shift(buttonRemove)
        this._listItemsActive.shift(listItem)

        this._checkButtonsCompleted.shift(checkButton)
        this._listItemsTextCompleted.shift(listItemText)
        this._removeButtonsCompleted.shift(buttonRemove)
        this._listItemsCompleted.shift(listItem)

        buttonRemove.closest('.list-item').remove()

        this.verifyThereIsNoItems = document.querySelectorAll('.list-item:not(.list-item--empty)')
        this.hideEmptyText()
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

        this._listItemsTextCompleted.forEach(listItemText => {
            delete listItemText.dataset.textCompleted
            listItemText.dataset.textCompletedDarkTheme = true
        });
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

        this._listItemsTextCompleted.forEach(listItemText => {
            delete listItemText.dataset.textCompletedDarkTheme
            listItemText.dataset.textCompleted = true
        });
        
    }

    checkListItem(listItem, checkButton, listItemText,removeButton){
        this._listItemsCompleted.push(listItem)
        this._checkButtonsCompleted.push(checkButton)
        this._listItemsTextCompleted.push(listItemText)
        this._removeButtonsCompleted.push(removeButton)

        this._listItemsActive.shift(listItem)
        this._checkButtonsActive.shift(checkButton)
        this._listItemsTextActive.shift(listItemText)
        this._removeButtonsActive.shift(removeButton)

        if(verifyTheme=== 'dark'){
            checkButton.dataset.btnCompleted = true
            listItemText.dataset.textCompletedDarkTheme = true
        }else{
            checkButton.dataset.btnCompleted = true
            listItemText.dataset.textCompleted = true
        }
    }

    unCheckListItem(listItem, checkButton, listItemText,removeButton){
        this._listItemsActive.push(listItem)
        this._checkButtonsActive.push(checkButton)
        this._listItemsTextActive.push(listItemText)
        this._removeButtonsActive.push(removeButton)

        this._listItemsCompleted.shift(listItem)
        this._checkButtonsCompleted.shift(checkButton)
        this._listItemsTextCompleted.shift(listItemText)
        this._removeButtonsCompleted.shift(removeButton)

        if(verifyTheme=== 'dark'){
            delete checkButton.dataset.btnCompleted
            delete listItemText.dataset.textCompletedDarkTheme
        }else{
            delete checkButton.dataset.btnCompleted
            delete listItemText.dataset.textCompleted
        }
    }

    get getTheListItems(){
        return this._listItems
    }

    get getTheRemoveButtons(){
        return this._removeButtons
    }

    get getTheCheckButtons(){
        return this._checkButtons
    }

    get getTheListItemsText(){
        return this._listItemsText
    }

}