const DASHBOARD_BASE_PATH = "/dashboard";

export const paths = {
  dashboard: {
    root: `${DASHBOARD_BASE_PATH}/`,
    add: `${DASHBOARD_BASE_PATH}/add`,
    edit: (id: string) => `${DASHBOARD_BASE_PATH}/${id}/edit`,
  },
};
