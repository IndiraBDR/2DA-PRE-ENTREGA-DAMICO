 class UsersRequestDto {
    constructor(user) {
      this.name = user.name;
      this.last_name= user.last_name;
      this.email = user.email;
      this.age = user.age
      this.password = user.password;
      this.cart = user.cart
      this.roles = user.roles;
    
    }
  }

export{UsersRequestDto}