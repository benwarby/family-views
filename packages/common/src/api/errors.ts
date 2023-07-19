export class FamilyViewsError {
  readonly errorId: number;
  readonly name: string;
  readonly description: string | null;
  protected constructor(
    tErrorId: number,
    tName: string,
    tDescription: string | null
  ) {
    this.errorId = tErrorId;
    this.name = tName;
    this.description = tDescription;
  }
}

export type FamilyViewsErrorType = typeof FamilyViewsError;

export class ItemNotFoundError extends FamilyViewsError {
  constructor(tDescription: string | null) {
    super(100, "ITEM_NOT_FOUND", tDescription);
  }
}

export class UnknownError extends FamilyViewsError {
  constructor(tDescription: string | null) {
    super(101, "UNKNOWN_ERROR", tDescription);
  }
}

export class ItemHasError extends FamilyViewsError {
  constructor(tDescription: string | null) {
    super(102, "ITEM_HAS_ERROR", tDescription);
  }
}

export class InvalidRequestError extends FamilyViewsError {
  constructor(tDescription: string | null) {
    super(200, "REQUEST_INVALID", tDescription);
  }
}

export class ServerError extends FamilyViewsError {
  constructor(tDescription: string | null) {
    super(300, "SERVER_ERROR", tDescription);
  }
}

export class InUseError extends FamilyViewsError {
  constructor(tDescription: string | null) {
    super(400, "IN_USE", tDescription);
  }
}
