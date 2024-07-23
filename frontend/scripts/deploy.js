async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    const AddressNFT = await ethers.getContractFactory("AddressNFT");
    const addressNFT = await AddressNFT.deploy();
  
    console.log("AddressNFT deployed to:", addressNFT.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  