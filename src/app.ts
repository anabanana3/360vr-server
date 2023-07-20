import { insertDocument, MetricObj } from "./mongoDB.js";


export function onStoreData(data: any): void {
    insertDocument(data as MetricObj)
}