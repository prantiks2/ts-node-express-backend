import { client as MongoClient } from '../config/mongo';
import { Document as MongoDocument, Filter } from 'mongodb';
import { Verification } from '../models/verification.model';

export function createVerification(verificationData: Verification) {
    return new Promise((resolve, reject) => {
        MongoClient.db().collection('verifications').insertOne(verificationData).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
}

export function findVerification(condition: Filter<MongoDocument>) {
    return new Promise((resolve, reject) => {
        MongoClient.db().collection('verifications').findOne(condition).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
}

export function deleteVerification(condition: Filter<MongoDocument>) {
    return new Promise((resolve, reject) => {
        MongoClient.db().collection('verifications').deleteOne(condition).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
}