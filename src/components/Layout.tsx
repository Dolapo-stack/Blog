import NavBar from "./NavBar/NavBar";

interface layoutInterface {
  children: React.ReactNode;
}

const Layout = ({ children }: layoutInterface) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;
