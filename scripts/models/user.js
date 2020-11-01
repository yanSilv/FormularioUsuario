class User {
    constructor(name, gender, dateBirth, country, email, password, admin, photo) {
       this._id;
       this._name = name;
       this._gender = gender;
       this._dateBirth = dateBirth;
       this._country = country;
       this._email = email;
       this._password = password;
       this._admin = admin;
       this._photo = photo;
       this._register = new Date(); 
    }

    set id(value) {
        this._id = value;
    }

    get id() {
        return this._id;
    }

    get register () {
        return this._register;
    }

    get name() {
        return this._name;
    }

    get gender() {
        return this._gender;
    }

    get dateBirth () {
        return this._dateBirth;
    }

    get country() {
        return this._country;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }

    get admin() {
        return this._admin;
    }

    get photo() {
        return this._photo;
    }

    set photo(value) {
        this._photo = value;
    }

    loadFromJSON(json) {
        for (let name in json) {
            switch(name) {
                case '_register':
                    this[name] = new Date(json[name]);
                break;
                default:
                    this[name] = json[name];
            }
        }
    }

    getSessionStorage() {
        let users = [];
        if (localStorage.getItem("users")) {
            users = JSON.parse(localStorage.getItem("users"));
        }

        return users;
    }

    getNewID() {
        if (!window.id) {
            window.id = 0;
        }

        window.id++;

        return window.id;
            
    }

    save() {
        let users = this.getSessionStorage();
        
        if (this.id > 0 ) {
            users.map(u=>{
                if(u._id === this.id) {
                    Object.assign(u, this);
                }
            });
        } else {
            this.id = this.getNewID();
            users.push(this);
        }
        localStorage.setItem("users", JSON.stringify(users));

    }
}