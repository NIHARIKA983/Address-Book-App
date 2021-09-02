//add event listener when document gets loaded
window.addEventListener('DOMContentLoaded',()=>{
    var addressbook = new AddressBook;
    //add listener to verify name entered by user
    const name = document.querySelector('#name');console.log(name.value)
    const textError = document.querySelector('.text-error');
    name.addEventListener('input',function(){        //add listener at name input
        if(name.value.length == 0){
            textError.textContent="";
            return;
        }
        try{
            addressbook.name = name.value;
            textError.textContent = "";
        }catch(e){
            textError.textContent = e;
        }
    });

    //add listener to verify address entered by user
    const addr = document.querySelector('#address');
    const addressError = document.querySelector('.addr-error');
    addr.addEventListener('input',function(){        //add listener at address input
        if(addr.value.length == 0){
            addressError.textContent="";
            return;
        }
        try{
            addressbook.address = addr.value;
            addressError.textContent = "";
        }catch(e){
            addressError.textContent = e;
        }
    });
    //add listener to verify phone number entered by user
    const phoneNumber = document.querySelector('#phone');
    const contactError = document.querySelector('.contact-error');
    phoneNumber.addEventListener('input',function(){        //add listener at phone no input
        if(phoneNumber.value.length == 0){
            contactError.textContent="";
            return;
        }
        try{
            addressbook.phoneNumber= phoneNumber.value;
            contactError.textContent = "";
        }catch(e){
            contactError.textContent = e;
        }
    });
});

//populate & save addressbook object when submit buton is clicked
const save = ()=> {
    try{
        let addressbookData = createAddressBook();
        createAndUpdateStorage(addressbookData);
    }catch(e){
        return;
    }
}

//function to populate employee object with html form data
const createAddressBook = ()=> {
    let addressbook = new AddressBook();
    try {
        addressbook.name = getInputValueById('#name');
    }catch(e){
        setTextValue('.text-error',e);
        throw e;
    }
    try {
        addressbook.address = getInputValueById('#address');
    }catch(e){
        setTextValue('.addr-error',e);
        throw e;
    }
    addressbook.city = getInputValueById('#city');
    addressbook.state = getInputValueById('#state');
    addressbook.zipCode = getInputValueById('#zipcode');
    try {
        addressbook.phoneNumber = getInputValueById('#phone');
    }catch(e){
        setTextValue('.contact-error',e);
        throw e;
    }
    alert(addressbook.toString());
    return addressbook;
}

//function to get form values by Id
const getInputValueById = (id=>{
    let value = document.querySelector(id).value;
    return value;
});
//function to set text value
const setTextValue = (id,value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

//create and update local storage with addressbook object
function createAndUpdateStorage(addressbookData){
    let addressbookList = JSON.parse(localStorage.getItem("AddressBookList"));
    if(addressbookList != undefined){
        addressbookList.push(addressbookData);
    }else{
        addressbookList = [addressbookData];
    }
    alert(addressbookList.toString());
    localStorage.setItem("AddressBookList",JSON.stringify(addressbookList));
}