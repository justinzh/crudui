export const config = {
    appid:'6a442129-c8d8-4b15-bc83-4e38798caf42', // azure ad B2C registered application id
    redirectUri:'https://dhweb.z13.web.core.windows.net', //'http://localhost:3000', 
    scopes: ['https://azfaderation.onmicrosoft.com/crudui/Product.View'],
    knownAuthorities: ['https://azfaderation.b2clogin.com/azfaderation.onmicrosoft.com/B2C_1_signupandsignin'],
    authority:'https://azfaderation.b2clogin.com/azfaderation.onmicrosoft.com/B2C_1_signupandsignin', 
    google_client_id : '910556168224-5gtfba6aqsb2pssfjq1k1a2gv93bune0.apps.googleusercontent.com',
};
