import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import { json } from "stream/consumers";




export default function SignedIn({ joke }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const temp = JSON.stringify(joke.data[0].punchline)
  return (
    <div>
      <h1>Signed In</h1>
      {/* Task 3: Your own presentation of the joke here (Free Style 😉 )*/}
      <p id="showans">{joke.data[0].setup}</p>
      <button onClick={()=> (alert(temp))}>Haha</button>
      <div>
        <button type="button" onClick={()=>window.location.reload()}>
        Next Joke?
        </button>
      </div>




      
      {/* End of Task 3 */}
    </div>
  )

}

// Task 2: Fetch random jokes from the API
// https://official-joke-api.appspot.com/jokes/programming/random
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API and pass it to the page via props.joke
  const res = await fetch('https://official-joke-api.appspot.com/jokes/programming/random');
  const data = await res.json();
  
  return {
    props: {
      joke: {data}

      ,
    }, // will be passed to the page component as props
  }
}