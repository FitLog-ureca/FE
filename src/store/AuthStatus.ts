export let isRestoringAuth = true;

export const authRestoreStatus = {
  start() {
    isRestoringAuth = true;
  },
  end() {
    isRestoringAuth = false;
  },
};
