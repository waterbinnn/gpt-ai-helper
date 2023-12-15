import type { NextPage } from 'next';
import { Chatbot } from '../containers';

const Home: NextPage = () => {
  return (
    <div className='container'>
      <Chatbot />
    </div>
  );
};

export default Home;
