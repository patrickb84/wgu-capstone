export default class UserModel {
  constructor (user) {
    this.id = user.id
    this.name = user.name
    this.email = user.email
    this.createdAt = user.createdAt
    this.updatedAt = user.updatedAt
  }
}
