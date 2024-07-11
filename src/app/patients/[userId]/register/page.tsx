import Image from "next/image"
import Link from "next/link"
import RegisterForm from "~/components/forms/RegisterForm"
import { getUserById } from "~/server/data/user"
const Register = async({params:{userId}}:SearchParamProps) => {
    if(!userId) return null
    const user = await getUserById(userId)
    return (
        <div className="flex h-screen max-h-screen">
        <section className="remove-scrollbar container my-auto">
          <div className="sub-container max-w-[496px]">
            <Image className="mb-12 h-10 w-fit" src="/assets/icons/logo-full.svg" alt="Healthseeker Logo" width={1000} height={1000}
             />
             {/* <PatientForm /> */}
             <RegisterForm  user={user}/>
    
             <div className="text-14-regular mt-20 flex justify-between"><p className="justify-items-end text-dark-600 xl:text-left">
             ©  2024 healthseeker  </p><Link className="text-green-500" href="/admin=true">Admin</Link></div>
          </div>
        </section>
    
        <Image src="/assets/images/register-img.png" alt="appointments-bg" height={1000} width={1000} className="side-img max-w-[300px]" />
    
      </div>
    )
}
export default Register