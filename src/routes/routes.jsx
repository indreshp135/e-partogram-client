import React from 'react';

import { GeneralPageContainer } from '../containers/GeneralPageContainer';
import { AuthPageContainer } from '../containers/AuthPageContainer';
import { LandingPageContainer } from '../containers/LandingPageContainer';

import { Homepage } from '../components/Home';
import { PatientData } from '../components/PatientAdmission';
import { CronForm } from '../components/CronForms';
import { CanvasChart } from '../components/Chart';
import { NearByHospitals } from '../components/NearByHospitals';
import { AddStaff } from '../components/AddStaff';

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
  }
];

export const privateRoutes = [
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
    url: '/add-measurement/:id',
    component: <GeneralPageContainer child={<CronForm />} />,
    name: 'CronFormPageContainer',
    label: 'add-measurement'
  },
  {
    url: '/patient-history',
    component: <GeneralPageContainer child={<CanvasChart />} />,
    name: 'PatientHistoryPageContainer',
    label: 'patient-history'
  },
  {
    url: '/nearbyhospital',
    component: <GeneralPageContainer child={<NearByHospitals />} />,
    name: 'NearByHospitalPageContainer',
    label: 'near-by-hospital'
  },
  {
    url: '/add-staff',
    component: <GeneralPageContainer child={<AddStaff />} />,
    name: 'AddStaffContainer',
    label: 'add-staff'
  }
];
