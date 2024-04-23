import { MouseEventHandler } from "react"

export type LabelHeaderType = {
    [s: string]: {
        label: string,
        nextMode?: MouseEventHandler<HTMLSpanElement>
    }
}
