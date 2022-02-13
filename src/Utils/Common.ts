import JWT from 'jsonwebtoken';

async function verifyUser(token:string) {
    const scret = <string> process.env.JWTSCRET;
    try {
        const verfiy:any = await JWT.verify(token, scret);
        if(verfiy && verfiy.userName){
            return {
                userName: verfiy.userName
            }
        } else {
            return false;
        } 
    }
    catch(err) {
        console.log(err);
        return false;
    } 
 }
async function generateToken(userName: string) {

    const scret = <string> process.env.JWTSCRET;
    const token = await JWT.sign({userName: userName}, scret, {expiresIn: 24 * 60 * 60});
    return token;
}
 export {
     verifyUser,
     generateToken
 }