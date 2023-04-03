import Header from "@/components/Header";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import { FC } from "react";
import { ClipLoader } from "react-spinners";

interface UserViewProps {}

const UserView: FC<UserViewProps> = ({}) => {
  const router = useRouter();
  const { userId } = router.query;

  const { data: fetchedUser, isLoading } = useUser(userId as string);

  if (isLoading || !fetchedUser)
    return (
      <div className="flex items-center justify-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );

  return (
    <>
      <Header showBackArrow label={fetchedUser?.name} />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
    </>
  );
};

export default UserView;
