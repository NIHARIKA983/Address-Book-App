//declare global variable for employee payroll list
let addressbookList;

window.addEventListener('DOMContentLoaded', () => {
    addressbookList = getPersonDataFromLocalStorage();
    document.querySelector('.person-count').textContent = addressbookList.length;
    createInnerHTML();
    localStorage.removeItem('editPerson');
});
//get list of Person data from local storage
const getPersonDataFromLocalStorage = () => {
    return localStorage.getItem('AddressBookList') ?
                        JSON.parse(localStorage.getItem('AddressBookList')) : [] ;
}

//Template literal ES6 feature 
const createInnerHTML = () => {
    const headerHtml = "<th>Full Name</th><th>Address</th><th>City</th><th>State</th>"+
                       "<th>ZipCode</th><th>Phone Number</th><th>Actions</th>";
    if( addressbookList.length == 0 ) return;
    let innerHtml = `${headerHtml}`;

    for  ( const addressbookData of addressbookList) {
        innerHtml = `${innerHtml}
        <tr>
            <td>${addressbookData._name}</td>
            <td>${addressbookData._address}</td>
            <td>${addressbookData._city}</td>
            <td>${addressbookData._state}</td>
            <td>${addressbookData._zipCode}</td>
            <td>${addressbookData._phoneNumber}</td>
            <td>
                <img id="${addressbookData._id}" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
                <img id="${addressbookData._id}" alt="Edit" onclick="update(this)" src="../assets/icons/create-black-18dp.svg">
            </td>        
        </tr>
        `;
    }
    document.querySelector('#table-display').innerHTML=innerHtml;
}

// remove person details from addressbook list
const remove = (node)=> {
    let addressbookData = addressbookList.find(personData=>personData._id == node.id);
    if (!addressbookData) return;
    const index =  addressbookList
                  .map(personData=>personData._id)
                  .indexOf(addressbookData._id);
    addressbookList.splice(index,1);
    localStorage.setItem("AddressBookList",JSON.stringify(addressbookList));
    document.querySelector('.person-count').textContent = addressbookList.length;
    createInnerHTML();
}

//update person details 
const update = (node) => {
    let addressbookData = addressbookList.find(personData=>personData._id == node.id);
    if (!addressbookData) return;
    localStorage.setItem('editPerson',JSON.stringify(addressbookData));
    window.location.replace(site_properties.add_person_page);    
}