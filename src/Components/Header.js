
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useTransition, animated } from 'react-spring'

function NavigationMenu(props) {
    return (
        <div>
            <div className="font-bold py-3">
                AppName
            </div>
            <ul>
                <hr />
                <li>
                    <Link
                        to="/"
                        className="text-blue-500 py-3 block"
                        onClick={props.closeMenu}
                    >
                        Home
                    </Link>
                </li>
                <hr />
                <li>
                    <Link
                        to="/about"
                        className="text-blue-500 py-3 block"
                        onClick={props.closeMenu}
                    >
                        About
                    </Link>
                </li>
                <hr />
            </ul>
        </div>
    )
}

export default function Header() {
    const [showMenu, setShowMenu] = useState(false);

    const maskTransitions = useTransition(showMenu, {
        from: { position: 'absolute', opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });

    const menuTransitions = useTransition(showMenu, {
        from: { opacity: 0, transform: 'translateX(-100%)' },
        enter: { opacity: 1, transform: 'translateX(0%)' },
        leave: { opacity: 0, transform: 'translateX(-100%)' },
    })

    return (
        <header className="border-b p-3 flex justify-between items-center">
            <Link to="/" className="font-bold">
                AppName
            </Link>

            <nav>
                <span className="text-xl cursor-pointer">
                    <FontAwesomeIcon
                        icon={faBars}
                        onClick={() => {
                            setShowMenu(!showMenu);
                            console.log("Success");
                        }}
                    />
                </span>
                {
                    maskTransitions((style, item, key) =>
                        item &&
                        <animated.div
                            key={key}
                            style={style}
                            className="bg-black-t-50 fixed top-0 left-0 w-full h-full z-50"
                            onClick={() => setShowMenu(false)}
                        >
                        </animated.div>
                    )
                }
                {
                    menuTransitions((style, item, key) =>
                        item &&
                        <animated.div
                            key={key}
                            style={style}
                            className="fixed bg-white top-0 left-0 w-4/5 h-full z-50 shadow p-3"
                        >
                            <NavigationMenu
                                closeMenu={() => setShowMenu(false)}
                            />
                        </animated.div>
                    )
                }
            </nav>
        </header>
    )
}