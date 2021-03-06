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
    data ? : any,
}
interface ValidationResponse {
    status: boolean,
    message ?: string
}
interface User {
    userName: string,
    password: string,
}
export { Student, Response, ValidationResponse, User}