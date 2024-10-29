// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "hardhat/console.sol";
import "./RewardToken.sol";

contract StartupFunding {
	enum InvestmentTier {
		Bronze,
		Silver,
		Gold,
		Platinum
	}

	struct User {
		address userAddress;
		string name;
		string email;
		InvestmentTier tier;
		uint256 totalInvested;
		uint256 points;
		uint256 tokens;
	}

	struct Campaign {
		address owner;
		string title;
		string description;
		uint256 target;
		uint256 deadline;
		uint256 amountCollected;
		string image;
		address[] donators;
		uint256[] donations;
	}

	uint256 public nextCampaignId = 1;
	mapping(address => User) public users;
	mapping(uint256 => Campaign) public campaigns;
	uint256 public numberOfCampaigns = 0;
	RewardToken public rewardToken;

	event CampaignCreated(
		uint256 indexed id,
		address indexed owner,
		string title
	);
	event InvestmentUpdate(
		address indexed user,
		uint256 campaignId,
		string message
	);

	constructor(address _tokenAddress) {
		rewardToken = RewardToken(_tokenAddress);
	}

	// Create a new campaign
	function createCampaign(
		string memory _title,
		string memory _description,
		uint256 _target,
		uint256 _deadline,
		string memory _image
	) public returns (uint256) {
		require(
			_deadline > block.timestamp,
			"Deadline should be in the future"
		);

		Campaign storage campaign = campaigns[nextCampaignId];
		campaign.owner = msg.sender;
		campaign.title = _title;
		campaign.description = _description;
		campaign.target = _target;
		campaign.deadline = _deadline;
		campaign.amountCollected = 0;
		campaign.image = _image;

		emit CampaignCreated(nextCampaignId, msg.sender, _title);

		nextCampaignId++;
		numberOfCampaigns++;
		return nextCampaignId - 1;
	}

	// Donate to a specific campaign
	function donateToCampaign(uint256 _id) public payable {
		require(msg.value > 0, "Donation must be greater than zero");
		Campaign storage campaign = campaigns[_id];
		require(campaign.owner != address(0), "Campaign does not exist");
		require(block.timestamp < campaign.deadline, "Campaign has expired");

		campaign.donators.push(msg.sender);
		campaign.donations.push(msg.value);

		(bool sent, ) = payable(campaign.owner).call{ value: msg.value }("");
		require(sent, "Failed to send Ether");

		campaign.amountCollected += msg.value;

		// Update user investment and points
		users[msg.sender].totalInvested += msg.value;
		uint256 pointsEarned = msg.value / 1 ether;
		earnPoints(msg.sender, pointsEarned);
		mintTokens(msg.sender, pointsEarned);

		emit InvestmentUpdate(msg.sender, _id, "Donation successful");
	}

	// Register a user
	function registerUser(string memory _name, string memory _email) public {
		require(
			users[msg.sender].userAddress == address(0),
			"User already registered"
		);

		users[msg.sender] = User({
			userAddress: msg.sender,
			name: _name,
			email: _email,
			tier: InvestmentTier.Bronze,
			totalInvested: 0,
			points: 0,
			tokens: 0
		});
	}

	// Internal function to earn points
	function earnPoints(address _user, uint256 _pointsEarned) internal {
		users[_user].points += _pointsEarned;
	}

	// Internal function to mint tokens
	function mintTokens(address _user, uint256 _pointsEarned) internal {
		uint256 tokensToMint = _pointsEarned * 10;
		rewardToken.mint(_user, tokensToMint);
		users[_user].tokens += tokensToMint;
	}

	// Get all campaigns
	function getCampaigns() public view returns (Campaign[] memory) {
		Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);
		uint256 currentIndex = 0;
		for (uint256 i = 1; i < nextCampaignId; i++) {
			if (campaigns[i].owner != address(0)) {
				allCampaigns[currentIndex] = campaigns[i];
				currentIndex++;
			}
		}
		return allCampaigns;
	}
}
