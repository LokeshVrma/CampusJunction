import React from 'react';
import '../styles/Sidebar.css';

function Sidebar(){
    return (
        <aside className='side-menu'>
            <h2> Menu </h2>
       
            <ul>
                <li> <a href='#'>Category1</a></li>
                <li><a href='#'>Category2</a></li>
                <li> <a href='#'>Category3</a></li>
                <li> <a href='#'> Category4</a></li>
                <li> <a href='#'> Category5</a></li>
            </ul>
            <div className='popular-items'>
                <h3>Popular Items</h3>
                <ul>
                    <li><a href='#'>Item 1</a></li>
                    <li><a href='#'>Item 2</a></li>
                    <li><a href='#'>Item 3</a></li>
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar;
