import { UserProvider } from "../lib/user";
import LoginForm from "../ui/login-form";


export default function Page() {
    return (
        <UserProvider>
              <LoginForm/>

        </UserProvider>
    )
}