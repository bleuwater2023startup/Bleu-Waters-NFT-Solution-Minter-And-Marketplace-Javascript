import Link from "next/link";
import ConnectWallet from "../ConnectWallet/ConnectWallet";
import ConnectWalletMobile from "../ConnectWallet-Mobile/ConnectWallet";
import classes from "./Header.module.css";
import Search from "../Search/Search";
import { useContext, useState } from "react";
import NotificationIcon from "../../assets/icon-notification.svg";
import Logo from "../../assets/desktop-logo.svg";
import LogoMobile from "../../assets/mobile-logo.svg";
import HamburgerIcon from "../../assets/icon-hamburger.svg";
import CloseIcon from "../../assets/icon-close.svg";
import ChevronIcon from "../../assets/icon-chevron.svg";
import Twitter from "../../assets/mobile-twitter-fill.svg";
import Instagram from "../../assets/mobile-instagram-fill.svg";
import Telegram from "../../assets/mobile-telegram-fill.svg";
import { StateContext } from "../../context/state.context";
import CopyText from "../CopyText/CopyTest";
import supportedChains from "../../utils/supportedChains";
import { formatAccount } from "../../utils";
import { useRouter } from "next/router";
import { disconnectMetamask } from "../MetamaskConnect/MetamaskConnect.script";
import GlobalSearch from "../GlobalSearch/GlobalSearch";
import SearchIcon from "../../assets/icon-search.svg";

const Header = () => {
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(false);
  const { account, chainId, walletProvider, dispatch } = useContext(StateContext);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleDisconnect = () => {
    if (walletProvider?.isWalletConnect) {
      walletProvider.disconnect();
    } else {
      disconnectMetamask({ dispatch });
    }
    setNavOpen(false);
  };

  const handleToggleSearch = () => {
    setToggleSearch(true);
  };

  const handleClose = (state) => {
    if (state === "--force") return setToggleSearch(false);
    if (isActive) return;
    setToggleSearch(false);
  };

  const navDesktop = (
    <div className={`${classes.container} ${classes.desktop}`}>
      <Link href="/">
        <Logo className={classes.logo} />
      </Link>
      <div className={classes.searchContainer}>
        <Search
          disabled
          onClick={handleToggleSearch}
          placeholder="Search collections, accounts, and nfts"
          accent
        />
      </div>
      <div className={classes.link_connect_box}>
        <Link
          href="/asset/create"
          className={`${classes.link} ${
            router.asPath.includes("/asset/create") && classes.active
          }`}>
          Create
        </Link>
        <Link
          href="/explore-collections"
          className={`${classes.link} ${
            (router.asPath.includes("/explore-collections") ||
              router.asPath.includes("/assets") ||
              router.asPath.split("/")[1] === "collection") &&
            classes.active
          }`}>
          Explore
        </Link>
        <div className={classes.notificationIcon}>
          <NotificationIcon />
        </div>
        <div className={classes.connect}>
          <ConnectWallet />
        </div>
      </div>
    </div>
  );

  const navMobile = (
    <div className={`${classes.container} ${classes.mobile}`}>
      <Link href="/">
        <LogoMobile className={classes.logo} />
      </Link>
      <div className={classes.searchAndNotificationContainer}>
        <SearchIcon onClick={handleToggleSearch} className={classes.searchIcon} />
        <div className={classes.notificationIcon}>
          <NotificationIcon />
        </div>
        <HamburgerIcon onClick={() => setNavOpen(true)} className={classes.openIcon} />
      </div>
    </div>
  );

  const sidebar = (
    <div className={`${classes.sidebarContainer} ${navOpen && classes.active}`}>
      <div className={classes.sidebar}>
        <div onClick={() => setNavOpen(false)} className={classes.closeIcon}>
          <CloseIcon />
        </div>
        <div onClick={() => setNavOpen(false)} className={classes.connect}>
          <ConnectWalletMobile />
        </div>
        <div className={classes.addressContainer}>
          <div className={classes.chain}>{supportedChains[parseInt(chainId)]?.name}</div>
          <div className={classes.address}>
            <CopyText message={account} icon>
              {formatAccount(account, 5, 4)}
            </CopyText>
          </div>
        </div>
        <div className={classes.listItemContainer}>
          <Link onClick={() => setNavOpen(false)} href="/account" className={classes.listItem}>
            <div>My NFTs</div>
            <ChevronIcon className={classes.chevronIcon} />
          </Link>
        </div>
        <div className={classes.listItemContainer}>
          <Link
            onClick={() => setNavOpen(false)}
            href="/explore-collections"
            className={classes.listItem}>
            <div>Explore</div>
            <ChevronIcon className={classes.chevronIcon} />
          </Link>
        </div>
        <div className={classes.listItemContainer}>
          <Link onClick={() => setNavOpen(false)} href="/asset/create" className={classes.listItem}>
            <div>Create</div>
            <ChevronIcon className={classes.chevronIcon} />
          </Link>
        </div>
        <div className={classes.listItemContainer}>
          <Link
            onClick={() => setNavOpen(false)}
            href="/account/settings"
            className={classes.listItem}>
            <div>Settings</div>
            <ChevronIcon className={classes.chevronIcon} />
          </Link>
        </div>
        <div className={classes.listItemContainer}>
          <div onClick={handleDisconnect} className={classes.listItem}>
            <div>Disconnet wallet</div>
            <ChevronIcon className={classes.chevronIcon} />
          </div>
        </div>
        <div className={classes.socialMediaLinks}>
          <div onClick={() => setNavOpen(false)} className={classes.link}>
            <Twitter />
          </div>
          <div onClick={() => setNavOpen(false)} className={classes.link}>
            <Instagram />
          </div>
          <div onClick={() => setNavOpen(false)} className={classes.link}>
            <Telegram />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <GlobalSearch
        toggleSearch={toggleSearch}
        setIsActive={setIsActive}
        handleClose={handleClose}
      />
      {navDesktop}
      {navMobile}
      {sidebar}
    </>
  );
};

export default Header;
