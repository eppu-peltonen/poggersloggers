import UserMenuDrawer from './UserMenuDrawer';

const Header = () => {
    return (
        <header className="flex justify-between text-3xl text-white bg-sky-500 p-2 shadow-lg">
            <h1>
                <span className="font-bold">PoggersLoggers</span>
            </h1>

            <UserMenuDrawer />

        </header>
    );
}

export default Header;