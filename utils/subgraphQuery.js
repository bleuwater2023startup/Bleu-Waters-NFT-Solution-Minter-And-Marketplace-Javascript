import { gql } from "@apollo/client";
// convert query params to lower case

/**
 * ############################################### Beginning of Dashboard ##################################
 */
export const GET_USER_COLLECTED_NFTS = gql`
  query ($_account: String) {
    user(id: $_account) {
      id
      nfts(orderBy: tokenId, orderDirection: desc) {
        id
        nftAddress
        tokenId
        tokenURI
        txHistory(orderBy: txDate, orderDirection: desc) {
          from
          id
          price
          to
          txDate
          txId
          txType
        }
        collection {
          creator {
            id
          }
          name
          chainId
        }
        owner {
          id
        }
      }
    }
  }
`;

export const GET_USER_CREATED_NFTS = gql`
  query ($_account: String) {
    user(id: $_account) {
      id
      collections(orderBy: createdAt, orderDirection: desc) {
        id
        name
        chainId
        nfts {
          id
          nftAddress
          tokenId
          tokenURI
          txHistory(orderBy: txDate, orderDirection: desc) {
            from
            id
            price
            to
            txDate
            txId
            txType
          }
          collection {
            creator {
              id
            }
            name
            chainId
          }
          owner {
            id
          }
        }
      }
    }
  }
`;

export const GET_ACTIVE_LISTING = gql`
  query ($_account: String) {
    user(id: $_account) {
      id
      nfts {
        id
        nftAddress
        tokenId
        tokenURI
        txHistory(orderBy: txDate, orderDirection: desc, first: 1) {
          from
          id
          price
          to
          txDate
          txId
          txType
        }
        collection {
          creator {
            id
          }
          name
          chainId
        }
        owner {
          id
        }
      }
    }
  }
`;

// export const GET_MY_NFTS= gql``;

/**
 * ############################################### Beginning of Explore ##################################
 */

export const GET_1of1_COLLECTIONS = gql`
  query ($_id: String) {
    collections(where: { type: Single, creator: $_id }, orderBy: createdAt, orderDirection: desc) {
      id
      name
      symbol
      chainId
      nfts {
        id
        royaltyInfo
      }
    }
  }
`;

export const GET_COLLECTIONS = gql`
  {
    collections(orderBy: createdAt, orderDirection: desc) {
      name
      id
      nfts {
        tokenURI
      }
    }
  }
`;

export const GET_COLLECTION_NFTS = gql`
  query ($_id: String) {
    collection(id: $_id) {
      id
      name
      symbol
      type
      createdAt
      chainId
      creator {
        id
      }
      nfts {
        id
        tokenId
        tokenURI
        nftAddress
        txHistory(orderBy: txDate, orderDirection: desc) {
          from
          to
          txDate
          txType
          price
          txId
        }
      }
      priceHistory(orderBy: price) {
        price
      }
      owners {
        owner
      }
      activities(orderBy: txDate, orderDirection: desc) {
        id
        txType
        price
        from
        to
        txDate
        txId
        nft {
          tokenId
          tokenURI
        }
      }
    }
  }
`;

/**
 * ############################################### Beginning of Nft ##################################
 */

export const GET_NFT_DETAIL = gql`
  query ($_contractAddress: String, $_tokenId: String) {
    collection(id: $_contractAddress) {
      id
      name
      symbol
      type
      createdAt
      chainId
      nfts(where: { tokenId: $_tokenId }) {
        id
        tokenId
        tokenURI
        nftAddress
        royaltyInfo
        txHistory(orderBy: txDate, orderDirection: desc) {
          from
          to
          txDate
          txType
          price
          txId
        }
        owner {
          id
        }
        collection {
          creator {
            id
          }
          name
          chainId
        }
      }
    }
  }
`;

export const GET_SIMILAR_NFTS = gql`
  query ($_contractAddress: String) {
    collection(id: $_contractAddress) {
      id
      name
      chainId
      nfts {
        tokenId
        tokenURI
        nftAddress
      }
    }
  }
`;

export const GET_ROYALTIES = gql`
  query ($_account: String) {
    royalties(where: { payees_: { account_contains: $_account } }) {
      id
      paymentSplitter
      royaltyFeesInBips
      payees {
        account
      }
      collection {
        id
        name
      }
    }
  }
`;

/**
 * ############################################### Beginning of Search ##################################
 */

export const GET_SEARCH = gql`
  query ($_value: String) {
    Collection: collections(where: { name_contains: $_value }) {
      id
      name
    }
    Address: collections(where: { id: $_value }) {
      id
      name
    }
    Account: users(where: { id: $_value }) {
      id
    }
    NFTs: nfts(where: { id: $_value }) {
      nftAddress
      tokenId
      id
      collection {
        chainId
      }
    }
  }
`;
