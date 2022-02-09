import React, {
  ReactNode,
  useCallback,
  useContext,
  useState,
  Context,
  useMemo,
} from 'react';

import AlertMessage from './AlertMessage';

type AlertMessageProviderProps = {
  children?: ReactNode;
};

type AlertMessageContextProps = {
  show: (message: string) => void;
};

const ALERT_MESSAGE_CONTEXT: AlertMessageContextProps = {
  show: () => {},
};

export const AlertMessageContext: Context<AlertMessageContextProps> =
  React.createContext(ALERT_MESSAGE_CONTEXT);

export const AlertMessageProvider = (props: AlertMessageProviderProps) => {
  const [message, setMessage] = useState('');

  const show = useCallback(
    (messageToShow: string) => {
      setMessage(messageToShow);
    },
    [message],
  );

  const hide = useCallback(() => {
    setMessage('');
  }, []);

  const context: AlertMessageContextProps = useMemo(
    () => ({
      show,
    }),
    [show],
  );

  return (
    <AlertMessageContext.Provider value={context}>
      <>
        {props.children}
        {!!message && <AlertMessage onFinishToShow={hide} message={message} />}
      </>
    </AlertMessageContext.Provider>
  );
};

export const useAlertMessage = () => useContext(AlertMessageContext);
