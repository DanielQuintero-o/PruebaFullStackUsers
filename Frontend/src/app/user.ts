export class Users {
  id: string;
  name: string;
  document: number;
  email: string;
  image: string;
  address: string;
  telephone: number;

  constructor(
    id: string,
    name: string,
    document: number,
    email: string,
    image: string,
    address: string,
    telephone: number
  ) {
    this.id = id;
    this.name = name;
    this.document = document;
    this.email = email;
    this.image = image;
    this.address = address;
    this.telephone = telephone;
  }
}
