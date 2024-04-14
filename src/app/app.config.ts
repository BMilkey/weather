import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {provideRouter, RouterModule, RouterOutlet} from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp} from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import {FIREBASE_OPTIONS} from "@angular/fire/compat";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    {provide: FIREBASE_OPTIONS, useValue: {"projectId":"weather-app-77309","appId":"1:181676938284:web:2c4892ed7e35cf556c2d89","storageBucket":"weather-app-77309.appspot.com","apiKey":"AIzaSyCI-LFATIJUfLc5SWiatZ4a7mYz8qlxE-g","authDomain":"weather-app-77309.firebaseapp.com","messagingSenderId":"181676938284","measurementId":"G-3V66L0KG7L"}},
    importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"weather-app-77309","appId":"1:181676938284:web:2c4892ed7e35cf556c2d89","storageBucket":"weather-app-77309.appspot.com","apiKey":"AIzaSyCI-LFATIJUfLc5SWiatZ4a7mYz8qlxE-g","authDomain":"weather-app-77309.firebaseapp.com","messagingSenderId":"181676938284","measurementId":"G-3V66L0KG7L"}))),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(RouterModule.forRoot(routes)),
    importProvidersFrom(RouterOutlet)]
};



// importProvidersFrom(provideAuth(() => getAuth())),
//   importProvidersFrom(provideFirestore(() => getFirestore()))
//importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"weather-app-77309","appId":"1:181676938284:web:2c4892ed7e35cf556c2d89","storageBucket":"weather-app-77309.appspot.com","apiKey":"AIzaSyCI-LFATIJUfLc5SWiatZ4a7mYz8qlxE-g","authDomain":"weather-app-77309.firebaseapp.com","messagingSenderId":"181676938284","measurementId":"G-3V66L0KG7L"}
