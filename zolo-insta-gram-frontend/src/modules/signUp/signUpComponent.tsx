import { zodResolver } from "@hookform/resolvers/zod";
import { signUpValidation } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import Loader from "@/assets/common/loader";
import { Link, useNavigate } from "react-router-dom";
import { UserMutationQuery } from "../../services";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/assets/common/authProvider";

 const SignUpComponent = () => {
  const navigate = useNavigate();
  const { checkAuthUser } = useUserContext();
  const userMutationQuery = new UserMutationQuery();
  const { toast } = useToast();

  const { mutateAsync: createUserAccount, isPending: isCreatingUser } =
    userMutationQuery.userCreateUserAccountMutation();

  const { mutateAsync: signInUserAccount, isPending: isSignInAccount } =
    userMutationQuery.userSignInAccount();

  const form = useForm<z.infer<typeof signUpValidation>>({
    resolver: zodResolver(signUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpValidation>) => {
    const userResult = await createUserAccount(values);
    if (!userResult) {
      toast({ title: "Sign up failed. Please try again" });
      return;
    }
    const session = await signInUserAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      toast({ title: "Sign in failed. Please try again" });
      return;
    }
    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      toast({ title: "Sign in failed. Please try again" });
      return;
    }
  };

  return (
    <Form {...form}>
      <div className="sm: w-420 flex flex-center flex-col">
        <>logo</>
        <h2 className="h3-bold md:h2-bold">Create a new account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use Chatgram enter your account details{" "}
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input className="shad-input" placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User name</FormLabel>
                <FormControl>
                  <Input
                    className="shad-input"
                    placeholder="Username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="shad-input"
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    className="shad-input"
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="shad-button_primary" type="submit">
            {isCreatingUser && isSignInAccount ? (
              <div className="flex-center gap-2">
                <Loader />
              </div>
            ) : (
              "Sign up"
            )}
          </Button>
        </form>
      </div>
      <div className="text-small-regular text-light-2 text-center mt-2">
        Already have an account?{" "}
        <Link
          to="/sign-in"
          className="text-primary-500 text-small-semibold ml-1"
        >
          Log in
        </Link>
      </div>
    </Form>
  );
};

export default SignUpComponent;
