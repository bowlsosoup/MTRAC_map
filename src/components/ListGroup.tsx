import { Fragment } from "react/jsx-runtime";
import { useState } from "react";

//{items: [], heading: string}
//props like args
//state like variables
interface items{
    label:string;
    colour:string;
}

interface Props {
    items: items[];
    heading: string;
    //(item:string) => void
    onSelectItem: (index: number) => void;
}

function ListGroup({items, heading, onSelectItem}: Props) {
    //event handler
    // const handleClick = (event: MouseEvent) => console.log(event);
    const getMessage = () => {
        return items.length == 0 && <p> No Robots Connected</p>;
    }

    //Hook
    // let selectIndex = -1;
    const [selectedIndex, setSelectedIndex] = useState(-1);
    //element 0 selectedIndex
    //element 1 update function
    return (
        <Fragment>
            <h1> {heading} </h1>
            <span>Click to Select</span>
            {getMessage()}
            <ul className="list-group">
            {
                items.map((item, index) => <li 
                    className={selectedIndex == index ? "list-group-item active" : "list-group-item"}
                    // aria-current="true"
                    key = {index}
                    style = {{borderLeft: `5px solid ${item.colour}`,
                        borderRight: `5px solid ${item.colour}`,
                        paddingLeft: '10px',
                        backgroundColor: selectedIndex == index?  item.colour: 'transparent'
                    }}
                    onClick={
                        () => {setSelectedIndex(index);
                        onSelectItem(index);
                        }
                    }
                >
                    <span style = {{display: 'inline-block',
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: item.colour,
                            marginRight: '10px'
                            
                    }}/>
                    {item.label}
                </li>)
            }
            </ul>
        </Fragment>
    );
  }

  export default ListGroup;