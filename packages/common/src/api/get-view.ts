import * as either from 'fp-ts/Either';
import { ViewTabInfoType } from "../dto/view-tab-info";

export type GetViewResponseType = either.Either<Error, ViewTabInfoType>