import axios from 'axios';


const buildClient = ({ req }) => {
    if(typeof window === 'undefined') {
        //Request issued for server

        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        });   
    } else {
        //Request issued from browser

        return axios.create({
            baseURL: '/'
        });

    }

};

export default buildClient;