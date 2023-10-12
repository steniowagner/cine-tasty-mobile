import React, {
  ReactNode,
  useCallback,
  useContext,
  useState,
  Context,
  useMemo,
} from 'react';

import { Icons } from '@/components/common';

import { AlertMessage } from './AlertMessage';

type AlertMessageProviderProps = {
  children?: ReactNode;
};

type AlertMessageContextProps = {
  show: (message: string, icon?: Icons) => void;
};

const ALERT_MESSAGE_CONTEXT: AlertMessageContextProps = {
  show: () => {},
};

export const AlertMessageContext: Context<AlertMessageContextProps> =
  React.createContext(ALERT_MESSAGE_CONTEXT);

type AlertMessageContent = {
  message: string;
  icon?: Icons;
};

const INITIAL_CONTENT = {
  message: '',
};

export const AlertMessageProvider = (props: AlertMessageProviderProps) => {
  const [content, setContent] = useState<AlertMessageContent>(INITIAL_CONTENT);

  const show = useCallback((message: string, icon?: Icons) => {
    setContent({
      message,
      icon,
    });
  }, []);

  const hide = useCallback(() => {
    setContent(INITIAL_CONTENT);
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
        {!!content.message && (
          <AlertMessage
            onFinishToShow={hide}
            message={content.message}
            icon={content.icon}
          />
        )}
      </>
    </AlertMessageContext.Provider>
  );
};

export const useAlertMessage = () => useContext(AlertMessageContext);
