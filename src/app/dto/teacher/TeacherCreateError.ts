export class TeacherCreateError {
  username: string;
  password: string;
  name: string;
  birthday: string;
  gender: string;
  email: string;

  constructor() {
    this.username = null;
    this.password = null;
    this.name = null;
    this.birthday = null;
    this.gender = null;
    this.email = null;
  }
}
