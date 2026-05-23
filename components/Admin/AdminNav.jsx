import { NavLink } from "@mantine/core";
import {
  IconTruckDelivery,
  IconListLetters,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";
import { useState } from "react";
import SectionLabel from "./SectionLabel";

export default function AdminNav(props) {
  const [active, setActive] = useState(props.initPageIndex);

  const navItems = [
    {
      icon: <IconTruckDelivery size={18} stroke={1.5} />,
      label: "Orders",
      description: "Manage customer orders",
    },
    {
      icon: <IconListLetters size={18} stroke={1.5} />,
      label: "Items",
      description: "Manage product listings",
    },
  ];

  return (
    <div className="flex flex-col w-60 bg-white border-r border-gray-200 min-h-screen sticky top-0 flex-shrink-0">
      <div className="px-5 py-6 border-b border-gray-100">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          Admin
        </p>
        <p className="text-lg font-bold text-gray-900 mt-0.5">Dashboard</p>
      </div>

      <nav className="flex flex-col p-3 flex-1">
        <SectionLabel title="Store" />
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            active={index === active}
            label={item.label}
            leftSection={item.icon}
            color="dark"
            description={item.description}
            style={{ borderRadius: 8 }}
            onClick={() => {
              setActive(index);
              props.onPageChange(index);
            }}
          />
        ))}

        <div className="mt-auto">
          <SectionLabel title="Account" />
          <NavLink
            label="Settings"
            leftSection={<IconSettings size={18} stroke={1.5} />}
            color="dark"
            description="Dashboard configuration"
            style={{ borderRadius: 8 }}
          >
            <NavLink
              label="Logout"
              leftSection={<IconLogout size={18} stroke={1.5} />}
              color="red"
              description="Sign out of admin"
              style={{ borderRadius: 8 }}
              onClick={props.logout}
            />
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
