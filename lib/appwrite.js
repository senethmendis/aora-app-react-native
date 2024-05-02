import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "lk.seneth.aora",
  projectId: "6633ae8b00286bd3195a",
  databaseId: "6633afc70029af488625",
  userCollectionId: "6633afeb00339bc1b2f9",
  videoCollectionId: "6633b0040020c7fb634c",
  storageId: "6633b0f7001459f73edd",
};

// Init your react-native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const dataBases = new Databases(client);

export const craeteUsers = async (email, password, username) => {
  // Register User

  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);
    await signIn(email, password);

    const newUser = await dataBases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }

  // account.create(ID.unique(), "me@example.com", "password", "Jane Doe").then(
  //   function (response) {
  //     console.log(response);
  //   },
  //   function (error) {
  //     console.log(error);
  //   }
  // );
};

export const signIn = async (email, password) => {
  try {
    const sesstion = await account.createEmailSession(email, password);
    return sesstion;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccout = await account.get();
    if (!currentAccout) throw Error;
    const currentUser = await dataBases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccout.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.dpcuments[0];
  } catch (error) {
    console.log(error);
  }
};
