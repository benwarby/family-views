import * as either from 'fp-ts/Either';

import * as t from "io-ts"
import { FamilyViewsError } from './errors';

export enum OperationEnum {
    READ = 'READ',
    UPDATE = 'UPDATE',
    CREATE = 'CREATE',
    DELETE = 'DELETE',
}

export type FamilyViewsRequest<T> = {
    body:T,
    requestOperation:OperationEnum
}
export type FamilyViewsResponse<T> = {
    body: either.Either<FamilyViewsError, T>
} 

export type FamilyViewsEndpoint = {
    endpointOperation: OperationEnum,
    path: string
}

export type Empty = {}


export class APIEndpoint<Req, Res> {
    readonly endpoint:FamilyViewsEndpoint
    constructor(cEndpoint:FamilyViewsEndpoint) {
        this.endpoint = cEndpoint
    }
}