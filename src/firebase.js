import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyAxSLLYrqvpNuRXSrJCNNW-WaApVnyieJk",
	authDomain: "todo-app-a0f4d.firebaseapp.com",
	databaseURL: "https://todo-app-a0f4d.firebaseio.com",
	projectId: "todo-app-a0f4d",
	storageBucket: "todo-app-a0f4d.appspot.com",
	messagingSenderId: "427156803798",
	appId: "1:427156803798:web:596838c1bdd49a72d33977",
	measurementId: "G-TX0P6V08QN",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;
