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
import SearchIcon from "../../assets/icon-search.svg";
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

const Header = () => {
  const [searchValue, setSearchValue] = useState("");
  const [navOpen, setNavOpen] = useState(false);
  const { account, chainId } = useContext(StateContext);

  const router = useRouter();

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    console.log({ searchValue: e.target.value });
  };

  const navDesktop = (
    <div className={`${classes.container} ${classes.desktop}`}>
      <Link href="/">
        <Logo className={classes.logo} />
      </Link>
      <div className={classes.searchContainer}>
        <Search
          value={searchValue}
          onChange={handleChange}
          placeholder="Search"
          accent
        />
      </div>
      <div className={classes.link_connect_box}>
        <Link
          href="/asset/create"
          className={`${classes.link} ${
            router.asPath === "/asset/create" && classes.active
          }`}
        >
          Create
        </Link>
        <Link
          href="/explore-collections"
          className={`${classes.link} ${
            router.asPath === "/explore-collections" && classes.active
          }`}
        >
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
      <div className={classes.icons}>
        <SearchIcon className={classes.searchIcon} />
        <div className={classes.notificationIcon}>
          <NotificationIcon />
        </div>
        <HamburgerIcon
          onClick={() => setNavOpen(true)}
          className={classes.openIcon}
        />
      </div>
    </div>
  );

  const sidebar = (
    <div className={`${classes.sidebarContainer} ${navOpen && classes.active}`}>
      <div className={classes.sidebar}>
        <div onClick={() => setNavOpen(false)} className={classes.closeIcon}>
          <CloseIcon />
        </div>
        <div className={classes.connect}>
          <ConnectWalletMobile />
        </div>
        <div className={classes.addressContainer}>
          <div className={classes.chain}>
            {supportedChains[parseInt(chainId)]?.name}
          </div>
          <div className={classes.address}>
            <CopyText message={account}>
              {formatAccount(account, 5, 4)}
            </CopyText>
          </div>
        </div>
        <div className={classes.listItemContainer}>
          <Link href="/account" className={classes.listItem}>
            <div>My NFTs</div>
            <ChevronIcon className={classes.chevronIcon} />
          </Link>
        </div>
        <div className={classes.listItemContainer}>
          <Link href="/explore-collections" className={classes.listItem}>
            <div>Explore</div>
            <ChevronIcon className={classes.chevronIcon} />
          </Link>
        </div>
        <div className={classes.listItemContainer}>
          <Link href="/asset/create" className={classes.listItem}>
            <div>Create</div>
            <ChevronIcon className={classes.chevronIcon} />
          </Link>
        </div>
        <div className={classes.listItemContainer}>
          <Link href="/" className={classes.listItem}>
            <div>Support</div>
            <ChevronIcon className={classes.chevronIcon} />
          </Link>
        </div>
        <div className={classes.listItemContainer}>
          <Link href="/" className={classes.listItem}>
            <div>Disconnet wallet</div>
            <ChevronIcon className={classes.chevronIcon} />
          </Link>
        </div>
        <div className={classes.socialMediaLinks}>
          <div className={classes.link}>
            <Twitter />
          </div>
          <div className={classes.link}>
            <Instagram />
          </div>
          <div className={classes.link}>
            <Telegram />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {navDesktop}
      {navMobile}
      {sidebar}
    </>
  );
};

export default Header;
