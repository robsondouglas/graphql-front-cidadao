import {CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoRefreshToken} from 'amazon-cognito-identity-js';

const getStorage = () =>  localStorage.getItem('storage-credentials') === 'local' ? localStorage : sessionStorage;


const UserPool = new CognitoUserPool({
    UserPoolId: 'sa-east-1_28VaLNwAP',
    ClientId:   '7joob4d238qo57i2gdmnkpava2',
    Storage: getStorage()
});

let _accessToken = '';

export const signUp = (name, email, pwd) => new Promise((resolve,reject)=>{
    UserPool.signUp(email, pwd, [{Name:'name', Value: name}], null, (error, data)=> error ?  reject(error) : resolve(data));
});


export const signIn = (usr, pwd, persist) => new Promise((resolve, reject) => {
    localStorage.setItem('storage-credentials', persist ? 'local' : 'session' )

    const details = new AuthenticationDetails({Username: usr, Password: pwd});    
    const _user   = new CognitoUser({ Username: usr, Pool: UserPool, Storage: getStorage() });
    
    _user.authenticateUser(details, {
        onSuccess: ({idToken, refreshToken, accessToken}) => {
            resolve({name:idToken.payload.name, user:idToken.payload.email, refreshToken:refreshToken.token, accessToken:accessToken.jwtToken});
            _accessToken = accessToken.jwtToken;
            ;
        },
        onFailure: reject,
        newPasswordRequired: ()=>console.log('required')
    });
})

let _timerAuth = null;
const autoResign = (expires) =>{
    if(_timerAuth)
    { clearTimeout(_timerAuth) }
    
    const d = new Date();

    _timerAuth = setTimeout(()=> {
        refreshSignin();
    }, (expires * 1000) - d.valueOf() - 3000); //3s antes de expirar
}

export const refreshSignin = () => new Promise((resolve) => {
    const usr  = UserPool.getCurrentUser();

    if(usr){
        usr.getSession((error, sess) => {
            if(error || !sess)
            { resolve(null) }
            else
            {
                const {idToken, accessToken, refreshToken} = sess;
                _accessToken = accessToken.jwtToken;
                autoResign( accessToken.payload.exp )
                resolve({name:idToken.payload.name, user:idToken.payload.email, refreshToken:refreshToken.token, accessToken:accessToken.jwtToken})
            }
            
            
        });
    }
    else
    { resolve(null) }
});

export const getToken = () => _accessToken;

export const confirmSignup = (usr, code) => new Promise((resolve, reject) => {
    const _user   = new CognitoUser({ Username: usr, Pool: UserPool, Storage: getStorage() });
    _user.confirmRegistration(code, false, (error, data)=>{
        console.log(JSON.stringify(data));
        error ?  reject(error) : resolve(data)
    });
});

export const ressendCode = (usr)=> new Promise((resolve, reject) => {    
    const _user   = new CognitoUser({ Username: usr, Pool: UserPool, Storage: getStorage() });
    _user.resendConfirmationCode((err, data)=> err ? reject(err) : resolve(data));
});

export const forgot = (usr) => new Promise((resolve, reject) => {
    const _user   = new CognitoUser({ Username: usr, Pool: UserPool, Storage: getStorage() });
    _user.forgotPassword((err, data)=> err ? reject(err) : resolve(data));
});
