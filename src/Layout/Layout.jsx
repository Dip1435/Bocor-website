import React from 'react'
import Header from '../Components/Header/Header'
import SectionClient from "../Components/ClientSection/SectionClient";
import SectionAbout from "../Components/AboutSection/SectionAbout";
import SectionServices from "../Components/ServicesSection/SectionServices";
import SectionFeatures from "../Components/FeaturesSection/SectionFeatures";
import SectionPortfolio from "../Components/PortfolioSection/SectionPortfolio";
import SectionTeam from "../Components/TeamSection/SectionTeam";
import SectionPricing from "../Components/PricingSection/SectionPricing";
import SectionFAQ from "../Components/FAQSection/SectionFAQ";
import SectionContact from "../Components/ContactSection/SectionContact";
import SectionHero from "../Components/HeroSection/SectionHero";
import SectionFooter from "../Components/FooterSection/SectionFooter";

const Layout = () => {
  return (
    <>
     <Header />
      <SectionHero />
      <main className="main">
        <SectionClient />
        <SectionAbout />
        <SectionServices />
        <SectionFeatures />
        <SectionPortfolio />
        <SectionTeam />
        <SectionPricing />
        <SectionFAQ />
        <SectionContact />
        <SectionFooter />
      </main>
    </>
  )
}

export default Layout