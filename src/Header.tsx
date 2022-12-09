import React from 'react';

type HeaderType = {
    title: string
}

export const Header = (props: HeaderType) => {
    return (

        <div>
            <h3>{props.title}</h3>
        </div>
    );
};

export default Header;