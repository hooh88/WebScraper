// Sidebar route metadata
export interface RouteInfo {
  path: string;
  params: {};
  title: string;
  icon: string;
  class: string;
  extralink: boolean;
  submenu: RouteInfo[];
}
