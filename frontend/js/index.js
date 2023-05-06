import {addTransaction, getTransaction} from './helpers/Transaction.js';
import {addCategory, getCategory, getAccount, SwitchRadiobuttons} from './helpers/Category.js';

SwitchRadiobuttons();
getAccount();
getTransaction();
getCategory();

$(".addTransaction").on("click", (e)=>{
    e.preventDefault();
    addTransaction();
})

$(".category button").on("click", (e)=>{
    e.preventDefault();
    addCategory();
})