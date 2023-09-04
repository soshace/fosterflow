//TODO: it renders 8 times, figure it out
import React, { useRef, useEffect, useState } from 'react';
import { connect } from "react-redux";
import withRouter from "../../../components/withRouter";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import gfm from 'remark-gfm';
import _ from 'lodash';
import UserHead from "./UserHead";
import ChatInput from "./ChatInput";
import { 
    fetchMessages
} from "../../../redux/chat/actions";

// Here's the custom component to render the code blocks
function CodeBlock({node, inline, className, children, ...props}) {
  const match = /language-(\w+)/.exec(className || '')
  return !inline && match ? (
    <SyntaxHighlighter 
        style={materialDark} 
        customStyle={{
            fontSize: "0.875rem",
        }} 
        language={match[1]} 
        {...props}
    >
        {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  )
}

function UserChat(props) {
    const chatWindowRef = useRef();
    const userWasAtBottomRef = useRef(true);
    const { 
        messages, 
        activeChatId, 
        authorizedUser,
        addChatRequestMessage,
        fetchMessages,
        chatWindow
    } = props;
    //TODO: review if it's neccesary to store all messages into store
    const relevantMessages = messages.filter(message => message.chat_id === activeChatId);
    const debouncedHandleChatScroll = _.debounce(handleChatScroll, 300);
    const debounceHandleWindowResize = _.debounce(handleWindowResize, 300);
    const [messageMaxWidth, setMessageMaxWidth] = useState(0);

    function handleChatScroll() {
        const { scrollHeight, scrollTop, clientHeight } = chatWindowRef.current;
        userWasAtBottomRef.current = (scrollHeight - scrollTop) === clientHeight;
    };

    function handleWindowResize () {
        messageMaxMidthUpdate(true);
    }

    /**
     * Hack, didn't find working CSS solution
     * Need to specidy maximum width for the messages, because of possible long code blocks
     * 
     * param rerender {boolean}
     */
    function messageMaxMidthUpdate (rerender) {
        if (rerender || (messageMaxWidth === 0 && chatWindowRef.current)) {
        const width = chatWindowRef.current.clientWidth - 32;
        setMessageMaxWidth(width);
        }
    }

    // Add useEffect to auto scroll to bottom when messages update
    useEffect(() => {
        if (Array.isArray(messages) && messages.length > 0){
        const { scrollHeight } = chatWindowRef.current;
        if (userWasAtBottomRef.current){
        chatWindowRef.current.scrollTop = scrollHeight;
        }
        }
    }, [messages]);

    useEffect(() => {
        window.addEventListener('resize', debounceHandleWindowResize);
        messageMaxMidthUpdate ();
        return () => {
        window.removeEventListener('resize', debounceHandleWindowResize);
        };
    }, []);

    useEffect(() => {
        if (activeChatId === 0 ||
            authorizedUser === null ||
            authorizedUser.is_email_confirmed === false ||
            addChatRequestMessage !== undefined
        ) { return; }

        fetchMessages(activeChatId);
    }, [authorizedUser, activeChatId]);

    return (
        <React.Fragment>
            <div className={`user-chat ${chatWindow ? 'user-chat-show' : ''}`}>
                <div className="user-chat-wrapper">
                    <UserHead />
                    <div
                        ref={chatWindowRef}
                        onScroll={debouncedHandleChatScroll} 
                        className="user-chat-conversation"
                        id="messages">
                            <ul className="user-chat-conversation-list">
                                {
                                    relevantMessages.map((message, key) =>
                                        <React.Fragment key={key}>
                                            {
                                                authorizedUser.id === message.owner_id ? (
                                                    <li className="user-chat-conversation-list-item right">
                                                        <div className="user-chat-message user-chat-message-formatting">
                                                            {message.message_text}
                                                        </div>
                                                    </li>
                                                ) : (
                                                    <li className="user-chat-conversation-list-item"> 
                                                        <div 
                                                            className="user-chat-message" 
                                                            style={{maxWidth: `${messageMaxWidth}px`}}
                                                        >
                                                            <ReactMarkdown 
                                                                remarkPlugins={[gfm]} 
                                                                components={{code: CodeBlock}}>
                                                                {message.message_text}
                                                            </ReactMarkdown>
                                                        </div>
                                                    </li>
                                                )
                                            }
                                        </React.Fragment>
                                    )
                                }
                            </ul>
                    </div>
                </div>
                <ChatInput/>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    const {
        messages,
        activeChatId,
        chatWindow,
        addChatRequestMessage
    } = state.Chat;

    return {
        messages,
        activeChatId,
        chatWindow,
        addChatRequestMessage,
        authorizedUser: state.User.authorizedUser
    }
};

const mapDispatchToProps = {
    fetchMessages
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserChat));