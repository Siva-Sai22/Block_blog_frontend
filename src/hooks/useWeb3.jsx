import { Web3 } from "web3";
import { useState } from "react";
import { blogNFTAddress, blogNFTABI } from "../blogNftAbi";

function useWeb3js() {
  const web3_provider = new Web3(
    "https://ancient-side-sheet.ethereum-sepolia.quiknode.pro/52fdee25f52de70227bb17647461e30c41422d83/",
  );
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);

  async function connectMetamask() {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      setWeb3(web3);
    } else {
      alert("Please install Metamask");
    }
  }

  async function createBlog(blog, ipfsHash) {
    if(!account) {
      await connectMetamask();
    }
    const blogNFT = new web3.eth.Contract(blogNFTABI, blogNFTAddress);
    const title = blog.title;
    const price = Web3.utils.toWei('0.0001','ether');

    await blogNFT.methods.createBlogPost(title,ipfsHash,price).send({from: account});
  }

  return { createBlog, web3, web3_provider, account, connectMetamask };
}

export { useWeb3js };
