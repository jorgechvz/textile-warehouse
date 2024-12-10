import LoginForm from "@/components/auth/components/login";
/* import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom"; */

export function LoginPage() {
  return (
    <>
      <div className="md:hidden">
        <img
          src="/login-cover.jpg"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <img
          src="/login-cover.jpg"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        {/* <Link
          to="/examples/authentication"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Login
        </Link> */}
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-login-cover bg-cover bg-center" />
          <div className="relative z-20 mt-auto text-3xl font-bold">Stitchtly</div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <img
                src="/stitchly-logo2.svg"
                alt="Stitchly"
                className="h-20 w-20 self-center"
              />
              <h1 className="text-2xl font-semibold tracking-tight">
                Iniciar sesión
              </h1>
            </div>
            {/* Login Form */}
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
}
