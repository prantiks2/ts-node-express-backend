import { Document as MongoDocument, Filter, UpdateFilter, WithId } from 'mongodb';
import { client as MongoClient } from '../config/mongo';
import { UpdateUser, User } from '../models/user.model';

export function createUser(user: User) {
    return new Promise((resolve, reject) => {
        MongoClient.db().collection('users').insertOne(user).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
}

export function findUser(condition: Filter<MongoDocument>): Promise<WithId<MongoDocument> | null>{
    return new Promise((resolve, reject) => {
        MongoClient.db().collection('users').findOne(condition).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
}

export function updateUser(condition: Filter<MongoDocument>, update: UpdateFilter<UpdateUser>|Partial<UpdateUser>) {
    return new Promise((resolve, reject) => {
        MongoClient.db().collection('users').updateOne(condition, update).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
}

export function deleteUser(condition: Filter<MongoDocument>) {
    return new Promise((resolve, reject) => {
        MongoClient.db().collection('users').deleteOne(condition).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
}


