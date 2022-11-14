import React from "react";
import Footer from "../Shared/Footer";
import Banner from "./Banner";
import Contact from "./Contact";
import Infos from "./Infos";

const Home = () => {
  return (
    <div className="bg-white text-black">
      <Banner />
      <Infos />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
