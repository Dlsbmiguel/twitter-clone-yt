import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { FC, useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";

interface RegisterModalProps {}

const RegisterModal: FC<RegisterModalProps> = ({}) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(() => {
    try {
      setIsLoading(true);

      // TODO ADD REGISTER AND LOGIN
      registerModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [registerModal]);

  const onToggle = useCallback(() => {
    if (isLoading) return;

    registerModal.onClose();
    loginModal.onOpen();
  }, [isLoading, loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="mt-4 text-center text-neutral-400">
      <p>
        Already have an account?
        <span
          onClick={onToggle}
          className="text-white cursor-pointer hover:underline"
        >
          {" "}
          Sign in
        </span>
      </p>
    </div>
  );

  return (
    <div>
      <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Create an account"
        actionLabel="Register"
        onClose={registerModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}
      />
    </div>
  );
};

export default RegisterModal;
