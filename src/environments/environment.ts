// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'http://localhost/api',
  firebase: {
    // var firebaseConfig = {
    apiKey: 'AIzaSyA0MH_A5YMg-0qGO35eF8B9zKHvnmUnTV4',
    authDomain: 'rev-online.firebaseapp.com',
    databaseURL: 'https://rev-online.firebaseio.com',
    projectId: 'rev-online',
    storageBucket: 'rev-online.appspot.com',
    messagingSenderId: '38005975182',
    appId: '1:38005975182:web:8dd8e09117858f2c'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
