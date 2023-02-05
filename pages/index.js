import Head from "next/head";
import Banner from "../components/Home/Banner/Banner";
import Benefits from "../components/Home/Benefits/Benefits";
import Brand from "../components/Home/Brand/Brand";
import Collections from "../components/Home/Collections/Collections";
import Connect from "../components/Home/Connect/Connect";
import FAQ from "../components/Home/FAQ/FAQ";
import Features from "../components/Home/Features/Features";
import SocialMediaLinks from "../components/Home/SocialMediaLinks/SocialMediaLinks";
import classes from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={classes.container}>
      <Head>
        <title>BleuWater Ecosystem</title>
        <meta name="description" content="NFT Minter | Marketplace | Ownership | Community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner />
      <Brand />
      <Features />
      <Collections />
      <Benefits />
      <Connect />
      <FAQ />
      <SocialMediaLinks />
    </div>
  );
}
