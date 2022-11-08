import { Request, Response, NextFunction, Router } from "express";

import Web3 from "web3";
import web3Provider from "../lib/web3Provider";

const TRACEABILITY_OWNER = process.env.TRACEABILITY_OWNER!;

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const info: any = {
    "name": process.env.npm_package_name,
    "version": process.env.npm_package_version,
  };

  try {
    const web3 = new Web3(web3Provider);
    const balance = await web3.eth.getBalance(TRACEABILITY_OWNER);
    info.goerli = {}
    info.goerli.owner = TRACEABILITY_OWNER;

    if(balance){
      let fbalance = Number(web3.utils.fromWei(balance)).toFixed(4);
      info.goerli.ownerBalance = `${fbalance} ETH`;
    }


    info.lacchain = {};

    info.lacchain.traceability = {
      address: process.env.LACCHAIN_TRACEABILITY_ADDRESS
    }





  } catch (err) {
    console.log(err);
  }

  console.log(info)

  return res.json(info);
})








export default router;