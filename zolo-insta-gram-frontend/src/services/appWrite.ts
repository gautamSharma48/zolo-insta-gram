import {
  Client,
  Account,
  Databases,
  Storage,
  Avatars,
  Query,
  Role,
  Permission,
} from "appwrite";
import { INewUser } from "@/lib/types";
import { ID } from "appwrite";

interface AppWriteConfig {
  projectId: string;
  url: string;
  databaseId: string;
  storageId: string;
  userCollectionId: string;
  postCollectionId: string;
  saveCollectionId: string;
}

export default class AppWrite {
  client: Client;
  account: Account;
  databases: Databases;
  storage: Storage;
  avatars: Avatars;
  appWriteConfig: AppWriteConfig = {
    projectId: import.meta.env.VITE_APP_WRITE_PROJECT_ID || "",
    url: import.meta.env.VITE_APP_WRITE_URL || "",
    databaseId: import.meta.env.VITE_APP_WRITE_DATABASE_ID || "",
    storageId: import.meta.env.VITE_APP_WRITE_STORAGE_ID || "",
    userCollectionId: import.meta.env.VITE_APP__WRITE_USER_COLLECTION_ID || "",
    postCollectionId: import.meta.env.VITE_APP__WRITE_POST_COLLECTION_ID || "",
    saveCollectionId: import.meta.env.VITE_APP__WRITE_SAVE_COLLECTION_ID || "",
  };
  constructor() {
    this.client = new Client();
    this.client
      .setProject(this.appWriteConfig.projectId) // Your API Endpoint
      .setEndpoint(this.appWriteConfig.url); // Your project ID

    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
    this.avatars = new Avatars(this.client);
  }

  async createUserAccount(user: INewUser) {
    try {
      const responseResult: any = await this.account.create(
        ID.unique(),
        user.email,
        user.password,
        user.name
      );
      if (responseResult) throw Error;
      const avatarUrl = this.avatars.getInitials(user.name);
      const userPayload: object = {
        //eslint-disable-next-line
        accountId: responseResult.$id,
        email: user.email,
        name: user.name,
        imageUrl: avatarUrl,
        userName: user.username,
      };
      const saveUserDb = await this.databases.createDocument(
        this.appWriteConfig.databaseId,
        this.appWriteConfig.userCollectionId,
        ID.unique(),
        userPayload,
        [Permission.read(Role.any())]
      );
      return saveUserDb;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async signInAccount(user: { email: string; password: string }) {
    try {
      const session = await this.account.createEmailSession(
        user.email,
        user.password
      );
      return session;
    } catch (error) {
      console.log(error);
    }
  }

  async getCurrentUser() {
    try {
      const currentAccount = await this.account.get();
      if (!currentAccount) throw Error;

      const currentUser = await this.databases.listDocuments(
        this.appWriteConfig.databaseId,
        this.appWriteConfig.userCollectionId,
        [Query.equal("accountId", currentAccount.$id)]
      );
      if (!currentUser) throw Error;
      return currentUser.documents[0];
    } catch (error) {
      console.log(error);
    }
  }
}
