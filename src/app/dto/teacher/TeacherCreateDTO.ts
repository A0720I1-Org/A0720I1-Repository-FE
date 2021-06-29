export class TeacherCreateDTO {
  username: string;
  password: string;
  name: string;
  birthday: string;
  gender: string;
  email: string;
  imageUrl: string;


  constructor(username: string, password: string, name: string, birthday: string, gender: string, email: string, imageUrl: string) {
    this.username = username;
    this.password = password;
    this.name = name;
    this.birthday = birthday;
    this.gender = gender;
    this.email = email;
    this.imageUrl = imageUrl;
  }
}
