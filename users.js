class User {
  constructor() {
    this.id = '';
    this.email = '';
    this.name = '';
    this.lastname = '';
    this.phone = '';
    this.image = '';
    this.password = '';
    this.session_token = '';
    this.notification_token = '';
    this.created_at = new Date();
    this.updated_at = new Date();
    this.url = '';
  }
}
module.exports = User;