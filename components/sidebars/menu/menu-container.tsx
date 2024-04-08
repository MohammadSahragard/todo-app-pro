//* components
import MenuItem from '@/components/ui-kits/menu-item';
import ProfileAccount from '@/components/ui-kits/profile-account';
import Searchbar from '@/components/ui-kits/search-bar';
import AddListBtn from '@/components/ui/buttons/add-list-btn';
import SignOutBtn from '@/components/ui/buttons/sign-out-btn';
import ThemeToggleBtn from '@/components/ui/buttons/theme-toggle-btn';
import Divider from '@/components/ui/texts/divider';
import Subtitle from '@/components/ui/texts/subtitle';

//* data
import { menuLinks } from '@/data/data';

const MenuContainer = () => {
    return (
        <aside className='menu-container'>
            {/* menu header (profile section & searchbar) */}
            <ProfileAccount />
            <Searchbar />

            <div className='my-3'>
                {/* tasks (menu links) */}
                <section className='mb-2'>
                    <Subtitle
                        subtitle='TASKS'
                        additionalClasses='text-xs my-2'
                    />

                    {menuLinks.map((link) => (
                        <MenuItem
                            key={link.id}
                            href={link.href}
                            label={link.title}
                            iconName={link.iconName}
                        />
                    ))}
                </section>

                <Divider />

                {/* lists */}
                <section className='mt-2'>
                    <Subtitle
                        subtitle='LISTS'
                        additionalClasses='text-xs my-2'
                    />

                    <AddListBtn />
                </section>
            </div>

            {/* menu options (theme & sign out) */}
            <div>
                <ThemeToggleBtn />
                <SignOutBtn />
            </div>
        </aside>
    );
};

export default MenuContainer;
