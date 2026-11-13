import { supabase } from "../../services/supabase.service"
import { SiNotion } from "react-icons/si";
export default function NotionAuth(){
    
    const loginNotion = async () => {
        const {error} = await supabase.auth.signInWithOAuth({
            provider: "notion",
            options: {
                redirectTo: `${window.location.origin}/callback`
            }
        })
        console.log(error)
    }
    
    return (
        <button className="btn align-items-center justify-content-center d-flex border-0 rounded-3 shadow-sm p-3" onClick={loginNotion} >
            <SiNotion size={25} />
            <span className="fs-medium mx-3" >Continuar con notion</span>
        </button>
    )
}