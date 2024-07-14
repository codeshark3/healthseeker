import Image from "next/image";
import Link from "next/link";
import RegisterForm from "~/components/forms/RegisterForm";
import { getUserById } from "~/server/data/user";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  if (!userId) return null;
  const user = await getUserById(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container flex max-w-[860px] flex-col py-10">
          <Image
            className="mb-12 h-10 w-fit"
            src="/assets/icons/logo-full.svg"
            alt="Healthseeker Logo"
            width={1000}
            height={1000}
          />
          {/* <PatientForm /> */}
          <RegisterForm user={user} />
          <p className="copyright py-12">© 2024 healthseeker </p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        alt="appointments-bg"
        height={1000}
        width={1000}
        className="side-img max-w-[300px]"
      />
    </div>
  );
};
export default Register;
