import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login"
import Signup from "./features/auth/pages/Signup"
import Loader from "./features/auth/components/Loader";
import Protected from "./features/auth/components/Protected";

import AiChat from "./features/ai/pages/AiChat";

 const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    },{
        path:"/loader",
        element:<Loader/>
    },{
        path:"/",
        element:<Protected>
<AiChat></AiChat>
        </Protected>
    }

])

export default router;