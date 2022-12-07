const contactName = document.getElementById('contactName'),
    contactTel = document.getElementById('contactTel'),
    phoneModel = document.getElementById('phoneModel'),
    addContact = document.getElementById('addContact'),
    contacts__list = document.getElementById('contacts__list'),
    searchName = document.getElementById('searchName'),
    searchModel = document.getElementById('searchModel');


const contact = {
    getItem() {
        const datas = JSON.parse(localStorage.getItem("contacts"))
        console.log(datas);
        return datas;

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
            id: Date.now().toString(36)
        }

        this.setItem(newContact);
    },

    searchItem() {
        const searchExp = searchModel.value.toLowerCase();
        const matchedData = this.getItem().filter(value => value.name.toLowerCase().search(searchExp) >= 0)
        showTable(matchedData);

    },
    removeItem(id) {
        const data = this.getItem();
        const newData = data && data.filter(item => item.id !== id)
        localStorage.setItem("contacts", JSON.stringify(newData))
        showList()
    },
    editItem(id, newText) {
        const data = this.getData()
        const newData = data.map(item => {
            if (item.id === id) {
                return {...item, text: newText }
            } else {
                return {...item }
            }
        })

        localStorage.setItem("contacts", JSON.stringify(newData))
        showList()
    }
}
const showList = () => {
    contacts__list.innerHTML = "";

    const contactData = contact.getItem();

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
                <button id="delete" class="contact_btn">حذف</button>
                <button id="edit" class="contact_btn">ویرایش</button>
            </div>
        </li>`
            contacts__list.appendChild(datalistItem)
        });
    }
}

addContact.addEventListener('click', function() {
    contact.addItem(contactName.value, contactTel.value, phoneModel.value);
})