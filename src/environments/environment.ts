// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_URL: 'https://lamejornochedetuvidaback.azurewebsites.net/api/',
  // API_URL: 'http://localhost:8080/api/',
  // EPAYCO_PUBLIC_KEY: '21a53c1289f27facb77eb77ca397ef4d', // Didier Account
  EPAYCO_PUBLIC_KEY: 'c2be46c2abc3913cc3afeb0b48b1b6a4', // LMNDTV Account
  PASS_ENC : 'lmndtv',

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
