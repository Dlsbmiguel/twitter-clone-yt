import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/router";
import { FC, useCallback } from "react";
import { IconType } from "react-icons";
import { BsDot } from "react-icons/bs";

interface SidebarItemProps {
  href?: string;
  label: string;
  icon: IconType;
  onClick?: () => void;
  auth?: boolean;
  alert?: boolean;
}

const SidebarItem: FC<SidebarItemProps> = ({
  href,
  label,
  icon: Icon,
  onClick,
  auth,
  alert,
}) => {
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();
  const loginModal = useLoginModal();

  const handleClick = useCallback(() => {
    if (onClick) return onClick();

    if (auth && !currentUser) {
      loginModal.onOpen();
      return;
    } else if (href) router.push(href);
  }, [onClick, router, href, auth, loginModal, currentUser]);

  return (
    <div onClick={handleClick} className="flex flex-row items-center">
      <div className="relative flex items-center justify-center p-4 rounded-full cursor-pointer h-14 w-14 hover:bg-slate-300 hover:bg-opacity-10 lg:hidden">
        <Icon size={28} color="white" />
        {alert ? (
          <BsDot className="absolute left-0 text-sky-500 -top-4" size={70} />
        ) : null}
      </div>
      <div className="relative items-center hidden gap-4 p-4 rounded-full cursor-pointer lg:flex hover:bg-slate-300 hover:bg-opacity-10 ">
        <Icon size={28} color="white" />
        <p className="hidden text-xl text-white lg:block">{label}</p>
        {alert ? (
          <BsDot className="absolute left-0 text-sky-500 -top-4" size={70} />
        ) : null}
      </div>
    </div>
  );
};

export default SidebarItem;
