import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../Layout/Layout'
import TeamDetail from '../Components/TeamSection/TeamDetails'
import PortfolioDetail from '../Components/PortfolioSection/PortfolioDetails'
import ServiceDetail from '../Components/ServicesSection/ServicesDetails'
import ContactList from '../Components/Lists/ContactList'
import SubscribeList from '../Components/Lists/SubscribeList'
import FAQDetail from '../Components/FAQSection/FAQDetail'

const RoutePaths = () => {
  return (
    <>
    <Routes>
        <Route index element = {<Layout />}></Route>
        <Route path='team-detail' element = {<TeamDetail />}></Route>
        <Route path='portfolio-detail' element = {<PortfolioDetail />}></Route>
        <Route path='services-details' element = {<ServiceDetail />}></Route>
        <Route path='contact-list' element = {<ContactList />}></Route>
        <Route path='subscribe-list' element = {<SubscribeList />}></Route>
        <Route path='faq-details' element = {<FAQDetail />} />
    </Routes>
    
    </>
  )
}

export default RoutePaths