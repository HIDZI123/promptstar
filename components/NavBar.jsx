"use client";
import Link from "next/link";
import Image from "next/image";
import img from "@public/assets/images/logo.svg";
import img2 from "@public/assets/icons/copy.svg";
import { useEffect, useState } from "react";
import { signIn, signOut, getProviders, getSession } from "next-auth/react";

const NavBar = () => {
  const [toggle, settoggle] = useState(false);
  const [providers, setProviders] = useState(null);
  const isSignedIn = true;

  useEffect(() => {
    const settingProviders = async () => {
      const response = await getProviders();
      console.log("Respose", response);
      setProviders(response);
    };
    settingProviders();
  }, []);

  return (
    <nav className="w-full flex-between pt-3 mb-16">
      <Link href="/" className="flex justify-center items-center gap-2 ">
        <Image
          src={img}
          height={30}
          width={30}
          alt="PromptStar logo"
          className="object-contain "
        />
        <p className="logo_text">PromptStar</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {isSignedIn ? (
          <div className="flex justify-center items-center gap-5">
            <Link href="/create-post">
              <button className="black_btn">Create Post</button>
            </Link>
            <button className="outline_btn">Sign Out</button>
            <Link href="/profile" className="rounded-full">
              <Image
                src={img2}
                alt="ProfileIcture"
                width={30}
                height={30}
                className="object-contain"
              />
            </Link>
          </div>
        ) : (
          <div>
            {providers &&
              Object.values(providers).map((provider) => {
                <button
                  type="button"
                  className="black_btn"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>;
              })}
          </div>
        )}
      </div>

      {/*  Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {isSignedIn ? (
          <div className="flex ">
            <Image
              src={img2}
              alt="ProfileIcture"
              width={30}
              height={30}
              className="object-contain"
              onClick={() => settoggle((prev) => !prev)}
            />

            {toggle && (
              <div className="dropdown flex-col justify-center items-center">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => settoggle((prev) => !prev)}
                >
                  Profile
                </Link>
                <Link
                  href="/create-post"
                  className="dropdown_link"
                  onClick={() => settoggle((prev) => !prev)}
                >
                  Create Post
                </Link>
                <button
                  className="black_btn w-full mt-5"
                  onClick={() => settoggle((prev) => !prev)}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            {providers &&
              Object.values(providers).map((provider) => {
                <button
                  type="button"
                  className="black_btn"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>;
              })}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
