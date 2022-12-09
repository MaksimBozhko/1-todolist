import React from 'react';

type HeaderTypePros = {
    title: string
}

const Header = (props: HeaderTypePros) => {
    return (
        <h3>{props.title}</h3>
    );
};

export default Header;