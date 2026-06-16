import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    // Create Account
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );

            if (userAccount) {
                return await this.login({ email, password });
            }

            return userAccount;
        } catch (error) {
            console.error("Create Account Error:", error);
            return false;
        }
    }

    // Login
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(
                email,
                password
            );
        } catch (error) {
            console.error("Login Error:", error);
            return false;
        }
    }

    // Get Current User
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            // User is not logged in
            return null;
        }
    }

    // Logout
    async logout() {
        try {
            await this.account.deleteSessions();
            return true;
        } catch (error) {
            console.error("Logout Error:", error);
            return false;
        }
    }
}

const authService = new AuthService();

export default authService;