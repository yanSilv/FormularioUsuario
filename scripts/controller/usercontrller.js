class UserContrller{
    constructor(formId, tableId) {
        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);
    }

    onSubmit(){
        this.formEl.addEventListener("submit", (event) => {
            let btn = this.formEl.querySelector("[type=submit]");
            event.preventDefault();
            btn.disabled = true;
            let values = this.getValue();
            
            if (!values) {
                return false;
            }

            this.getPhoto().then(
                (content)=>{
                    values.photo = content;     
                    this.addLine(values);
                    this.formEl.reset();
                },
                (e)=>{
                    console.error(e);
                });
            btn.disabled = false;
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

            if (file) {
                fileReader.readAsDataURL(file);
            } else {
                resolve('dist/img/boxed-bg.jpg');
            }

        });
    }

    getValue() {
        
        let user = {};
        let isValid = true;

        [...this.formEl.elements].forEach(function(field, index){
            if(['name', 'email', 'password'].indexOf(field.name) > -1 && !field.value) {
                field.parentElement.classList.add('has-error');
                isValid = false;
            }

            if(field.name == 'gender') {
                if(field.checked)
                    user[field.name] = field.value;
            } else if(field.name == 'admin'){
                user[field.name] = field.checked;
            } else {
                user[field.name] = field.value;
            }
        });

        if (!isValid) {
            return false;
        }
        return new User(user.name,
                            user.gender, 
                            user.dateBirth, 
                            user.country, 
                            user.email, 
                            user.password, 
                            user.admin, 
                            user.photo);
    }

    addLine(dataUser){
        
        let tr = document.createElement('tr');
         tr.dataset.user = JSON.stringify(dataUser);
         tr.innerHTML= `
            
            <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${(dataUser.admin)?'Sim':'Não'}</td>
            <td>${Utils.dateFormat(dataUser.register)}</td>
            <td>
                <button type="button" class="btn-edit btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
           
        `;

        tr.querySelector(".btn-edit").addEventListener("click", e=>{

            let json = JSON.parse(tr.dataset.user);
            let form = document.querySelector("#form-user-update");

            for(let name in json) {
                let field = form.querySelector("[name="+name.replace("_", "")+"]");

                if (field) {
                    switch(field.type) {
                        case 'file':
                            continue;
                        break;
                        case 'radio':
                            field = form.querySelector("[name="+name.replace("_", "")+"][value="+json[name]+"]");
                            field.checked = true;
                        break;
                        case 'checkbox':
                            field.checked = json[name];
                        break;
                        default:
                            console.log(field.value +"  "+json[name]);
                            field.value = json[name];
                    }
                }
            }
            document.querySelector("#box-user-create").style.display = "none";
            document.querySelector("#box-user-update").style.display = "block";

        });
        
        this.tableEl.appendChild(tr);
        this.updateCount();
    }

    updateCount() {
        let numberUser = 0;
        let numberAdmin = 0;
        
        [...this.tableEl.children].forEach(tr=>{
            numberUser++;
            let user = JSON.parse(tr.dataset.user);
            if(user._admin) {
                numberAdmin++;
            }

        });

        document.querySelector("#number-users").innerHTML = numberUser;
        document.querySelector("#number-users-admin").innerHTML = numberAdmin;
    }
}