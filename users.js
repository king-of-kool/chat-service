// user.js

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBsLbyZONGRIVbB8sU9YrzAzAc_BX9yKVk",
    authDomain: "greenhill-chat-service.firebaseapp.com",
    databaseURL: "https://greenhill-chat-service-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "greenhill-chat-service",
    storageBucket: "greenhill-chat-service.firebasestorage.app",
    messagingSenderId: "410106930178",
    appId: "1:410106930178:web:a5cf1a9b3e152f1959731b",
    measurementId: "G-7GEN0DF5KE"
};

// Initialize Firebase App
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const auth = firebase.auth();

// Sign Up Function
function signUp(username, password) {
    return auth.createUserWithEmailAndPassword(username + "@chat.com", password)
        .then((userCredential) => {
            const user = userCredential.user;
            return { username: username };
        })
        .catch((error) => {
            throw new Error("Sign-up failed: " + error.message);
        });
}

// Log In Function
function logIn(username, password) {
    return auth.signInWithEmailAndPassword(username + "@chat.com", password)
        .then((userCredential) => {
            const user = userCredential.user;
            return { username: username };
        })
        .catch((error) => {
            throw new Error("Login failed: " + error.message);
        });
}

// Fetch current user data
function getCurrentUser() {
    return auth.currentUser ? { username: auth.currentUser.email.split('@')[0] } : null;
}

// Sign Out Function
function signOut() {
    return auth.signOut();
}

// Fetch messages from Firebase
function getMessages(callback) {
    const messagesRef = db.ref('messages');
    messagesRef.on('value', (snapshot) => {
        const messages = snapshot.val() || {};
        const sortedMessages = Object.values(messages).sort((a, b) => a.timestamp - b.timestamp);
        callback(sortedMessages);
    });
}

// Push a message to Firebase
function sendMessage(message) {
    const messagesRef = db.ref('messages');
    messagesRef.push(message);
}

export { signUp, logIn, getCurrentUser, signOut, getMessages, sendMessage };
