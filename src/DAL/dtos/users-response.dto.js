 export default class UsersResponseDto {
    constructor(user) {
      this.name = user.name;
      this.last_name = user.last_name;
      this.email = user.email
      this.roles = user.roles

    }


    static fromModel(user) {
      return new UsersResponseDto(user);
  }
  }


