  
 class UsersResponse {
    constructor(user) {
      this.name = user.name;
      this.last_name = user.last_name;
    }
  }

  export const usersResponse = new UsersResponse;
  export {UsersResponse}
