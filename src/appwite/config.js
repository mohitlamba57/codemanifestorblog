import { Client, ID, Storage, Databases, Query } from "appwrite";
import config from "../config/config";

class Service{
    client=new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(config.appWriteURL)
        .setProject(config.appWriteProjectID);

        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client);
    }

    //*Database Services
    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                config.appWriteDatabaseID,
                config.appWriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("appwrite service:: createPost :: error",error);
            return false;
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                config.appWriteDatabaseID,
                config.appWriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("appwrite service:: updatePost :: error",error);
            return false;
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appWriteDatabaseID,
                config.appWriteCollectionID,
                slug
            )
            return true;
        } catch (error) {
            console.log("appwrite service:: deletePost :: error",error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appWriteDatabaseID,
                config.appWriteCollectionID,
                slug
            )
        } catch (error) {
            console.log("appwrite service:: getPost :: error",error);
            return false
        }
    }

    async getPosts(query=[Query.equal('status','active')]){
        try {
            return await this.databases.listDocuments(
                config.appWriteDatabaseID,
                config.appWriteCollectionID,
                query
            )
        } catch (error) {
            console.log("appwrite service:: getPost :: error",error);
            return false
        }
        
    }

    //*Storage Services
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appWriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("appwrite serive :: uploadFile :: error", error);
            return false
        }
    }
    async deleteFile(fileID){
        try {
            return await this.bucket.deleteFile(
                this.bucket.deleteFile(
                    config.appWriteBucketID,
                    fileID
                )
            )
        } catch (error) {
            console.log("appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileID){
        try {
            return this.bucket.getFilePreview(
            config.appWriteBucketID,
            fileID
        )
        } catch (error) {
            console.log("appwrite serive :: getFilePreview :: error", error);
            return false
        }
        
    }
}

const service=new Service();
export default service