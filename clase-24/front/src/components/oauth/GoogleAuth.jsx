import { supabase } from "../../services/supabase.service"
import { FcGoogle } from "react-icons/fc";

export default function GoogleAuth() {

    const loginGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/callback`
            }
        })
        console.log(error)
    }

    return (
        <button className="btn align-items-center justify-content-center d-flex border-0 rounded-3 shadow-sm p-3" onClick={loginGoogle} >
            <FcGoogle size={25} />
            <span className="fs-medium mx-3" >Continuar con google</span>
        </button>
    )
}