import { assets } from "../assets/assets.ts";

const ProfilePage: React.FC = () => {
  return (
    <div className="relative h-[150px] flex flex-col items-center justify-center">
      <img
        src={assets.user_icon}
        alt="user-icon"
        className="rounded-full border-2 border-white h-16 w-16 absolute -top-8"
      />
      <h2 className="text-2xl mt-10">Hello Developer!</h2>
    </div>
  );
};

export default ProfilePage;
