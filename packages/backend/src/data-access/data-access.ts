import setupViewDataEndpoints from "./view-data-access";
import { Express } from 'express';

export default function setupDataAccessEndpoints(app:Express) {
    setupViewDataEndpoints(app)
}