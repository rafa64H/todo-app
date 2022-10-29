export {ListItemsMaker}

import { verifyTheme } from "./dark-theme.js"

class ListItemsMaker {
    constructor(ulElement, emptyText, liChildren){
        this._list = ulElement
        this._listItems = []
        this._checkButtons = []
        this._listItemsText = []
        this._removeButtons = []
        this._verifyThereIsNoItems = liChildren
        this._noItemsText = emptyText
    
        this._removeEmptyText = () =>{
            if(this._verifyThereIsNoItems.length === 0){
                this._noItemsText.style.display = 'block'
            }else{
                this._noItemsText.style.display = 'none'
            }
        }

        

    }

    createListItem(text){
        const li = document.createElement('li')
        li.classList.add('list-item')
        this._listItems.push(li)

        const buttonCheck = document.createElement('button')
        buttonCheck.classList.add('circle-shape', 'circle-shape--li')
        this._checkButtons.push(buttonCheck)

        const listText = document.createElement('p')
        listText.classList.add('list-item__text')
        listText.textContent = text
        this._listItemsText.push(listText)

        const buttonRemove = document.createElement('button')
        buttonRemove.classList.add('list-item__remove-btn')
        this._removeButtons.push(buttonRemove)

        if(verifyTheme === 'dark'){

            this.setDarkTheme()

            this._list.appendChild(li)

            li.appendChild(buttonCheck)
            li.appendChild(listText)
            li.appendChild(buttonRemove)
            
            this._verifyThereIsNoItems = document.querySelectorAll('.list-item:not(.list-item--empty)')
            this._removeEmptyText()

        }else{
            this._list.appendChild(li)

            li.appendChild(buttonCheck)
            li.appendChild(listText)
            li.appendChild(buttonRemove)
            
            this._verifyThereIsNoItems = document.querySelectorAll('.list-item:not(.list-item--empty)')
            this._removeEmptyText()
        }


    }

    removeListItem(buttonRemove){
        this._removeButtons.shift(buttonRemove)

        buttonRemove.closest('.list-item').remove()

        this._verifyThereIsNoItems = document.querySelectorAll('.list-item:not(.list-item--empty)')
        this._removeEmptyText()
    }

    setDarkTheme(){
        this._listItems.forEach(listItem => {
            listItem.dataset.listItemDarkTheme  = true
        });

        this._checkButtons.forEach(checkButton => {
            checkButton.dataset.circleShapeDarkTheme = true
        });

        this._listItemsText.forEach(listItemText => {
            listItemText.dataset.listItemTextDarkTheme = true
        });
    }

    setLightTheme(){
        this._listItems.forEach(listItem => {
            delete listItem.dataset.listItemDarkTheme
        });

        this._checkButtons.forEach(checkButton => {
            delete checkButton.dataset.circleShapeDarkTheme
        });

        this._listItemsText.forEach(listItemText => {
            delete listItemText.dataset.listItemTextDarkTheme
        });
    }

    get getTheRemoveButtons(){
        return this._removeButtons
    }
}