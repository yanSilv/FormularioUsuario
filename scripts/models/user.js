class User {
    constructor(name, gender, dateBirth, country, email, password, admin, photo) {
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
}