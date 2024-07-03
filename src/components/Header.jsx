import logo from "../assets/logo.png"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useWeb3js } from "../hooks/useWeb3";

function Header() {
  const navigate = useNavigate();

  const {account, connectMetamask} = useWeb3js();

  useEffect(() => {
    if (!account) {
      connectMetamask();
    }
  }, [account]);

  const handleConnect = () => {
    if (!account) {
      connectMetamask();
    }
  };
  return (
    <>
      <div className="mx-4 flex items-center justify-between">
        <div className="flex items-center">
          <img className="h-14" src={logo} />
          <p className=" text-xl font-bold">Block Blog</p>
        </div>
        <div className="flex gap-4">
          <Link to={"/"}>
            <div href="" className="cursor-pointer text-blue-500">
              Explore
            </div>
          </Link>
          <div
            href=""
            className="cursor-pointer text-black"
            onClick={handleConnect}
          >
            {account ? `${account.substring(0, 6)}...` : "Connect"}
          </div>
        </div>
        <button
          onClick={() => navigate(`/create`)}
          className="mr-4 rounded-lg bg-blue-500 px-4 py-1  text-white"
        >
          Create
        </button>
      </div>
      <hr />
    </>
  );
}

export default Header;
