import { Routes } from "@angular/router"; 


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'index',
        pathMatch: "full"
    },
    {
        path: 'index',
        loadComponent: ()=> import('./welcome/welcome.component').then(m=>m.WelcomeComponent),
        data: {
            title: 'Inicio' // Título que se mostrará en la pestaña del navegador
        }
    },
    {
        path: 'index/politicas-privacidad',
        loadComponent: ()=> import('./privacy-policies/privacy-policies.component').then(m=>m.PrivacyPoliciesComponent),
        data: {
            title: 'Politicas de privacidad' // Título que se mostrará en la pestaña del navegador
        }
    },
    {
        path: 'index/Info-Sistecredito-addi',
        loadComponent: ()=> import('./info-sistecre-and-addi/info-sistecre-and-addi.component').then(m=>m.InfoSistecreAndAddiComponent),
        data: {
            title: 'Sistecredito/addi info' // Título que se mostrará en la pestaña del navegador
        }
    },
    {
        path: 'index/Simulador-De-credito',
        loadComponent: ()=>import('./simulador-de-credito/simulador-de-credito.component').then(m=>m.SimuladorDeCreditoComponent),
        data: {
            title: 'Simulador de crédito' // Título que se mostrará en la pestaña del navegador
        }
    },
    {
        path: 'index/contacto',
        loadComponent:()=> import('./contact/contact.component').then(m=>m.ContactComponent),
        data: {
            title: 'Contact' // Título que se mostrará en la pestaña del navegador
        }
    },
    {
        path: 'index/faq',
        loadComponent: ()=> import('./frequently-asked-questions/frequently-asked-questions.component').then(m=>m.FrequentlyAskedQuestionsComponent),
        data: {
            title: 'FAQ' // Título que se mostrará en la pestaña del navegador
        }
    }
];
