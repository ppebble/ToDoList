import React from 'react';
import './Palette.css';

const Color = ({ color, active, onClick}) => {
    return(
        <div className={`color ${active && 'active'}`} style={ {background : color} } onClick={onClick}>

        </div>
    )/* color 컴포넌트 :: 색 -> active 상태 부여 (템플릿 리터럴), 배경 :: 해당 색, onClick Event */
}

const Palette = ({colors, selected, onSelect}) => {
    const colorList = colors.map(
        (color) =>(<Color color={color} active ={selected===color} onClick = {() => onSelect(color)} key={color}/>)
    );//Color 컴포넌트를 받아와서 active => 선택된 색 onClick -> onSelect(color) , key -> color (MAP)
    return(
        <div className='palette'>
            {colorList}
        </div>
    )
}

export default Palette;