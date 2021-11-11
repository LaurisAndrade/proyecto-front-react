import React from 'react'
import * as GiIcons from "react-icons/gi";
import * as BsIcons from "react-icons/bs";

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <BsIcons.BsPersonBoundingBox />,
        cName: 'nav-text'
    },
    {
        title: 'Autores',
        path: '/autor',
        icon: <BsIcons.BsPersonBoundingBox />,
        cName: 'nav-text'
    },
    {
        title: 'Genero',
        path: '/genero',
        icon: <GiIcons.GiDivergence />,
        cName: 'nav-text'
    },
    {
        title: 'Editorial',
        path: '/editorial',
        icon: <GiIcons.GiDivergence />,
        cName: 'nav-text'
    },
    {
        title: 'Libros',
        path: '/libros',
        icon: <GiIcons.GiWhiteBook />,
        cName: 'nav-text'
    },
]
