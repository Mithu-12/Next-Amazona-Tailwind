import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import { Store } from '../utils/Store';
import { signOut, useSession } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
import { Menu } from '@headlessui/react';
import Cookies from 'js-cookie';
import DropdownLink from './Dropdown';
// import DropdownLink from './Dropdown';

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);
  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };
  return (
    <>
      <Head>
        <title>{title ? title + '-- Amazona' : 'Amazona'}</title>
        <meta name="description" content="E-commerce website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="bottom-center" limit={1} />
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 justify-between shadow-lg items-center px-4">
            <Link href="/">
              <p className="text-lg font-bold">Amazona</p>
            </Link>
            <div>
              <Link href="/cart" className="text-lg">
                Cart
                {cartItemsCount > 0 && (
                  <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs text-white font-bold">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              {status === 'loading' ? (
                'loading'
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-blue-600 font-bold px-4">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right shadow-lg bg-white">
                    <Menu.Items>
                      <DropdownLink className="dropdown-link" href="/profile">
                        Profile
                      </DropdownLink>
                    </Menu.Items>
                    <Menu.Items>
                      <DropdownLink
                        className="dropdown-link"
                        href="/order-history"
                      >
                        Order History
                      </DropdownLink>
                    </Menu.Items>
                    <Menu.Items>
                      <a
                        className="dropdown-link"
                        href="#"
                        onClick={logoutClickHandler}
                      >
                        Logout
                      </a>
                    </Menu.Items>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link className="p-2" href="/login">
                  Login
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex justify-center items-center shadow-inner h-10">
          <p>Copyright @ 2022 Amazona</p>
        </footer>
      </div>
    </>
  );
}

// import { signOut, useSession } from 'next-auth/react';
// import Head from 'next/head';
// import Link from 'next/link';
// import Cookies from 'js-cookie';
// import React, { useContext, useEffect, useState } from 'react';
// import { ToastContainer } from 'react-toastify';
// import { Menu } from '@headlessui/react';
// import 'react-toastify/dist/ReactToastify.css';
// import { Store } from '../utils/Store';
// import DropdownLink from './DropdownLink';

// export default function Layout({ title, children }) {
//   const { status, data: session } = useSession();

//   const { state, dispatch } = useContext(Store);
//   const { cart } = state;
//   const [cartItemsCount, setCartItemsCount] = useState(0);
//   useEffect(() => {
//     setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
//   }, [cart.cartItems]);

//   const logoutClickHandler = () => {
//     Cookies.remove('cart');
//     dispatch({ type: 'CART_RESET' });
//     signOut({ callbackUrl: '/login' });
//   };
//   return (
//     <>
//       <Head>
//         <title>{title ? title + ' - Amazona' : 'Amazona'}</title>
//         <meta name="description" content="Ecommerce Website" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <ToastContainer position="bottom-center" limit={1} />

//       <div className="flex min-h-screen flex-col justify-between ">
//         <header>
//           <nav className="flex h-12 items-center px-4 justify-between shadow-md">
//             <Link href="/">
//               <p className="text-lg font-bold">amazona</p>
//             </Link>
//             <div>
//               <Link href="/cart">
//                 <p className="p-2">
//                   Cart
//                   {cartItemsCount > 0 && (
//                     <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
//                       {cartItemsCount}
//                     </span>
//                   )}
//                 </p>
//               </Link>

//               {status === 'loading' ? (
//                 'Loading'
//               ) : session?.user ? (
//                 <Menu as="div" className="relative inline-block">
//                   <Menu.Button className="text-blue-600">
//                     {session.user.name}
//                   </Menu.Button>
//                   <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
//                     <Menu.Item>
//                       <DropdownLink className="dropdown-link" href="/profile">
//                         Profile
//                       </DropdownLink>
//                     </Menu.Item>
//                     <Menu.Item>
//                       <DropdownLink
//                         className="dropdown-link"
//                         href="/order-history"
//                       >
//                         Order History
//                       </DropdownLink>
//                     </Menu.Item>
//                     {session.user.isAdmin && (
//                       <Menu.Item>
//                         <DropdownLink
//                           className="dropdown-link"
//                           href="/admin/dashboard"
//                         >
//                           Admin Dashboard
//                         </DropdownLink>
//                       </Menu.Item>
//                     )}
//                     <Menu.Item>
//                       <a
//                         className="dropdown-link"
//                         href="#"
//                         onClick={logoutClickHandler}
//                       >
//                         Logout
//                       </a>
//                     </Menu.Item>
//                   </Menu.Items>
//                 </Menu>
//               ) : (
//                 <Link href="/login">
//                   <p className="p-2">Login</p>
//                 </Link>
//               )}
//             </div>
//           </nav>
//         </header>
//         <main className="container m-auto mt-4 px-4">{children}</main>
//         <footer className="flex h-10 justify-center items-center shadow-inner">
//           <p>Copyright © 2022 Amazona</p>
//         </footer>
//       </div>
//     </>
//   );
// }
