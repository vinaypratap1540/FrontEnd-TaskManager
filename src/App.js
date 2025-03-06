import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import Tasks from "./pages/tasks/Tasks.jsx";

const appRouter = createBrowserRouter([
  {
   path:"/",
   element:<MainLayout/>,
   children:[
    {
     path:"/",
     element:(
      <>
     <Home/>
     </>
     )
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/tasks",
      element:<Tasks/>
    }

   ]
    
  }
])
function App() {
  return (
    <div className="App">
        <RouterProvider router={appRouter}/>
    </div>
  );
}

export default App;
