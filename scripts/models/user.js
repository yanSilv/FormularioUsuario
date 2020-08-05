class User {
    constructor(name, gender, dateBirth, country, email, pass, admin, photo) {
       this._name = name;
       this._gender = gender;
       this._dateBirth = dateBirth;
       this._country = country;
       this._email = email;
       this._pass = pass;
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

    get pass() {
        return this._pass;
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