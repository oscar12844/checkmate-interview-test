import Head from "next/head";
import GoogleButton from "react-google-button";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { useRouter } from "next/router";
import { initializeApp } from "firebase/app";
import { resourceLimits } from "worker_threads";
import path from "path";

// Task 0: Initialize Firebase
// Replace the following with your app's Firebase project configuration
// https://firebase.google.com/docs/web/setup
const firebaseConfig = {
  apiKey: "AIzaSyDhq-EcRd1Euzkwt0j0DOHxwqzyq3coaAo",
  authDomain: "checkmate-689d3.firebaseapp.com",
  projectId: "checkmate-689d3",
  storageBucket: "checkmate-689d3.appspot.com",
  messagingSenderId: "796117379153",
  appId: "1:796117379153:web:89eab15f387ace18f97070",
  measurementId: "G-P3X0RM6DCD",
};

const app = initializeApp(firebaseConfig);

// GoogleAuthProvider instance
const provider = new GoogleAuthProvider();
// Firebase Auth instance
export const auth = getAuth(app);

export default function Home() {
  //Next.js router
  const router = useRouter();

  // Task 1: Implement Google Sign in with Firebase
  // https://firebase.google.com/docs/auth/web/google-signin
  const signIn = () => {
    /*
      1. Use the GoogleAuthProvider to sign in with Firebase
      2. Use signInWithRedirect to redirect the user to the Google sign in page
      3. (Optional) Use getRedirectResult to get the result of the redirect and check out what is inside :)
      4. Redirect the user to the signed-in page using Next.js router
     */
    signInWithRedirect(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    getRedirectResult(auth)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        if (result != null) {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          //const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
          router.push("/signed-in");
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <>
      <Head>
        <title>Sign in to see the public holidays in HK</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container">
        <main
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1 className="title">
            Welcome to <a href="https://checkmatehk.io">CheckMate</a>
          </h1>
          <h3>Sign in to see a random programming joke 😳</h3>

          {/* Button for user to sign in with Google */}
          {/* Task 1: Implement Google Sign in with Firebase */}
          <GoogleButton
            label={"Sign in with Google"}
            type="light"
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontFamily: "Roboto, sans-serif",
              color: "#444",
            }}
            onClick={signIn}
          ></GoogleButton>
        </main>
      </div>
    </>
  );
}
