import buildClient from '../api/build-Client';


const defaultPage = ({ currentUser }) => {
   return currentUser ? 
   (<h1>You are Signed In</h1>) : 
   (<h1>You are not Signed In</h1>); 
};

defaultPage.getInitialProps = async (context) => {
    const { data } = await buildClient(context).get('/api/users/currentuser')
    
    return data;

};
    

export default defaultPage;