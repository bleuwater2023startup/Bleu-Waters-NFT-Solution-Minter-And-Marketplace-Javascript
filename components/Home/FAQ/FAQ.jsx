import { useState } from "react";
import classes from "./FAQ.module.css";
import FAQCard from "./FAQCard";
import { data } from "./FAQData";

const FAQ = () => {
  const [dropdown, setDropdown] = useState("");

  return (
    <div className={classes.container}>
      <div className={classes.mainText}>FAQ</div>
      <div className={classes.subText}>
        We’re fueled to educate, onboard and help you deploy and build for web3{" "}
      </div>
      <div className={classes.faqContainer}>
        {data.map((faq, idx) => (
          <FAQCard
            key={idx}
            faq={faq}
            dropdown={dropdown}
            setDropdown={(e) => setDropdown(e === dropdown ? "" : e)}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
