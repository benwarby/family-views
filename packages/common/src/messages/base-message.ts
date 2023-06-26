import * as t from "io-ts"

export const BaseMessage = t.type({
    isBroadcastMessage: t.boolean,
    content: t.string,
    sender: t.string
})
export type BaseMessageType = t.TypeOf<typeof BaseMessage>