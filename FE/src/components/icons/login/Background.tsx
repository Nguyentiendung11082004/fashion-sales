import Login from '@/assets/images/bg-login.jpeg';
const BackgroundLogin = () => {
  return (
    <div
      className="fixed inset-0 bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${Login})`, backgroundSize: 'cover' }}
    />
  );
};



export default BackgroundLogin;
