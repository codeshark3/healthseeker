import Link from "next/link";
import Image from "next/image";
import PatientForm from "~/components/forms/PatientForm";
export default function HomePage() {
  return (
  <div className="flex h-screen max-h-screen">
    <section className="remove-scrollbar container my-auto">
      <div className="sub-container max-w-[496px]">
        <Image className="mb-12 h-10 w-fit" src="/assets/icons/logo-full.svg" alt="Healthseeker Logo" width={1000} height={1000}
         />
         <PatientForm />

         <div className="text-14-regular mt-20 flex justify-between"><p className="justify-items0end text-dark-600 xl:text-left">
         ©  2024 healthseeker  </p><Link className="text-green-500" href="/admin=true">Admin</Link></div>
      </div>
    </section>

    <Image src="/assets/images/onboarding-img.png" alt="appointments-bg" height={1000} width={1000} className="side-img max-w-[50%]" />

  </div>
  );
}
