import RadioButton from "../../Button/Radio/Radio";
import classes from "./Activities.module.css";
import ChevronIcon from "../../../assets/icon-chevron.svg";
import { useEffect, useState } from "react";
import LinkIcon from "../../../assets/icon-link.svg";
import { formatAccount, getDuration } from "../../../utils";
import { ethers } from "ethers";
import { formatIpfsUrl } from "../../../utils/ipfs";

const sortKey = ["Show all", "Sales", "Listeds", "Transfers", "Minteds"];
const sortValue = ["All", "Sale", "Listing", "Transfer", "Minting"];

const Activities = ({ collection }) => {
  const { activities, name } = collection;
  const [activeSort, setActive] = useState(0);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [storedIpfsData, setStoredIpfsData] = useState({});

  const getImageUrl = (activity) => {
    if (storedIpfsData) {
      if (!storedIpfsData[activity.nft.tokenURI]) return null;
      return formatIpfsUrl(storedIpfsData[activity.nft.tokenURI]?.image);
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (sortValue[activeSort] !== "All") {
      const newActivities = [...activities].filter((a) => a.txType === sortValue[activeSort]);
      setFilteredActivities(newActivities);
    } else {
      setFilteredActivities(activities);
    }
    let _storedIpfsData = window.localStorage.getItem("ipfs_data");
    _storedIpfsData = JSON.parse(_storedIpfsData);
    setStoredIpfsData(_storedIpfsData);
    console.log({ activities });
  }, [activeSort]);

  return (
    <div className={classes.container}>
      <div className={classes.tabContainer}>
        <div className={classes.tabs}>
          <div className={classes.tab}>Sort by:</div>
          <div className={classes.tabBtn}>
            <span>{sortKey[activeSort]}</span>
            <ChevronIcon className={classes.chevronIcon} />
          </div>
          <div className={classes.dropdownContainer}>
            <div className={classes.dropdown}>
              {sortKey.map((s, idx) => (
                <div key={idx} className={classes.button}>
                  <RadioButton
                    id={idx}
                    active={activeSort}
                    onClick={(e) => {
                      setActive(e);
                    }}
                  />
                  <div>{s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={classes.wrapper}>
        <table>
          <tbody>
            <tr>
              <th style={{ width: "20%" }}>ITEM</th>
              <th style={{ width: "20%" }}>TYPE</th>
              <th style={{ width: "10%" }}>PRICE</th>
              <th style={{ width: "10%" }}>QUANTITY</th>
              <th style={{ width: "10%" }}>TIME</th>
              <th style={{ width: "10%" }}>FROM</th>
              <th style={{ width: "10%" }}>TO</th>
              <th style={{ width: "5%" }}></th>
            </tr>
            {filteredActivities.map((activity, idx) => (
              <tr key={idx}>
                <td>
                  <div className={classes.imageContainer}>
                    <img src={getImageUrl(activity)} alt="" />
                  </div>
                  <div>
                    <div>#{name}</div>
                    <div>{activity.nft.tokenId}</div>
                  </div>
                </td>
                <td>{activity.txType}</td>
                <td>{ethers.utils.formatEther(activity.price)} Matic</td>
                <td>1</td>
                <td>{getDuration(activity.txDate)}</td>
                <td>{formatAccount(activity.from)}</td>
                <td>{formatAccount(activity.to)}</td>
                <td>
                  <a
                    className={classes.linkBtn}
                    href={`https://mumbai.polygonscan.com/tx/${activity.txId}`}
                    target="_blank"
                    rel="noreferrer">
                    <LinkIcon />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Activities;
