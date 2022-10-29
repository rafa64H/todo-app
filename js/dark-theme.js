export {changeTheme, verifyTheme}

import { toDoListItemsMaker } from "./main.js"

const body = document.querySelector('body')

const header = document.querySelector('header')

const listInputDiv = document.querySelector('.list-input')

const listInputTag = document.querySelector('.list-input__tag')

const listContainer = document.querySelector('.list-container')

const listBottomLiLeft = document.querySelector('.list-bottom-li-left')

const clearCompletedBtn = document.querySelector('.clear-completed')

const bottomFilters2 = document.querySelector('.bottom-filters--2')

const endParagraph = document.querySelector('.end-paragraph')

const footer = document.querySelector('footer')

const footerP = document.querySelector('.footer__p')



const listItems = document.querySelectorAll('.list-item')

const listItemsText = document.querySelectorAll('.list-item__text')

const circleShapes = document.querySelectorAll('.circle-shape')

const filterBtns = document.querySelectorAll('.filter-btns')

const footerLinks = document.querySelectorAll('.footer__link')

let verifyTheme = body.getAttribute('data-verify-theme')




function changeTheme(changeThemeButton){
    
    if(verifyTheme === 'dark'){
        delete changeThemeButton.dataset.changeThemeBtnDarkTheme 
        delete body.dataset.bodyDarkTheme 
        delete header.dataset.headerDarkTheme 
        delete listInputDiv.dataset.listInputDarkTheme 
        delete listInputTag.dataset.listInputTagDarkTheme 

        delete listContainer.dataset.listContainerDarkTheme
        
        toDoListItemsMaker.setLightTheme()

        delete listBottomLiLeft.dataset.listBottomItemsLeftDarkTheme 

        delete clearCompletedBtn.dataset.clearCompletedDarkTheme 

        delete bottomFilters2.dataset.bottomFiltersTwoDarkTheme 

        filterBtns.forEach( filterBtn =>{
            delete filterBtn.dataset.filterBtnsDarkTheme 
        })

        delete endParagraph.dataset.endParagraphDarkTheme 

        delete footer.dataset.footerDarkTheme 

        delete footerP.dataset.footerParagraphDarkTheme 

        footerLinks.forEach( footerLink =>{
            delete footerLink.dataset.footerLinkDarkTheme 
        })

        verifyTheme = 'light'

    }else{
        changeThemeButton.dataset.changeThemeBtnDarkTheme = true
        body.dataset.bodyDarkTheme = true
        header.dataset.headerDarkTheme = true
        listInputDiv.dataset.listInputDarkTheme = true
        listInputTag.dataset.listInputTagDarkTheme = true
        
        listContainer.dataset.listContainerDarkTheme = true

        toDoListItemsMaker.setDarkTheme()

        listBottomLiLeft.dataset.listBottomItemsLeftDarkTheme = true

        clearCompletedBtn.dataset.clearCompletedDarkTheme = true

        bottomFilters2.dataset.bottomFiltersTwoDarkTheme = true

        filterBtns.forEach( filterBtn =>{
            filterBtn.dataset.filterBtnsDarkTheme = true
        })

        endParagraph.dataset.endParagraphDarkTheme = true

        footer.dataset.footerDarkTheme = true

        footerP.dataset.footerParagraphDarkTheme = true

        footerLinks.forEach( footerLink =>{
            footerLink.dataset.footerLinkDarkTheme = true
        })

        verifyTheme = 'dark'
        
    }
}
