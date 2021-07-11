export class ClassStudent {
  id: number;
  name: string;
  imageUrl: string;
  birthday: string;
  hometown: string;
  ethnicity: string
  gender: string;
  religion: string;
  email: string;


  constructor(name: string, imageUrl: string, birthday: string, hometown: string, ethnicity: string, gender: string, religion: string, email: string) {
    this.name = name;
    this.imageUrl = imageUrl;
    this.birthday = birthday;
    this.hometown = hometown;
    this.ethnicity = ethnicity;
    this.gender = gender;
    this.religion = religion;
    this.email = email;
  }
}
