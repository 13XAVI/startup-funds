//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";
import "./RewardToken.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author BuidlGuidl
 */
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
		uint256 totalInvested; // Total amount invested
		uint256 points; // Points earned
		uint256 tokens; // Tokens earned
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

	mapping(address => User) public users; // User registration
	mapping(uint256 => Campaign) public campaigns; // Campaigns
	uint256 public numberOfCampaigns = 0;
	RewardToken public rewardToken; // ERC20 token instance

	event InvestmentUpdate(
		address indexed user,
		uint256 campaignId,
		string message
	);

	constructor(address _tokenAddress) {
		rewardToken = RewardToken(_tokenAddress); // Initialize the reward token
	}

	// Create a new campaign
	function createCampaign(
		string memory _title,
		string memory _description,
		uint256 _target,
		uint256 _deadline,
		string memory _image
	) public returns (uint256) {
		Campaign storage campaign = campaigns[numberOfCampaigns];
		require(
			_deadline > block.timestamp,
			"Deadline should be in the future"
		);

		campaign.owner = msg.sender;
		campaign.title = _title;
		campaign.description = _description;
		campaign.target = _target;
		campaign.deadline = _deadline;
		campaign.amountCollected = 0;
		campaign.image = _image;

		numberOfCampaigns++;
		return numberOfCampaigns - 1;
	}

	// Donate to a campaign
	function donateToCampaign(uint256 _id) public payable {
		require(msg.value > 0, "Donation must be greater than zero");
		Campaign storage campaign = campaigns[_id];
		campaign.donators.push(msg.sender);
		campaign.donations.push(msg.value);

		(bool sent, ) = payable(campaign.owner).call{ value: msg.value }("");
		require(sent, "Failed to send Ether");

		campaign.amountCollected += msg.value;

		// Update user investment and points
		users[msg.sender].totalInvested += msg.value;
		uint256 pointsEarned = msg.value / 1 ether; // 1 point per Ether invested
		earnPoints(msg.sender, pointsEarned);
		mintTokens(msg.sender, pointsEarned); // Mint tokens based on points earned

		emit InvestmentUpdate(msg.sender, _id, "Donation successful");
	}

	// Register a user
	function registerUser(string memory _name, string memory _email) public {
		require(
			users[msg.sender].userAddress == address(0),
			"User already registered"
		);
		users[msg.sender] = User(
			msg.sender,
			_name,
			_email, // Store the email
			InvestmentTier.Bronze,
			0,
			0,
			0
		);
	}

	// Earn points for user actions
	function earnPoints(address _user, uint256 _pointsEarned) internal {
		users[_user].points += _pointsEarned; // Increment user points
	}

	// Mint tokens based on earned points
	function mintTokens(address _user, uint256 _pointsEarned) internal {
		uint256 tokensToMint = _pointsEarned * 10; // Example: 10 tokens for each point
		rewardToken.mint(_user, tokensToMint); // Mint tokens for the user
		users[_user].tokens += tokensToMint; // Update user's token balance
	}

	// Get user information
	function getUserInfo() public view returns (User memory) {
		return users[msg.sender];
	}

	// Get campaign information
	function getCampaigns() public view returns (Campaign[] memory) {
		Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);
		for (uint256 i = 0; i < numberOfCampaigns; i++) {
			allCampaigns[i] = campaigns[i];
		}
		return allCampaigns;
	}
}
