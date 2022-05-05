//This class has the structure of attributes a Product should consist of. These attributes will be assigned values from the JSON
//recieved from the back-end and will then be placed in an array of Product objects.

export class Product {
    sku!: string;
    name!: string;
    description!: string;
    unitPrice!: number;
    imageUrl!: string;
    active!: boolean;
    unitsInStock!: number;
    dateCreated!: Date;
    lastUpdate!: Date;
}
