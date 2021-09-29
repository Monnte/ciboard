/*
 * This file is part of ciboard

 * Copyright (c) 2021 Andrei Stepanov <astepano@redhat.com>
 * 
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

import * as React from 'react';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
    Nav,
    NavItem,
    NavList,
    NavProps,
    PageHeader,
} from '@patternfly/react-core';
import { AutomationIcon } from '@patternfly/react-icons';

import { menuRoutes } from '../routes';

const logoProps = {
    to: '/',
    style: {
        color: 'var(--pf-global--secondary-color--100)',
        textDecoration: 'inherit',
    },
};

type SelectedItemType = Parameters<Extract<NavProps['onSelect'], Function>>[0];

const Header = () => {
    const location = useLocation();
    let history = useHistory();
    const [activeItem, setActiveItem] = useState<string | number>(
        'grp-1_itm-1',
    );

    const navigateTo = (href: string) => {
        history.push(href);
    };
    /** Event handlers */
    const onNavSelect = (result: SelectedItemType) => {
        /** activeItem -- holds name of selected item. XXX: remove this code */
        console.log('Selected: ', activeItem);
        setActiveItem(result.itemId);
    };
    /** Horizontal menu */
    const menuElements = menuRoutes.map((item) => (
        <NavItem
            itemId={item.key}
            key={item.key}
            isActive={item.to === location.pathname}
            onClick={() => navigateTo(item.to)}
        >
            {item.title}
        </NavItem>
    ));
    const PageNav = (
        <Nav variant="horizontal" onSelect={onNavSelect} aria-label="Nav">
            <NavList>{menuElements}</NavList>
        </Nav>
    );
    return (
        <PageHeader
            logo={
                <>
                    <AutomationIcon size="lg" className="pf-u-mr-sm" /> CI board
                </>
            }
            logoComponent="div"
            logoProps={logoProps}
            topNav={PageNav}
        />
    );
};

export default Header;
