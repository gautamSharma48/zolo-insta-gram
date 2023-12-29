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
import { Link } from "react-router-dom";

const SignIn = () => {
  const form = useForm<z.infer<typeof signUpValidation>>({
    resolver: zodResolver(signUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof signUpValidation>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };
  return (
    <Form {...form}>
      <div className="sm: w-420 flex flex-center flex-col">
        <>logo</>
        <h2 className="h3-bold md:h2-bold">Create a new account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use Chatgram enter your account details{" "}
        </p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
      </div>
     <div className="text-small-regular text-light-2 text-center mt-2">
        Don't have an account?{" "}
        <Link
          to="/sign-up"
          className="text-primary-500 text-small-semibold ml-1"
        >
          Sign Up
        </Link>
      </div>
    </Form>
  );
};

export default SignIn;
