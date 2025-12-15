type LogoutListener = () => void;

let onLogout: LogoutListener | null = null;

export const authEvents = {
  setLogoutListener(listener: LogoutListener) {
    onLogout = listener;
  },
  emitLogout() {
    onLogout?.();
  },
};
