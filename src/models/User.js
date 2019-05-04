export default class User {
  constructor (user = {}) {
    Object.assign(this, user)
  }
  isUnregistered () {
    console.log('Check user is Unregistered')
  }
}
