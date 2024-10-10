import { menuType } from "./MainLayout";
const SideMenu = ({
  pathName,
  menus,
}: {
  pathName: string;
  menus: menuType[];
}) => {
  return (
    <div className="float-left w-[200px] h-screen bg-gray-200 ">
      <ul className="mt-20">
        {menus.map((menu) => {
          return (
            <li
              key={menu.num}
              className={`${
                pathName.includes(menu.url)
                  ? "bg-blue-300"
                  : "hover:bg-blue-200"
              } p-8 text-xl font-bold cursor-pointer `}
            >
              {menu.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideMenu;
