import jwt_decode from 'jwt-decode'

export const jwtHelpers = {
    decode,
}




function decode(token){
    var decoded = jwt_decode(token)
    return decoded
}