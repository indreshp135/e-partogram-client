import React from 'react';

import { GeneralPageContainer } from '../containers/GeneralPageContainer';
import { AuthPageContainer } from '../containers/AuthPageContainer';
import { LandingPageContainer } from '../containers/LandingPageContainer';

import { Homepage } from '../components/Home';
import { PatientData } from '../components/PatientAdmission';
import { CronForm } from '../components/CronForms';

export const publicRoutes = [
  {
    url: '/auth',
    component: <AuthPageContainer />,
    name: 'AuthPageContainer'
  },
  {
    url: '/',
    component: <LandingPageContainer />,
    name: 'LandingPageContainer'
  },
  {
    url: '/home',
    component: <GeneralPageContainer child={<Homepage />} />,
    name: 'HomePageContainer',
    label: 'home'
  },
  {
    url: '/add-patient',
    component: <GeneralPageContainer child={<PatientData />} />,
    name: 'PatientDataPageContainer',
    label: 'add-patient'
  },
  {
    url: '/regular-update',
    component: <GeneralPageContainer child={<CronForm />} />,
    name: 'CronFormPageContainer',
    label: 'regular-update'
  }
];

export const privateRoutes = [

];
