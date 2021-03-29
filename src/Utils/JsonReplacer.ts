const replacer = (key: string, value: any) => {

    if (key === "password") return undefined
    return value

}

export default replacer