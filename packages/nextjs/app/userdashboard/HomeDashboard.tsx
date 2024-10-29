"use client";

import { useMemo, useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Gift, Home, LogOut, PlusCircle, Send } from "lucide-react";
import CreateCampaignForm from "~~/components/CreateCampaignForm";
import TransferOwnership from "~~/components/TransferOwnership";
import { TrasfersForm } from "~~/components/TrasfersForm";
import { Avatar, AvatarFallback, AvatarImage } from "~~/components/ui/avatar";
import { ContractName } from "~~/utils/scaffold-eth/contract";
import { useAllContracts } from "~~/utils/scaffold-eth/contractsData";

function HomeDash() {
  const [activePage, setActivePage] = useState("home");
  const contractsData = useAllContracts();
  const contractNames = useMemo(() => Object.keys(contractsData) as ContractName[], [contractsData]);

  const campaigns = [
    { id: 1, name: "Tech Startup A", goal: "$500,000", raised: "$250,000" },
    { id: 2, name: "Green Energy Project", goal: "$1,000,000", raised: "$750,000" },
    { id: 3, name: "AI Research Fund", goal: "$2,000,000", raised: "$1,500,000" },
  ];

  const renderContent = () => {
    switch (activePage) {
      case "home":
        return (
          <>
            <div className="flex justify-between items-center mb-6 ">
              <h1 className="text-3xl font-bold">Startup Fund Raise</h1>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Create Campaign
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {campaigns.map(campaign => (
                <Card key={campaign.id}>
                  <CardHeader>
                    <CardTitle>{campaign.name}</CardTitle>
                    <CardDescription>Goal: {campaign.goal}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Raised: {campaign.raised}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        );
      case "create":
        return <CreateCampaignForm />;
      case "transfer":
        return contractNames.map((contractName, i) => <TrasfersForm key={i} contractName={contractName} />);
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
      <div className="w-64  shadow-md bg-[#131217]/40">
        <div className="p-4">
          <div className="flex items-center space-x-4 mb-6">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>M</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">Mashami</h2>
              <p className="text-sm text-gray-500">mashami@gmail.com</p>
            </div>
          </div>
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start" onClick={() => setActivePage("home")}>
              <Home className="mr-2 h-4 w-4" /> Home
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => setActivePage("create")}>
              <PlusCircle className="mr-2 h-4 w-4" /> Create Campaign
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => setActivePage("transfer")}>
              <Send className="mr-2 h-4 w-4" /> Transfer Token
            </Button>

            <Button variant="ghost" className="w-full justify-start" onClick={() => setActivePage("transferOwnership")}>
              <Send className="mr-2 h-4 w-4" /> Transfer Ownership
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => setActivePage("rewards")}>
              <Gift className="mr-2 h-4 w-4" /> Rewards
            </Button>
          </nav>
        </div>
        <div className="absolute bottom-4 left-4">
          <Button variant="ghost" className="text-red-500 hover:text-red-700">
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
