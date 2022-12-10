const contactName = document.getElementById('contactName'),
    contactTel = document.getElementById('contactTel'),
    phoneModel = document.getElementById('phoneModel'),
    addContact = document.getElementById('addContact'),
    contacts__list = document.getElementById('contacts__list'),
    searchName = document.getElementById('searchName'),
    searchModel = document.getElementById('searchModel'),
    telbox = document.getElementById('telbox');

window.deleteItem = deleteItem;

const mobileRegex = /^(?:0|98|\+98|\+980|0098|098|00980)?(9\d{9})$/
const phoneRegex = /^0[0-9]{2,}[0-9]{7,}$/

let isTrueReg = false;

const contact = {
    getItem() {
        return JSON.parse(localStorage.getItem("contacts"))??[];

    },
    setItem(newUserData) {
        const newData = [...this.getItem(), newUserData];
        localStorage.setItem("contacts", JSON.stringify(newData));
        showList(newData)
    },

    addItem(name, number, modNumber) {
        const newContact = {
            name,
            number,
            modNumber,
            id: Math.floor(Math.random() *10000)
        }

        this.setItem(newContact);
    },

    removeItem(id) {
        const data = this.getItem();
        const newData = data && data.filter(item => item.id !== id)
        localStorage.setItem("contacts", JSON.stringify(newData))
        showList(newData)
    },
    editItem(id, newName,newNumber) {
        const data = this.getData()
        const newData = data.map(item => {
            if (item.id === id) {
                return {...item, name: newName, number:newNumber }
            } else {
                return {...item }
            }
        })

        localStorage.setItem("contacts", JSON.stringify(newData))
        showList(newData)
    }
}
const showList = (data) => {
    contacts__list.innerHTML = "";

    const contactData = data

    if (contactData.lenght === 0) {
        contacts__list.innerText = 'در حال حاضر نامی وجود ندارد...';

    } else {
        contactData.forEach(item => {
            const datalistItem = document.createElement('li');
            datalistItem.innerHTML = `            
            <li class="contact__item flex-sm-column flex-lg-row">
            <p>${item.name}</p>
            <p>${item.number}</p>
            <p>${item.modNumber}</p>
            <div>
                <button id="delete" class="contact_btn" onclick="deleteItem(${item.id})">حذف</button>
                <button id="edit" class="contact_btn">ویرایش</button>
            </div>
        </li>`
            contacts__list.appendChild(datalistItem)
        });
    }
}

contactTel.addEventListener('input', function() {
    if(phoneModel.value ==='1') {
        if (mobileRegex.test(contactTel.value)){
            telbox.style.border = '2px solid green';
            isTrueReg = true;
        }
        else {
            telbox.style.border = '2px solid red';
            isTrueReg = false;
        }
    }else {
        if (phoneRegex.test(contactTel.value)){
            telbox.style.border = '2px solid green';
            isTrueReg = true;
        }
        else if(!phoneRegex.test(contactTel.value)) {
            telbox.style.border = '2px solid red';
            isTrueReg = false;
        }
    }
})

addContact.addEventListener('click', function() {
    if (isTrueReg) {
        contact.addItem(contactName.value, contactTel.value, phoneModel.value);
    } else {
        alert('لطفا شماره درست را وارد بفرمایید')
    }
    contactName.innerText = "";
    contactTel.innerText = "";
})

function deleteItem (id) {
    contact.removeItem(id);
}

searchName.addEventListener('input', () => {
    const searchExp = searchName.value.toLowerCase();
    const matchedData = contact.getItem().filter(value => value.name.toLowerCase().search(searchExp) >= 0)
    showList(matchedData);
})

searchModel.addEventListener('input',() => {
    const searchExp = searchModel.value;
    if (searchExp == '1') {
        const matchedData = contact.getItem().filter(value => value.modNumber == 1)
        console.log(matchedData)
        showList(matchedData);
    }else if(searchExp == '2') {
        const matchedData = contact.getItem().filter(value => value.modNumber == 2)
        showList(matchedData);
    }else {
        showList(contact.getItem())
    }

})