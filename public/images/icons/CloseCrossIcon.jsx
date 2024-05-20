export const CloseCrossIcon = ({width, height, fill, onClick, className}) => {

    const initialParamsProps = {
        width: width ?? '21',
        height: height ?? '22',
        fill: fill ?? '#F4D553'
    };

    return(
        <svg className={className} onClick={onClick} width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="x">
        <path id="Vector" d="M36 12.5742L12 36.5742" stroke="#10101C" strokeWidth="2" strokelinecap="round" strokeLinejoin="round"/>
        <path id="Vector_2" d="M12 12.5742L36 36.5742" stroke="#10101C" strokeWidth="2" stroklinecap="round" strokeLinejoin="round"/>
        </g>
        </svg>
        
        

    )
}