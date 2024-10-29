# Startup Fund Raiser
## Descrption
This platform is a decentralized fundraising and investment ecosystem designed to connect startups and investors transparently. Users can register, create campaigns, and contribute Ether to support various projects. Each donation earns investors points, which are converted into Reward Tokens (RTK) as incentives. The platform features investment tiers (Bronze, Silver, Gold, Platinum) to gamify participation, rewarding users with tier-based perks. All campaign data is securely stored on the blockchain, ensuring transparency. RTKs offer future utility, allowing holders potential governance voting, event access, or token trading, enhancing long-term engagement and value.


⚙️ Built using NextJS, RainbowKit, Hardhat, Wagmi, Viem, and Typescript.


## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.18)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Scaffold-ETH 2, follow the steps below:

1. Install dependencies if it was skipped in CLI:

```
cd my-dapp-example
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `packages/hardhat/hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

![e47a682f-be7c-41f1-a771-e1418478027e](https://github.com/user-attachments/assets/51f61cc3-6970-4dd4-a23e-69918af2d7e2)

Run smart contract test with `yarn hardhat:test`

- Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`
- Edit your frontend homepage at `packages/nextjs/app/page.tsx`. For guidance on [routing](https://nextjs.org/docs/app/building-your-application/routing/defining-routes) and configuring [pages/layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts) checkout the Next.js documentation.
- Edit your deployment scripts in `packages/hardhat/deploy`

## Documentation
### How the Platform Works
#### User Registration:

- Users register on the platform by providing their address, name, and email.
Registration is required to start investing in campaigns or to create a campaign.
Creating Campaigns:

- Startups or individuals create fundraising campaigns with a title, description, target funding amount, deadline, and an image.
Each campaign is stored on the blockchain, ensuring transparency and security of the fundraising process.
Campaign Goal: Raise funds within a set time frame, where each donation is publicly recorded.
Investing in Campaigns:

- Registered users can choose to invest in any active campaign by donating Ether.
Each donation is logged, and funds are sent directly to the campaign owner’s wallet.
This investment is also recorded in the smart contract, keeping a transparent record of contributions.
Earning Points and Tokens:

- Every donation earns the investor points based on the amount contributed (e.g., 1 point per 1 Ether).
Points earned are then converted into reward tokens (using an ERC20 token named "RewardToken") as a way to incentivize investment.
These tokens are minted directly to the investor’s wallet, providing them with a tangible reward and creating a sense of ownership in the project.
Investment Tiers (Gamification):

- As investors contribute more, they move up through different investment tiers: Bronze, Silver, Gold, and Platinum.
This tiered structure gamifies the experience, encouraging investors to reach higher levels through increased contributions.
Tiers could be used to unlock additional perks, such as early access to future projects, bonus tokens, or higher voting power on project decisions (if implemented).
Campaign Progress and Updates:

- Campaign owners and investors can track the progress of campaigns, viewing the total amount raised versus the target amount.
Transparent tracking builds trust and encourages more people to participate, as they can see real-time fundraising milestones.
Reward Token (RTK) Utility:

- Reward tokens (RTK) could have multiple future uses beyond fundraising.
For instance, token holders could be allowed to vote on certain decisions related to campaign governance, access special events, or trade tokens on decentralized exchanges, adding long-term value for investors.

