class UserContrller{
    constructor(formId, tableId) {
        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);
    }

    onSubmit(){
        this.formEl.addEventListener("submit", (event) => {
            event.preventDefault();
            let values = this.getValue();
            
            this.getPhoto().then(
                (content)=>{
                    values.photo = content;     
                    this.addLine(values);
                },
                (e)=>{
                    console.error(e);
                });
        });
    }

    getPhoto(){
        return new Promise ((resolve, reject)=>{
            let fileReader = new FileReader();
    
            let element = [...this.formEl.elements].filter(item => {
                if (item.name === 'photo') {
                    return item;
                }
            });
            
            let file = element[0].files[0];
    
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
    
            fileReader.onerror = (e) => {
                reject(e);
            }

            fileReader.readAsDataURL(file);
        });
    }

    getValue() {
        
        let user = {};

        [...this.formEl.elements].forEach(function(field, index){
            if(field.name == 'gender' && field.checked) {
                user[field.name] = field.value;
            } else {
                user[field.name] = field.value;
            }
        });
        return new User(user.name,
                            user.gender, 
                            user.birth, 
                            user.country, 
                            user.email, 
                            user.password, 
                            user.admin, 
                            user.photo);
    }

    addLine(dataUser){
        
        this.tableEl.innerHTML = `
            <tr>
                <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
                <td>${dataUser.name}</td>
                <td>${dataUser.email}</td>
                <td>${dataUser.admin}</td>
                <td>${dataUser.dateBirth}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                    <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                </td>
            </tr>
        `;
    }
}