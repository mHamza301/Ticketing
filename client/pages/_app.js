import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-Client';
import HeaderComp  from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
    return (
        <div>
            <HeaderComp currentUser={currentUser} />
            <Component {...pageProps} />
        </div>
        
    ); 
};

AppComponent.getInitialProps =  async (appContext) => {
    const { data } = await buildClient(appContext.ctx).get('/api/users/currentuser');

    let pageProps = {};
    if(appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }
    
    return {
        pageProps,
        currentUser: data.currentUser
    };

};


export default AppComponent;