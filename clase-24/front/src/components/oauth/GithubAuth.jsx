import { supabase } from "../../services/supabase.service"
import { FaGithub } from "react-icons/fa";

export default function GithubAuth(){
    
    const loginGithub = async () => {
        const {error} = await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: `${window.location.origin}/callback`
            }
        })
        console.log(error)
    }
    
    return (
        <button className="btn align-items-center justify-content-center d-flex border-0 rounded-3 shadow-sm p-3" onClick={loginGithub} >
            <FaGithub size={25} />
            <span className="fs-medium mx-3" >Continuar con github</span>
        </button>
    )
}