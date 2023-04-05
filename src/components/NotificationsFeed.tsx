import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotification";
import { FC, useEffect } from "react";
import { BsTwitter } from "react-icons/bs";

interface NotificationsFeedProps {}

const NotificationsFeed: FC<NotificationsFeedProps> = ({}) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (fetchedNotifications.length === 0)
    return (
      <div className="p-6 text-xl text-center text-neutral-600">
        No notifications
      </div>
    );

  return (
    <div className="flex flex-col">
      {fetchedNotifications.map((notification: Record<string, any>) => (
        <div
          className="flex flex-row items-center gap-4 p-6 border-b border-neutral-800"
          key={notification.id}
        >
          <BsTwitter color="white" size={32} />
          <p className="text-white">{notification.body}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationsFeed;
