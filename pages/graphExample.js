import { useQuery, gql } from "@apollo/client";

export const GET_NFTS = gql`
  query ($_name: String) {
    nfts(orderBy: $_name, first: 5) {
      id
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
      nfts {
        tokenId
        tokenURI
        nftAddress
        txHistoty {
          from
          to
          txDate
          txType
          price
        }
      }
    }
  }
`;

export default function GraphExample() {
  const { loading, error, data } = useQuery(GET_COLLECTION_NFTS, {
    variables: { _id: "0x56422b9d54af504a713c7e3a8597aaaa7a6798f5" },
  });

  console.log(data);
  return <div>hi</div>;
}
