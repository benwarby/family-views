import * as t from "io-ts"

const testType = t.keyof({
    type1: null,
    type2: null
})

export const BaseTest = t.type({

})

