import { Document as MongoDocument, Filter } from 'mongodb';
import { client as MongoClient } from '../config/mongo';
import { Session } from '../models/session.model';

export function createSession(session: Session) {
    return new Promise((resolve, reject) => {
        MongoClient.db().collection('sessions').insertOne(session).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
}

export function findSession(condition: Filter<MongoDocument>) {
    return new Promise((resolve, reject) => {
        MongoClient.db().collection('sessions').findOne(condition).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
}

export function deleteSession(condition: Filter<MongoDocument>) {
    return new Promise((resolve, reject) => {
        MongoClient.db().collection('sessions').deleteOne(condition).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
}