import { Friends } from './friends'

export interface Resource {
  name: string
  logo: string
  desc: string
  href: string
  tags?: string[]
}

export interface ResourceCategory {
  name: string
  resources: Resource[]
}

const friends: Resource[] = Friends.map(f => {
  return {
    ...f,
    name: f.title,
    desc: f.description,
    logo: f.avatar!,
    href: f.website,
  }
})

export const resourceData: ResourceCategory[] = [
  {
    name: 'Blog👨‍💻',
    resources: friends,
  },
  {
    name: 'Develop 🛠️',
    resources: [
      {
        name: 'Foundry',
        desc: 'The Best',
        logo: 'https://getfoundry.sh/logo.png',
        href: 'https://getfoundry.sh/',
        tags: ['工具'],
      },
      {
        name: 'Hardhat',
        desc: 'Second Best',
        logo: 'https://hardhat.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhardhat-logo.5c5f687b.svg&w=384&q=75',
        href: 'https://hardhat.org/',
        tags: ['工具'],
      },
      {
        name: 'Remix',
        desc: 'Web IDE',
        logo: 'https://remix.ethereum.org/assets/img/remix-logo-blue.png',
        href: 'https://remix.ethereum.org/',
        tags: ['工具'],
      },
      {
        name: 'Auditwizard',
        desc: 'Auditor IDE',
        logo: 'https://app.auditwizard.io/static/media/fullLogoDark.19022120.png',
        href: 'https://app.auditwizard.io/',
        tags: ['工具'],
      },
    ],
  },
  {
    name: 'Fuzz 🛠️',
    resources: [
      {
        name: 'Slither',
        desc: 'The Best',
        logo: 'https://raw.githubusercontent.com/crytic/slither/master/logo.png',
        href: 'https://github.com/crytic/slither',
        tags: ['工具'],
      },
      {
        name: 'Aderyn',
        desc: 'Second Best',
        logo: 'https://github.com/Cyfrin/aderyn/raw/dev/.github/images/aderyn_logo.png',
        href: 'https://github.com/Cyfrin/aderyn',
        tags: ['工具'],
      },
      {
        name: 'Echidna',
        desc: 'Web IDE',
        logo: 'https://raw.githubusercontent.com/crytic/echidna/master/echidna.png',
        href: 'https://remix.ethereum.org/',
        tags: ['工具'],
      },
      {
        name: 'Halmos',
        desc: 'Web IDE',
        logo: 'https://avatars.githubusercontent.com/u/745163?s=200&v=4',
        href: 'https://github.com/a16z/halmos',
        tags: ['工具'],
      },
      {
        name: 'Medusa',
        desc: 'Web IDE',
        logo: '/img/logo.png',
        href: 'https://github.com/crytic/medusa',
        tags: ['工具'],
      },
    ],
  },
  {
    name: 'Decompile 🛠️',
    resources: [
        {
            name: 'dedaub',
            desc:'',
            logo:'https://app.dedaub.com/favicon.ico',
            href:'https://library.dedaub.com/decompile',
            tags: ['工具']
        },
        
        {
            name: 'bytegraph',
            desc:'',
            logo:'https://bytegraph.xyz/logo.svg',
            href:'https://bytegraph.xyz/',
            tags: ['工具']
        },
        {
            name: 'ABITool',
            desc:'',
            logo:'/img/logo.png',
            href:'https://abi.w1nt3r.xyz/',
            tags: ['工具']
        },
        {
            name: 'openchain-signatures',
            desc:'',
            logo:'/img/logo.png',
            href:'https://openchain.xyz/signatures',
            tags: ['工具']
        },{
            name: 'ABITool',
            desc:'',
            logo:'/img/logo.png',
            href:'https://gnidan.github.io/abi-to-sol/',
            tags: ['工具']
        },{
            name: 'hashex',
            desc:'',
            logo:'https://abi.hashex.org/favicon-32x32.png',
            href:'https://abi.hashex.org/',
            tags: ['工具']
        },
        {
            name: '4byte',
            desc:'',
            logo:'https://www.4byte.directory/static/images/favicon.ico',
            href:'https://www.4byte.directory/',
            tags: ['工具']
        },
        {
            name: 'etherface',
            desc:'',
            logo:'img/logo.png',
            href:'https://www.etherface.io/hash',
            tags: ['工具']
        },
        {
            name: 'calldataDecode',
            desc:'',
            logo:'img/logo.png',
            href:'https://calldata.swiss-knife.xyz/decoder',
            tags: ['工具']
        },
        {
            name: 'ethcmd',
            desc:'',
            logo:'img/logo.png',
            href:'https://www.ethcmd.com/',
            tags: ['工具']
        },
        {
            name: 'abi-w1nt3r',
            desc:'',
            logo:'img/logo.png',
            href:'https://abi.w1nt3r.xyz/',
            tags: ['工具']
        },
    ],
    },
    {
        name: 'Forum',
        resources: [
          {
            name: 'Peeranha',
            desc: 'EveryThing About Web3',
            logo: 'data:image/svg+xml;base64,PHN2ZyBpZD0iNjRiNTM4NmUtZGM2OS00ZjhiLWFiYjctN2IyODRjNTRhMmE5IiBkYXRhLW5hbWU9IkxheWVyIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDQ0OC4zMSA5Ni43Ij4gPHRpdGxlPlBlZXJhbmhhX0xvZ29fSG9yaXpvbnRhbDwvdGl0bGU+IDxnPiA8cGF0aCBpZD0iN2I1MDU0MzQtMDVlNC00NzMzLWJkMDMtNzU1OWM4MGUyM2JjIiBkYXRhLW5hbWU9IlJlY3RhbmdsZSA3IGNvcHkgNSIgZD0iTTQ3LjEsNzQuOWEyMC4zMiwyMC4zMiwwLDAsMCwxLTQuOWMyLjEuMSw0LjcuMSw3LjUuMWE0MSw0MSwwLDAsMS0uMiw1QzU0LDg2LDM5LjIsOTIuOCwzOS4yLDkyLjhhMTMuOTEsMTMuOTEsMCwwLDAsMy4yLTguNEE2OS44NSw2OS44NSwwLDAsMCw0Ny4xLDc0LjlaIiBmaWxsPSIjNTc2ZmVkIi8+IDxwYXRoIGlkPSIxYTUxMDZhNi1kZWIzLTQxODUtYjAxYy1hODA0MjFkOTBkOTciIGRhdGEtbmFtZT0iUmVjdGFuZ2xlIDUgY29weSA1IiBkPSJNMTUuNSw5Ni43czUuNC03LjQsNy0xMi42YzQuMS0zLjEsMTIuNi0xNCwxMi42LTE0cy04LjYtLjgtMTEtNy42Yy0xLjYtNC4zLTEuNi0xMi4xLTEuNi0xMi4xYTc3LjcxLDc3LjcxLDAsMCwxLTkuOCw4LjRDOC4xLDYxLjgsMCw2NC40LDAsNjQuNHMzLjItOC43LDUuNi0xMi42LDUuNi04LjQsNS42LTguNEw3LDE5LjRzNy44LDEuNywxMS4yLDUuNmE4My4yOSw4My4yOSwwLDAsMSw3LDkuOHMtLjYtMTEuMiw1LjYtMjAuMkExNi4zNCwxNi4zNCwwLDAsMSw0Ny4xLDcuN2EzMS44LDMxLjgsMCwwLDAsNS4zLDEuNGMxLjguMyw0LjItMS40LDEuOS01LjhDNTguNSw0LjQsNjIuNCw5LDYyLjQsOXMyLjgtMS41LS4zLTguNUM2OS4zLDEuMSw3MywxMi44LDczLDEyLjhBMTA5LjgxLDEwOS44MSwwLDAsMSw3My43LDAsMTksMTksMCwwLDEsODAsMTMuN3M3LjMuMSwxMC41LDYuNC0yLjEsMjguOC0yLjEsMjguOGwzLjIsMi42LDUuMy04LjgsNS40LDcuMywyLjktMTFzMy45LDMuNSw3LDdhMjAuODEsMjAuODEsMCwwLDEsNC4yLDguNFMxMTMsNjIuNiw5My45LDY3cy01MiwyLjgtNTIsMi44LDIuMSw5LjItNywxOC4zQTI2LjM0LDI2LjM0LDAsMCwxLDE1LjUsOTYuN1oiIGZpbGw9IiM3Njk5ZmYiLz4gPGNpcmNsZSBpZD0iMjRmNTM5M2QtNGQwMS00ZTlhLTk5NGUtOTU1ODA3ZDRiOGNmIiBkYXRhLW5hbWU9IkVsbGlwc2UgMSBjb3B5IDUiIGN4PSI1OC45IiBjeT0iNDAuMyIgcj0iMTYuNyIgZmlsbD0iIzFkMWQxYiIvPiA8cGF0aCBpZD0iZWU1MDVmNzEtOWEwYi00ZGYzLWIzNTgtZDZkNjVkMTViYjVhIiBkYXRhLW5hbWU9IkVsbGlwc2UgMSBjb3B5IDE2IiBkPSJNNzEuOSwzOS45QTE0Ljc4LDE0Ljc4LDAsMCwxLDY1LjgsNTBhMTMuMzQsMTMuMzQsMCwwLDAsMy43LTcuNkExMC4xNSwxMC4xNSwwLDAsMCw2MSwzMC44YTEwLjg3LDEwLjg3LDAsMCwwLTEuOC0uMUExMy42MSwxMy42MSwwLDAsMCw0Ni4xLDQyLjRhOS43LDkuNywwLDAsMC0uMSwxLjdoMGExMi40NiwxMi40NiwwLDAsMS0uMi00LjMsMTUuMTIsMTUuMTIsMCwwLDEsMTQuNi0xM0ExMS4zNiwxMS4zNiwwLDAsMSw3MiwzNy44LDE0LjA4LDE0LjA4LDAsMCwxLDcxLjksMzkuOVoiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMSIgc3R5bGU9Imlzb2xhdGlvbjogaXNvbGF0ZSIvPiA8cGF0aCBpZD0iNGUzMGFmYjYtOWI2Ny00NDE2LTlhMTAtNzNlYjgzZmE1NGRjIiBkYXRhLW5hbWU9IkVsbGlwc2UgMiBjb3B5IDUiIGQ9Ik02NC42LDI3LjRjMi45LjksNi4yLDMuOSw0LjgsNi42LTEsMi00LjEtMS4zLTctMi4xUzU1LjIsMzEuMSw1NiwyOUM1Ny4zLDI2LDYxLjcsMjYuNSw2NC42LDI3LjRaIiBmaWxsPSIjZmZmIi8+IDxwYXRoIGlkPSI0MDY3ZjIwZC1lOTlhLTQzODktODg1Mi02ZmNiMzFiZWU2MTgiIGRhdGEtbmFtZT0iUmVjdGFuZ2xlIDUgY29weSA5IiBkPSJNMTAzLjMsNTAuN2E3MS4yLDcxLjIsMCwwLDEtMjAuMS40bDQuOS04LjIsNC4yLDYuNSw0LjgtNy41LDUuNCw3LjMsMi45LTExLDcsN0MxMTMuMSw0NS45LDExMy44LDQ4LjgsMTAzLjMsNTAuN1oiIGZpbGw9IiNmNzZmNjAiLz4gPGc+IDxnPiA8cGF0aCBkPSJNMTYwLjEyLDYzLjJhMTEuNTksMTEuNTksMCwwLDEtMTAuMTEtNlY3NWgtMy4wOWE2Ljg2LDYuODYsMCwwLDEtNy02LjkzVjQzLjczYzAtMTMuMzksNi0yMi41NywyMC4xMy0yMi41NywxMC42NywwLDE4LjI2LDkuNzQsMTguMjYsMTkuODVDMTc4LjI5LDUzLjg0LDE3MS44Myw2My4yLDE2MC4xMiw2My4yWk0xNTguNDQsMzBjLTUuNTMsMC04LjYyLDQuNzgtOC42MiwxMS43MSwwLDgsMy45NCwxMi42NCw5LjkzLDEyLjY0LDQuODcsMCw4LjI0LTQuMzEsOC4yNC0xMC43N0MxNjgsMzQuMDgsMTY0LjgxLDMwLDE1OC40NCwzMFoiIGZpbGw9IiMyODI4MjgiLz4gPHBhdGggZD0iTTE5OS42Myw0Ni40NGgtNi41NWMuNzUsNS4wNiw1LjM0LDguMjQsMTEuMjQsOC4yNCw0LjIxLDAsOS4wOC0uODQsMTIuMjYtMy44NEgyMTd2My4wOWMwLDUuMTUtMy40Nyw5LjA5LTE0LjUyLDkuMDlhMTkuOCwxOS44LDAsMCwxLTE5Ljc1LTIwLjIzYzAtMTMuMzksOC4yNC0yMS44MSwxOS42Ni0yMS44MSw4LjMzLDAsMTYuMSw2LDE2LjEsMTUuNTRDMjE4LjU1LDQ0LjEsMjEyLjkzLDQ2LjQ0LDE5OS42Myw0Ni40NFptMS44OC0xNi45NGMtNC44NywwLTguMjQsMy45My04LjQzLDguNjFMMTkzLDM5LjQyaDQuNDljOS40NiwwLDExLjYxLTEsMTEuNjEtMy44NEMyMDkuMDksMzEuNDYsMjA2LjE5LDI5LjUsMjAxLjUxLDI5LjVaIiBmaWxsPSIjMjgyODI4Ii8+IDxwYXRoIGQ9Ik0yMzkuOCw0Ni40NGgtNi41NWMuNzUsNS4wNiw1LjMzLDguMjQsMTEuMjMsOC4yNCw0LjIyLDAsOS4wOC0uODQsMTIuMjctMy44NGguMzd2My4wOWMwLDUuMTUtMy40Niw5LjA5LTE0LjUxLDkuMDlhMTkuOCwxOS44LDAsMCwxLTE5Ljc2LTIwLjIzYzAtMTMuMzksOC4yNC0yMS44MSwxOS42Ny0yMS44MSw4LjMzLDAsMTYuMSw2LDE2LjEsMTUuNTRDMjU4LjYyLDQ0LjEsMjUzLjEsNDYuNDQsMjM5LjgsNDYuNDRabTEuODctMTYuOTRjLTQuODYsMC04LjI0LDMuOTMtOC40Miw4LjYxbC0uMSwxLjMxaDQuNWM5LjQ1LDAsMTEuNjEtMSwxMS42MS0zLjg0QzI0OS4yNiwzMS40NiwyNDYuMjYsMjkuNSwyNDEuNjcsMjkuNVoiIGZpbGw9IiMyODI4MjgiLz4gPHBhdGggZD0iTTI4Ny42NSwzMS43NGExNSwxNSwwLDAsMC01LjgxLTEuMjFjLTQuNDksMC02LjkzLDIuNDMtNi45Myw4LjYxVjYyLjI3SDI3Mi4yYy00LjUsMC03LjMxLTIuMjUtNy4zMS02LjQ2VjM3LjM2YzAtOCw0LjIyLTE1LjczLDE0Ljg5LTE1LjczLDYuMTgsMCw4LjMzLDMuNDcsOC4zMyw2LjU2djMuNTVaIiBmaWxsPSIjMjgyODI4Ii8+IDwvZz4gPGc+IDxwYXRoIGQ9Ik0zMTIsNjIuOTJoLTIuMDZjLTkuNTUsMC0xNi4xMS01LjMzLTE2LjExLTEyLjczLDAtNy4xMiw1LjI1LTEyLjY0LDE5Ljk1LTEyLjY0aDMuNDZWMzdjMC01LjcxLTIuNzEtNy40LTguNjEtNy40LTcuMjEsMC0xMS4yNCwyLjcyLTEyLjc0LDQuNTloLS4zN1YzMWMwLTQuNDksNC05LjgzLDE0LjYxLTkuODMsOSwwLDE3LDQuMjIsMTcsMTguMDdWNDguNUMzMjcuMjUsNTcsMzIxLDYyLjkyLDMxMiw2Mi45MlptNS40My0xOC4xNmgtMy41NmMtNy41OCwwLTkuNzQsMS43OC05Ljc0LDUuMDUsMCwzLjA5LDIuNTMsNSw2LjkzLDVzNi4zNy0yLjA2LDYuMzctNi4xOFoiIGZpbGw9IiM3Njk5ZmYiLz4gPHBhdGggZD0iTTM2NC44OSw2Mi4yN2MtNC41LDAtNy4zLTIuODEtNy4zLTYuNTZWMzkuOGMwLTYuNzUtMy05Ljc0LTguMTUtOS43NC00LjMxLDAtNy4zLDMuMjgtNy4zLDlWNjIuMzZoLTNjLTQuMjEsMC03LTIuODEtNy02LjU1VjM4LjNjMC04LjUyLDUuNjItMTcuMjMsMTguMTYtMTcuMjMsOS40NiwwLDE3LjMyLDYuMzcsMTcuMzIsMTcuNzlWNjIuMjdaIiBmaWxsPSIjNzY5OWZmIi8+IDxwYXRoIGQ9Ik00MDYuODMsNjIuMjdjLTQuMjEsMC02Ljc0LTIuMzQtNi43NC02Ljc0VjM5LjE0YzAtNi41NS0zLjU2LTkuMTgtOC05LjE4LTMuMDksMC03LjIxLDIuMzUtNy4yMSw5LjQ2VjYyLjI3aC0zLjM3Yy00LjY4LDAtNi44My0yLjYzLTYuODMtNi43NFYzaDMuMDljNC43NywwLDcuMTEsMi43Miw3LjExLDYuNDZWMjYuNTljMS41LTIuMzQsNS01LjMzLDguNzEtNS4zMywxMC4zOSwwLDE2LjQ4LDYuMTgsMTYuNDgsMTcuNlY2Mi40NWgtMy4yOFoiIGZpbGw9IiM3Njk5ZmYiLz4gPHBhdGggZD0iTTQzMy4xNCw2Mi45MmgtMi4wNmMtOS41NSwwLTE2LjEtNS4zMy0xNi4xLTEyLjczLDAtNy4xMiw1LjI0LTEyLjY0LDE5Ljk0LTEyLjY0aDMuNDdWMzdjMC01LjcxLTIuNzItNy40LTguNjItNy40LTcuMjEsMC0xMS4yMywyLjcyLTEyLjczLDQuNTloLS4zOFYzMWMwLTQuNDksNC05LjgzLDE0LjYxLTkuODMsOSwwLDE3LDQuMjIsMTcsMTguMDdWNDguNUM0NDguMzEsNTcsNDQyLDYyLjkyLDQzMy4xNCw2Mi45MlptNS40My0xOC4xNkg0MzVjLTcuNTksMC05Ljc0LDEuNzgtOS43NCw1LjA1LDAsMy4wOSwyLjUzLDUsNi45Myw1czYuNDYtMi4wNiw2LjQ2LTYuMThWNDQuNzZaIiBmaWxsPSIjNzY5OWZmIi8+IDwvZz4gPC9nPiA8L2c+IDwvc3ZnPiA=',
            href: 'https://peeranha.io/',
            tags: [],
          },
          {
            name: 'OpenzeppelinForum',
            desc:'',
            logo:'https://global.discourse-cdn.com/business6/uploads/zeppelin/original/1X/831f34f70b0fb4a0dbc449749497d7811dc75f10.png',
            href:'https://forum.openzeppelin.com/',
            tags: ['工具']
        },
        ],
    },
    {
        name: 'Transaction debugging tools',
        resources: [
          {
            name: 'etherscan',
            desc: '',
            logo: 'https://etherscan.io/assets/svg/logos/logo-etherscan.svg?v=0.0.5',
            href: 'https://etherscan.io/',
            tags: [],
          },
          {
            name: 'Phalcon',
            desc:'',
            logo:'https://assets.blocksec.com/image/1690356652768-9.png',
            href:'https://app.blocksec.com/',
            tags: ['工具']
        },
        {
            name: 'Sam\'sTransactionviewer',
            desc:'',
            logo:'https://openchain.xyz/_next/image?url=%2Ftracer.png&w=48&q=75',
            href:'https://openchain.xyz/trace',
            tags: ['工具']
        },
        
        {
            name: 'Ethtx',
            desc:'',
            logo:'img/logo.png',
            href:'https://ethtx.info/',
            tags: ['工具']
        },
        {
            name: 'Tendery',
            desc:'',
            logo:'https://dashboard.tenderly.co/static/media/logo-white-wordmark.svg',
            href:'https://dashboard.tenderly.co/explorer',
            tags: ['工具']
        },
        ],
    },
    {
        name: 'DefiTool&Website',
        resources: [
          {
            name: 'chainlist',
            desc: '',
            logo:'https://chainlist.org/favicon.ico',
            href: 'https://chainlist.org/',
            tags: [],
          },
          {
            name: 'defillama',
            desc:'',
            logo:'https://chainlist.org/favicon.ico',
            href:'https://defillama.com/',
            tags: ['工具']
        },
        ],
    },
    {
      name: 'Misc',
      resources: [
        {
          name: 'Loom',
          desc: 'For Screen Record',
          logo:'https://pbs.twimg.com/profile_images/1499889556941803523/LBloppPQ_400x400.jpg',
          href: 'https://www.loom.com/',
          tags: [],
        },
      ],
  },
]
