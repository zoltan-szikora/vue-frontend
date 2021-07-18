export default class User {
  constructor(
    id,
    firstName,
    lastName,
    dateOfBirth,
    username,
    email,
    password,
    activation,
    status,
    enabled,
    roles = []
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.username = username;
    this.email = email;
    this.password = password;
    this.activation = activation;
    this.status = status;
    this.enabled = enabled;
    this.roles = roles;
  }
}
