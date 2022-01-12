interface Student {
    id: number,
    name: string,
    age: number,
    class: string,
    section: string
}

interface Response {
    status : string,
    message ? : string,
    error ? : {
        type: string,
        message: string,
    }
    data ? : any,
}
export { Student, Response }