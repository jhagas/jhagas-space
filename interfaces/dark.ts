import { Dispatch, SetStateAction } from "react"

type darkTypes = {
    dark: boolean,
    setDark: Dispatch<SetStateAction<boolean>>,
}

export default darkTypes