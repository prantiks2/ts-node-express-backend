import { Document as MongoDocument, Filter, UpdateFilter, WithId, FindOptions, CountDocumentsOptions } from 'mongodb';
import { client as MongoClient } from '../config/mongo';
import { Product, UpdateProduct } from '../models/product.model';

export function addProduct(product: Product) {
    return new Promise((resolve, reject) => {
        MongoClient.db().collection('products').insertOne(product).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
}

export function updateProduct(condition: Filter<MongoDocument>, update: UpdateFilter<UpdateProduct>|Partial<UpdateProduct>) {
    return new Promise((resolve, reject) => {
        MongoClient.db().collection('products').updateOne(condition, update).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
}

export function deleteProduct(condition: Filter<MongoDocument>) {
    return new Promise((resolve, reject) => {
        MongoClient.db().collection('products').deleteOne(condition).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
    console.dir
}

export function findAllProduct(condition: Filter<MongoDocument>, options: FindOptions<MongoDocument>): Promise<WithId<MongoDocument>[]>{
    return new Promise((resolve, reject) => {
        MongoClient.db().collection('products').find(condition, options).toArray().then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
}

export function findAllProductCount(condition: MongoDocument, options: CountDocumentsOptions): Promise<number>{
    return new Promise((resolve, reject) => {
        MongoClient.db().collection('products').countDocuments(condition, options).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
}
