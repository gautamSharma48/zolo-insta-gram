import { INewUser } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { AppWrite } from ".";

export default class UserMutationQuery {
  appWrite = new AppWrite();
  constructor() {}

  userCreateUserAccountMutation = () => {
    return useMutation({
      mutationFn: (user: INewUser) => this.appWrite.createUserAccount(user),
    });
  };

  userSignInAccount = () => {
    return useMutation({
      mutationFn: (user: { email: string; password: string }) =>
        this.appWrite.signInAccount(user),
    });
  };
}
