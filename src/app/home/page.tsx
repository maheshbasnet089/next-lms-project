"use client"
import {signIn} from "next-auth/react"
function Hello(){
    return (
      <div>
        <button onClick={()=>signIn("google")}>Sign in With Google</button>
      </div>

    )
}


export default Hello