
import  Login  from '@/assets/images/bg-login.jpeg'; 

const BackgroundLogin = () => {
  return (
    <div
      className="absolute inset-0 bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${Login})` }}
    />
  );
};

export default BackgroundLogin;
