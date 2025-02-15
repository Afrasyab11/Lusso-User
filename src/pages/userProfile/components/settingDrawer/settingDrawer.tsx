import { Drawer } from '@mantine/core';
import { SettingDrawerProps } from '../../types/types';
import DrawerContent from './drawerContent';
import "./settingDrawer.scss";

const SettingDrawer: React.FC<SettingDrawerProps> = ({ opened, close, title, fields, buttons, toastError }) => {

    return (
        <Drawer
            opened={opened}
            onClose={close}
            position='right'
            zIndex="9999"
            radius="12"
            size="lg"
            withCloseButton={false}
            closeOnClickOutside={false}
            classNames={{ content: 'custom-drawer-content', header: 'remove-header' }}
        >

            <DrawerContent title={title} fields={fields} buttons={buttons} toastError={toastError} />
        </Drawer>
    );
};

export default SettingDrawer;
