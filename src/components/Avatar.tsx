import useUser from "@/hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useCallback } from "react";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const { data: fetchedUser } = useUser(userId);
  const router = useRouter();
  const onClick = useCallback(
    (event: any) => {
      event?.stopPropagation();

      const url = `/users/${userId}`;

      router.push(url);
    },
    [userId, router]
  );

  return (
    <div
      className={`${hasBorder ? "border-4 border-black" : ""} ${
        isLarge ? "h-32 w-32" : "w-12 h-12"
      } rounded-full hover:opacity-90 cursor-pointer transition relative`}
    >
      <Image
        alt="Avatar"
        onClick={onClick}
        src={fetchedUser?.profileImage || "/images/placeholder.png"}
        className="object-cover rounded-full"
        fill
      />
    </div>
  );
};

export default Avatar;
