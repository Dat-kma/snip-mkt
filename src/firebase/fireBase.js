import * as firebase from "firebase";
var config = {
    apiKey: "AIzaSyBnvUYdOL0fAKTMYxMscvUUIsUiRDmfwTk",
    authDomain: "dataspinmkt.firebaseapp.com",
    databaseURL: "https://dataspinmkt.firebaseio.com",
    projectId: "dataspinmkt",
    storageBucket: "dataspinmkt.appspot.com",
    messagingSenderId: "73752492166"
};
firebase.initializeApp(config);
export const  DataBase=firebase.database().ref("DataForOrder");
export const  DataBaseName = firebase.database().ref("DataForMember");
export const  DataHistory = firebase.database().ref("DataHistory");