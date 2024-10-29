"use client";

import { useMemo, useState } from "react";
import { useEffect, useReducer } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import TransactionPage from "../blockexplorer/transaction/[txHash]/page";
import { ContractUI } from "../debug/_components/contract";
import { ContractVariables } from "../debug/_components/contract/ContractVariables";
import { FolderSync, Gift, Home, ListCheck, LogOut, PlusCircle, Send } from "lucide-react";
import CreateCampaignForm from "~~/components/CreateCampaignForm";
import TransferOwnership from "~~/components/TransferOwnership";
import { TrasfersForm } from "~~/components/TrasfersForm";
import { Avatar, AvatarFallback, AvatarImage } from "~~/components/ui/avatar";
import { useDeployedContractInfo, useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { ContractName } from "~~/utils/scaffold-eth/contract";
import { useAllContracts } from "~~/utils/scaffold-eth/contractsData";

// Define the Campaign interface
interface Campaign {
  owner: string;
  title: string;
  description: string;
  target: bigint;
  deadline: bigint;
  amountCollected: bigint;
  image: string;
  donators: string[];
  donations: bigint[];
}

function HomeDash() {
  const [activePage, setActivePage] = useState("home");
  const router = useRouter();
  const contractsData = useAllContracts();
  const contractNames = useMemo(() => Object.keys(contractsData) as ContractName[], [contractsData]);

  const [createCampaignModel, setCreateCampaignModel] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [transactionReceipt, setTransactionReceipt] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { data: allCampaigns } = useScaffoldReadContract({
    contractName: "StartupFunding",
    functionName: "getCampaigns",
  });

  const hanldleLogout = () => {
    router.push("/");
  };
  const fetchCampaigns = async (): Promise<Campaign[]> => {
    // Map the campaigns to the correct Campaign type
    return (allCampaigns || []).map(campaign => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: BigInt(campaign.target.toString()), // Ensure it's of type bigint
      deadline: BigInt(campaign.deadline.toString()),
      amountCollected: BigInt(campaign.amountCollected.toString()),
      image: campaign.image,
      donators: [...campaign.donators], // Convert readonly to mutable array
      donations: [...campaign.donations],
    }));
  };
  useEffect(() => {
    const loadCampaigns = async () => {
      const fetchedCampaigns = await fetchCampaigns();

      setCampaigns([...fetchedCampaigns]);
    };
    console.log("fetched campaigns ", fetchCampaigns);
    loadCampaigns();
  }, []);

  const [refreshDisplayVariables, triggerRefreshDisplayVariables] = useReducer(value => !value, false);
  const { data: deployedContractData, isLoading: deployedContractLoading } = useDeployedContractInfo("StartupFunding");
  useEffect(() => {}, [deployedContractData]);
  // Mock function to simulate creating a campaign
  const createCampaign = async (campaignData: any) => {
    // This is where you would implement your actual create campaign logic.
    // Simulating a successful transaction receipt
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          status: "success",
          transactionHash: "0x1234567890abcdef",
          from: "0xYourWalletAddress",
          to: "0xContractAddress",
          blockNumber: 123456,
          gasUsed: 21000,
          effectiveGasPrice: 1000000000,
          logsBloom: "0x...",
          cumulativeGasUsed: 21000,
        });
      }, 2000);
    });
  };

  const handleCreateCampaign = async (campaignData: any) => {
    try {
      const receipt = await createCampaign(campaignData);
      setTransactionReceipt(receipt);
      setCreateCampaignModel(false);

      // Refetch campaigns after creation
      const updatedCampaigns = await fetchCampaigns();
      setCampaigns(updatedCampaigns);
    } catch (err) {
      setError("Failed to create campaign. Please try again.");
      console.error(err);
    }
  };

  const renderTransactionReceipt = () => {
    if (!transactionReceipt) return null;

    return (
      <div className="mt-4 p-4 bg-gray-100 rounded-md">
        <h2 className="text-lg font-bold">Transaction Receipt</h2>
      </div>
    );
  };

  const renderContent = () => {
    switch (activePage) {
      case "home":
        return (
          <>
            <div className="flex justify-between items-center mb-6 bg-[#2A292E]">
              <h1 className="text-3xl font-bold">Startup Fund Raise</h1>
              <Button
                className="border-2 border-blue-500 px-4 py-2 text-sm font-semibold hover:ease-in-out hover:bg-blue-600"
                onClick={() => setCreateCampaignModel(true)}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Campaign
              </Button>
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 bg-[#2A292E]">
              {campaigns.map((campaign, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{campaign.title}</CardTitle>
                    <CardDescription>Goal: {campaign.target.toString()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Raised: {campaign.amountCollected.toString()}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {createCampaignModel && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
                <div className="bg-black/70 p-3 rounded-lg shadow-lg w-full max-w-lg relative">
                  <button
                    onClick={() => setCreateCampaignModel(false)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  >
                    &times;
                  </button>
                  <CreateCampaignForm onClose={() => setCreateCampaignModel(false)} onCreate={handleCreateCampaign} />
                </div>
              </div>
            )}
            <div>
              <h1 className="text-3xl flex justify-center items-center font-medium "> Transaction Occured</h1>
              <div className="flex items-start justify-start p-4 border border-white rounded-lg ">
                {deployedContractData && (
                  <ContractVariables
                    refreshDisplayVariables={refreshDisplayVariables}
                    deployedContractData={deployedContractData}
                  />
                )}
              </div>
            </div>

            {renderTransactionReceipt()}
          </>
        );
      case "transfer":
        return contractNames.map((contractName, i) => <TrasfersForm key={i} contractName={contractName} />);

      case "allcampains":
        return (
          <div>
            <h2 className="text-2xl font-bold">All campaigns</h2>
            <table className="min-w-full min-h-full">
              <thead className="text-[12px] leading-[26px]">
                <tr className="bg-[#101313] rounded-[10px]">
                  <th className="px-4 text-left text-grey text-[12px] leading-[26px] rounded-tl-lg rounded-bl-lg">
                    ID
                  </th>
                  <th className="px-4 text-left text-grey text-[12px] leading-[26px]">Owner</th>
                  <th className="px-4 text-left text-grey text-[12px] leading-[26px]">Image</th>
                  <th className="px-4 text-left text-grey text-[12px] leading-[26px]">Title</th>
                  <th className="px-4 text-left text-grey text-[12px] leading-[26px]">Target</th>
                  <th className="px-4 text-left text-grey text-[12px] leading-[26px]">Amount Collected</th>
                  <th className="px-4 text-left text-grey text-[12px] leading-[26px]">Deadline</th>
                  <th className="px-4 text-left text-grey text-[12px] leading-[26px]">Donators</th>
                  <th className="px-4 text-left text-grey text-[12px] leading-[26px]">Donations</th>
                  <th className="px-4 text-left text-grey text-[12px] leading-[26px] rounded-tr-lg rounded-br-lg">
                    Action
                  </th>
                </tr>
                <tr className="h-[20px]"></tr>
              </thead>

              <tbody>
                {!allCampaigns &&
                  Array(6)
                    .fill(null)
                    .map((_, index) => (
                      <tr
                        key={index}
                        className="border-b-[2.5px] min-w-full h-[60px] border-[#F5F6F6] last:border-none"
                      >
                        {Array(9)
                          .fill(null)
                          .map((_, cellIndex) => (
                            <td key={cellIndex} className="">
                              <div className="shadow-lg animate-pulse bg-slate-300 rounded-lg h-[40px]"></div>
                            </td>
                          ))}
                      </tr>
                    ))}

                {allCampaigns?.map((campaign, index) => (
                  <tr key={index} className="border-b-[2.5px] min-w-full h-[60px] border-[#F5F6F6] last:border-none">
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">{campaign.owner || "N/A"}</td>
                    <td className="text-center">
                      {campaign.image ? (
                        <img src={campaign.image} alt={campaign.title} className="w-16 h-16 object-cover" />
                      ) : (
                        <div>No Image</div>
                      )}
                    </td>
                    <td className="text-center">{campaign.title || "N/A"}</td>
                    <td className="text-center">{String(campaign.target)}</td>
                    <td className="text-center">{String(campaign.amountCollected)}</td>
                    <td className="text-center">
                      {campaign.deadline ? new Date(Number(campaign.deadline) * 1000).toLocaleDateString() : "N/A"}
                    </td>

                    <td className="text-center">{campaign.donators.length}</td>
                    <td className="text-center">{campaign.donations.length}</td>
                    <td className="text-center">
                      <button className="text-blue-500 hover:underline">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "rewards":
        return <h2 className="text-2xl font-bold">Rewards</h2>;
      case "transferOwnership":
        return <TransferOwnership />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-[#131217]/90 ">
      {/* Sidebar */}
      <div className="w-64 shadow-md bg-[#131217]/40">
        <div className="p-4">
          <div className="flex items-center space-x-4 mb-6">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>M</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">User </h2>
              <p className="text-sm text-gray-500">user@gmail.com</p>
            </div>
          </div>
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start" onClick={() => setActivePage("home")}>
              <Home className="mr-2 h-4 w-4" /> Home
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => setActivePage("allcampains")}>
              <ListCheck className="mr-2 h-4 w-4" /> All Campaigns
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => setActivePage("transfer")}>
              <Send className="mr-2 h-4 w-4" /> Transfer Token
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => setActivePage("transferOwnership")}>
              <FolderSync className="mr-2 h-4 w-4" /> Transfer Ownership
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => setActivePage("rewards")}>
              <Gift className="mr-2 h-4 w-4" /> Rewards
            </Button>
          </nav>
        </div>
        <div className="absolute bottom-4 left-4">
          <Button variant="ghost" className="text-red-500 hover:text-red-700" onClick={hanldleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 overflow-auto">{renderContent()}</div>
    </div>
  );
}

export default HomeDash;
