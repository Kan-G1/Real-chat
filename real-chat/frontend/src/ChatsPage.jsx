import PropTypes from 'prop-types';
import { PrettyChatWindow } from 'react-chat-engine-pretty';

const PROJECT_ID = import.meta.env.VITE_CHAT_ENGINE_PROJECT_ID;

const ChatsPage = (props) => {
    return (
        <div style={{ height: '100vh' }}>
            <PrettyChatWindow
                projectId={PROJECT_ID}
                username={props.user.username}
                secret={props.user.secret}
                style={{ height: '100%' }}
            />
        </div>
    );
}

ChatsPage.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        secret: PropTypes.string.isRequired,
    }).isRequired,
};

export default ChatsPage;