import * as either from 'fp-ts/Either';
import { TabInfoType } from '../dto/tab-info';

export type GetTabsResponseType = either.Either<Error, TabInfoType[]>