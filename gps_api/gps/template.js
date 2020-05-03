function Template () {
    this.address = {
        name: undefined,
        country: undefined,
        city: undefined,
        houseNumber: undefined,
        postalCode: undefined,
    };
    this.contact  = {
        email: undefined,
        phone: undefined,
        website: undefined,
    };
    this.opening_time = undefined;
    this.distance = undefined;

};

Template.prototype.parseItem = function(item) {
    item.title != undefined ? this.address.name = item.title : this.address.name = undefined;
    item.address.countryCode != undefined ? this.address.country = item.address.countryCode : this.address.country = undefined;
    item.address.city != undefined ? this.address.city = item.address.city : this.address.city = undefined;
    item.address.street != undefined ? this.address.street = item.address.street : this.address.street = undefined;
    item.address.houseNumber != undefined ? this.address.houseNumber = item.address.houseNumber : this.address.houseNumber = undefined;
    item.address.postalCode != undefined ? this.address.postalCode = item.address.postalCode : this.address.postalCode = undefined;
    if (item.contacts != undefined && item.contacts.length > 0) {
        item.contacts[0].phone != undefined ? this.contact.phone = item.contacts[0].phone[0].value : this.contact.phone = undefined;
        item.contacts[0].www != undefined ? this.contact.website = item.contacts[0].www[0].value : this.contact.website = undefined;
        item.contacts[0].email != undefined ? this.contact.email = item.contacts[0].email[0].value : this.contact.email = undefined;
    }
    if (item.openingHours != undefined && item.openingHours.length > 0) {
        item.text != undefined ? this.opening_time = item.text : this.opening_time = undefined;
    }
    item.distance != undefined ? this.distance = item.distance : this.distance = undefined;
}

module.exports = Template;