import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Day1 from './components/Day1/Index';
import Day2 from './components/Day2/Index';
import ContactUs from './components/Day2/ContactUs'
import Day3 from './components/Day3/Index';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AboutUs from './components/Day2/AboutUs';
import CommonLayout from './components/CommonComponent/CommonLayout';
import FileNotFound from './components/CommonComponent/FileNotFound';
import Day4 from './components/Day4_7_8/Login'
import SignUp from './components/Day4_7_8/SignUp';
import UserScreen from './components/Day4_7_8/User/User';
import RoleScreen from './components/Day4_7_8/Role';
import UserAntD from './components/Day4_7_8/User/UserAntD';
import Day5 from './components/Day5_6/Event/EventPage'
import StopWatch from './components/Day5_6/Event/StopWatch';
import Day9 from './components/Day9/AddProductForm';
import Listing from './components/Day9/Listing';
import AddToCart from './components/Day9/AddToCart';
import Index from './components/Day10/Index';
import AuthLayout from './components/Day11/AuthLayout';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Day4 />,
      index: true
    },
    {
      path: "/table",
      element: <Day2 />
    },
    {
      path: "/day4_7_8/signUp",
      element: <SignUp />,
    },
    {
      element: <AuthLayout />,
      children: [
        {
          path: "/day1",
          element: <CommonLayout task={1} />,
          children: [
            {
              index: true,
              element: <Day1 />,
            }
          ]
        },
        {
          path: "/day2",
          element: <CommonLayout task={1} />,
          children: [
            {
              index: true,
              element: <Day1 />,
            },
            {
              path: "contactUs",
              element: <ContactUs />,
            },
            {
              path: "aboutUs",
              element: <AboutUs />,
            },
          ],
        },
        {
          path: "/day3",
          element: <CommonLayout task={1} />,
          children: [
            {
              index: true,
              element: <Day3 />,
            }
          ],
        },
        {
          path: "/day4_7_8",
          children: [
            {
              index: true,
              element: <Day4 />,
            },
            {
              path: "user",
              element: <UserScreen />,
            },
            {
              path: "userAntD",
              element: <UserAntD />,
            },
            {
              path: "role",
              element: <RoleScreen />,
            }
          ],
        },
        {
          path: "/day5_6",
          element: <CommonLayout task={1} />,
          children: [
            {
              index: true,
              element: <Day5 />
            },
            {
              path: "stopWatch",
              element: <StopWatch />
            }
          ],
        },
        {
          path: "/day9",
          element: <CommonLayout task={9} />,
          children: [
            {
              index: true,
              element: <Day9 />
            },
            {
              path: 'productListing',
              element: <Listing />
            },
            {
              path: 'addToCart',
              element: <AddToCart />
            }
          ],
        },
        {
          path: '/day10',
          element: <CommonLayout task={1} />,
          children: [
            {
              index: true,
              element: <Index />
            }
          ]
        },
      ]
    },
    {
      path: '*',
      element: <FileNotFound />,
    },

  ],{ basename: '/SatvaReactApp' });

  return (
    <RouterProvider router={router} />
    // <Routes>
    //   <Route path="/" element={<Day2 />}></Route>
    //   <Route path="/day1" element={<Day1 />}></Route>
    //   <Route path="/home" element={<Home />}></Route>
    //   <Route path="/aboutUs" element={<AboutUs />}></Route>
    //   <Route path="/contactUs" element={<ContactUs />}></Route>
    //   <Route path="/day3" element={<Day3 />}></Route>
    // </Routes>

    // <Routes>
    //   <Route path="/" element={<Day2 />}/>
    //   <Route path="/day1">
    //     <Route index element={<Day1 />} />
    //   </Route>
    //   <Route path="/day2">
    //     <Route index element={<Day2 />} />
    //     <Route path="contactUs" element={<ContactUs />} />
    //   </Route>
    //   <Route path="/day3">
    //     <Route index element={<Day3 />} />
    //   </Route>
    // </Routes>


  );
}

export default App

// const a = {
//   name: "Test Name",
//   data: {
//       marks: '5'
//   }
// }

// const b = JSON.parse(JSON.stringify(a))
// b.name = "Test Name2"
// b.data.marks = '6'
// console.log(a, b);
