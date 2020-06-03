import hash from './hash';

export default class QrData{
    constructor(productProfile){
        this.profileId = productProfile._id,
        this.name = productProfile.name;
        this.description = productProfile.description;
        this.manufacturer = productProfile.manufacturer;
        this.dateOfManufacture = new Date();
        this.dateOfExpiry = this.getExpiryDate();
        this.UUID = this.getUUID();
    }

    getExpiryDate(){
        return this.dateOfManufacture + productProfile.daysBeforeExpiry;
    }

    async getUUID(){
        let timestamp = new Date();
        let randomNumString = Math.floor((Math.random()*1000) + 1).toString();

        return await hash(productProfile._id + timestamp + productProfile.manufacturer + randomNumString);
    }
}