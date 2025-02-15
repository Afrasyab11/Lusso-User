import { Modal } from '@mantine/core';

const ModalWrapper = ({ close, children }: any) => {

    return (
        <Modal
            opened={true}
            onClose={close}
            overlayProps={{
                backgroundOpacity: 0.59,
                blur: 4,
            }}
            size={'xl'}
            closeOnClickOutside={false}
            lockScroll={false}
            styles={{
                header: {
                    backgroundColor: '#1B0130',
                    color: '#FFFFFF',
                    display: 'none',
                },
                body: {
                    backgroundColor: '#1B0130',
                },
            }}
            data-centered
        >
            {children}
        </Modal>
    );
};

export default ModalWrapper;
