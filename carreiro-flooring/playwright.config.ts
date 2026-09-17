import {defineConfig} from '@playwright/test';
export default defineConfig({timeout:120000,testDir:'./tests',fullyParallel:false,workers:1,use:{baseURL:'http://localhost:3000',headless:true},webServer:{command:'npm run start',url:'http://localhost:3000',reuseExistingServer:!process.env.CI},reporter:'list'});
